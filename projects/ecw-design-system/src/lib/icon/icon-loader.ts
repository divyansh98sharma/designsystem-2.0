import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EcwIconRegistry, EcwIconSource } from './icon-registry';

/**
 * CDN config (jsDelivr). Pinned to a version *range* so new/updated icons
 * published within the range are picked up automatically — no rebuild. The
 * range is resolved to an exact version at runtime (the jsDelivr data API
 * requires an exact version for file listings). All icons are the **outline**
 * variant.
 */
const MATERIAL_PKG = '@material-symbols/svg-300';
const MATERIAL_RANGE = 'latest';
const HEALTHICONS_PKG = 'healthicons';
const HEALTHICONS_RANGE = '2';
const CDN = 'https://cdn.jsdelivr.net/npm';
const DATA = 'https://data.jsdelivr.com/v1/packages/npm';

/** `/outlined/<name>.svg` (excluding the `-fill` variants) → bare name. */
const MATERIAL_PATH = /^\/outlined\/([^/]+)\.svg$/;
/** `…/svg/outline/<category>/<name>.svg` → bare name. */
const HEALTHICON_PATH = /\/public\/icons\/svg\/outline\/[^/]+\/([^/]+)\.svg$/;

interface PackageIndex {
  version: string;
  /** Full file paths within the package (e.g. `/outlined/home.svg`). */
  files: string[];
}

/**
 * Resolves an icon `name`/`source` to sanitized inline SVG, fetched live from
 * the jsDelivr CDN and cached. Resolution order:
 *
 *   1. {@link EcwIconRegistry} override (offline / `custom`) — no network.
 *   2. In-memory cache (per session).
 *   3. CDN fetch → sanitize → cache.
 *
 * Material SVGs are flat (`/outlined/<name>.svg`); Healthicons are nested by
 * category, so a `name → path` index is built (once) from the package file
 * list and reused. `null` is cached for a miss so a broken icon doesn't refetch.
 */
@Injectable({ providedIn: 'root' })
export class EcwIconLoader {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly registry = inject(EcwIconRegistry);

  private readonly cache = new Map<string, SafeHtml | null>();
  private readonly inflight = new Map<string, Promise<SafeHtml | null>>();
  private readonly indexes = new Map<string, Promise<PackageIndex>>();
  private healthMap?: Promise<{ version: string; byName: Map<string, string> }>;

  /** Resolve an icon to sanitized SVG, or `null` if it can't be found. */
  load(source: EcwIconSource, name: string): Promise<SafeHtml | null> {
    const override = this.registry.get(source, name);
    if (override) return Promise.resolve(override);

    const key = `${source}:${name}`;
    if (this.cache.has(key)) return Promise.resolve(this.cache.get(key)!);

    const existing = this.inflight.get(key);
    if (existing) return existing;

    const promise = this.fetchSvg(source, name)
      .then((safe) => {
        this.cache.set(key, safe);
        this.inflight.delete(key);
        return safe;
      })
      .catch(() => {
        this.cache.set(key, null);
        this.inflight.delete(key);
        return null;
      });

    this.inflight.set(key, promise);
    return promise;
  }

  /**
   * Lists every available icon name for a source (sorted). Used by the docs
   * gallery. `custom` returns `[]` (names are app-defined in the registry).
   */
  async listNames(source: EcwIconSource): Promise<string[]> {
    if (source === 'healthicons') {
      return [...(await this.healthicons()).byName.keys()].sort();
    }
    if (source === 'material') {
      const { files } = await this.packageIndex(MATERIAL_PKG, MATERIAL_RANGE);
      const names = new Set<string>();
      for (const path of files) {
        const m = path.match(MATERIAL_PATH);
        if (m && !m[1].endsWith('-fill')) names.add(m[1]);
      }
      return [...names].sort();
    }
    return [];
  }

  private async fetchSvg(
    source: EcwIconSource,
    name: string,
  ): Promise<SafeHtml | null> {
    const url = await this.urlFor(source, name);
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    return this.sanitizer.bypassSecurityTrustHtml(await res.text());
  }

  private async urlFor(
    source: EcwIconSource,
    name: string,
  ): Promise<string | null> {
    switch (source) {
      case 'material':
        return `${CDN}/${MATERIAL_PKG}/outlined/${name}.svg`;
      case 'healthicons': {
        const { version, byName } = await this.healthicons();
        const path = byName.get(name);
        return path ? `${CDN}/${HEALTHICONS_PKG}@${version}${path}` : null;
      }
      case 'custom':
      default:
        return null; // registry-only
    }
  }

  /** Build (once) the Healthicons exact version + `name → path` index. */
  private healthicons(): Promise<{ version: string; byName: Map<string, string> }> {
    if (!this.healthMap) {
      this.healthMap = this.packageIndex(HEALTHICONS_PKG, HEALTHICONS_RANGE).then(
        ({ version, files }) => {
          const byName = new Map<string, string>();
          for (const path of files) {
            const m = path.match(HEALTHICON_PATH);
            if (m) byName.set(m[1], path);
          }
          return { version, byName };
        },
      );
    }
    return this.healthMap;
  }

  /**
   * Resolve a package range to an exact version, then fetch its flat file list.
   * Cached per `pkg@range`. The data API requires an exact version, so the
   * range is resolved first via the `/resolved` endpoint.
   */
  private packageIndex(pkg: string, range: string): Promise<PackageIndex> {
    const key = `${pkg}@${range}`;
    if (!this.indexes.has(key)) {
      const promise = fetch(`${DATA}/${pkg}/resolved?specifier=${range}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((resolved: { version?: string } | null) => {
          const version = resolved?.version;
          if (!version) return { version: '', files: [] };
          return fetch(`${DATA}/${pkg}@${version}?structure=flat`)
            .then((r) => (r.ok ? r.json() : { files: [] }))
            .then((data: { files?: { name: string }[] }) => ({
              version,
              files: (data.files ?? []).map((f) => f.name),
            }));
        })
        .catch(() => ({ version: '', files: [] }));
      this.indexes.set(key, promise);
    }
    return this.indexes.get(key)!;
  }
}
