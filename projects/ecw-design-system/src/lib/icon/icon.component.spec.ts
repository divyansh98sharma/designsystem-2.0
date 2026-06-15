import { TestBed } from '@angular/core/testing';
import { EcwIconLoader } from './icon-loader';
import { EcwIconRegistry } from './icon-registry';

const SVG = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>';

/** Build a fetch mock that answers by URL. */
function mockFetch(routes: Record<string, unknown>) {
  return vi.fn((url: string) => {
    const match = Object.keys(routes).find((k) => url.includes(k));
    if (!match) return Promise.resolve({ ok: false, status: 404 } as Response);
    const body = routes[match];
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(typeof body === 'string' ? body : ''),
      json: () => Promise.resolve(body),
    } as Response);
  });
}

describe('EcwIconLoader', () => {
  let loader: EcwIconLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loader = TestBed.inject(EcwIconLoader);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('fetches a Material outline SVG from the svg-300 CDN by name', async () => {
    const fetchMock = mockFetch({ '@material-symbols/svg-300/outlined/home.svg': SVG });
    vi.stubGlobal('fetch', fetchMock);

    const result = await loader.load('material', 'home');

    expect(result).not.toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://cdn.jsdelivr.net/npm/@material-symbols/svg-300/outlined/home.svg',
    );
  });

  it('caches a resolved icon (no second network call)', async () => {
    const fetchMock = mockFetch({ 'home.svg': SVG });
    vi.stubGlobal('fetch', fetchMock);

    await loader.load('material', 'home');
    await loader.load('material', 'home');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('prefers a registry override and skips the network', async () => {
    const fetchMock = mockFetch({});
    vi.stubGlobal('fetch', fetchMock);
    TestBed.inject(EcwIconRegistry).register('home', SVG, 'material');

    const result = await loader.load('material', 'home');

    expect(result).not.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // Resolve the range → exact version, then read the flat file index.
  const HEALTH_ROUTES = {
    'resolved?specifier=2': { version: '2.0.0' },
    'structure=flat': {
      files: [{ name: '/public/icons/svg/outline/vehicles/ambulance.svg' }],
    },
  };

  it('resolves a Healthicon via version-resolve + cached name→path index', async () => {
    const fetchMock = mockFetch({
      ...HEALTH_ROUTES,
      '/public/icons/svg/outline/vehicles/ambulance.svg': SVG,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await loader.load('healthicons', 'ambulance');

    expect(result).not.toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://cdn.jsdelivr.net/npm/healthicons@2.0.0/public/icons/svg/outline/vehicles/ambulance.svg',
    );
  });

  it('returns null for an unknown Healthicon name', async () => {
    vi.stubGlobal('fetch', mockFetch(HEALTH_ROUTES));
    expect(await loader.load('healthicons', 'does-not-exist')).toBeNull();
  });

  it('listNames returns the full sorted set for a source', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        'resolved?specifier=latest': { version: '0.45.1' },
        'resolved?specifier=2': { version: '2.0.0' },
        '@material-symbols/svg-300@0.45.1?structure=flat': {
          files: [
            { name: '/outlined/home.svg' },
            { name: '/outlined/home-fill.svg' }, // excluded (fill)
            { name: '/outlined/alarm.svg' },
            { name: '/rounded/home.svg' }, // excluded (not outlined)
          ],
        },
        'healthicons@2.0.0?structure=flat': {
          files: [{ name: '/public/icons/svg/outline/vehicles/ambulance.svg' }],
        },
      }),
    );

    expect(await loader.listNames('material')).toEqual(['alarm', 'home']);
    expect(await loader.listNames('healthicons')).toEqual(['ambulance']);
    expect(await loader.listNames('custom')).toEqual([]);
  });

  it('returns null for custom with no override (registry-only)', async () => {
    const fetchMock = mockFetch({});
    vi.stubGlobal('fetch', fetchMock);

    expect(await loader.load('custom', 'brand')).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('caches a miss so a broken icon does not refetch', async () => {
    const fetchMock = mockFetch({}); // everything 404s
    vi.stubGlobal('fetch', fetchMock);

    await loader.load('material', 'nope');
    await loader.load('material', 'nope');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('EcwIconComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    vi.stubGlobal('fetch', mockFetch({ '.svg': SVG }));
  });

  afterEach(() => vi.unstubAllGlobals());

  it('renders the resolved SVG inline (no glyph element)', async () => {
    const { EcwIconComponent } = await import('./icon.component');
    const fixture = TestBed.createComponent(EcwIconComponent);
    fixture.componentRef.setInput('name', 'home');
    fixture.detectChanges(); // runs the effect → kicks off the async load
    // Drain the fetch→signal microtask chain, then render the resolved SVG.
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ecw-icon__svg')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.ecw-icon__glyph')).toBeNull();
  });

  it('is decorative (aria-hidden) with no label', async () => {
    const { EcwIconComponent } = await import('./icon.component');
    const fixture = TestBed.createComponent(EcwIconComponent);
    fixture.componentRef.setInput('name', 'home');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('role')).toBeNull();
  });

  it('is announced (role=img + aria-label) with a label', async () => {
    const { EcwIconComponent } = await import('./icon.component');
    const fixture = TestBed.createComponent(EcwIconComponent);
    fixture.componentRef.setInput('name', 'delete');
    fixture.componentRef.setInput('label', 'Delete item');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Delete item');
    expect(host.getAttribute('aria-hidden')).toBeNull();
  });
});

describe('EcwIconRegistry', () => {
  let registry: EcwIconRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    registry = TestBed.inject(EcwIconRegistry);
  });

  it('keys overrides by source + name (independent namespaces)', () => {
    registry.register('x', SVG, 'custom');
    registry.register('y', SVG, 'healthicons');

    expect(registry.has('custom', 'x')).toBe(true);
    expect(registry.has('healthicons', 'x')).toBe(false);
    expect(registry.has('healthicons', 'y')).toBe(true);
    expect(registry.get('custom', 'x')).toBeTruthy();
  });

  it('defaults register/registerAll to the custom source', () => {
    registry.registerAll({ a: SVG, b: SVG });
    expect(registry.has('custom', 'a')).toBe(true);
    expect(registry.has('custom', 'b')).toBe(true);
  });
});
