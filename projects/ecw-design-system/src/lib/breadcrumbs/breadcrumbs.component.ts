import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/** A single breadcrumb node. Omit `href` for a non-navigable entry. */
export interface EcwBreadcrumbItem {
  /** Visible text. */
  label: string;
  /** Link target. When absent the item renders as plain text (not a link). */
  href?: string;
  /** Optional opaque payload echoed back by `(itemSelect)`, e.g. a router path. */
  data?: unknown;
}

/** Emitted when a breadcrumb (or popover) link is activated. */
export interface EcwBreadcrumbSelect {
  item: EcwBreadcrumbItem;
  /** Index of the item in the original `items` array. */
  index: number;
  originalEvent: MouseEvent;
}

interface RenderNode {
  type: 'item' | 'more';
  item?: EcwBreadcrumbItem;
  index?: number;
  current?: boolean;
  collapsed?: { item: EcwBreadcrumbItem; index: number }[];
}

/**
 * `<ecw-breadcrumbs>` — the design-system breadcrumb trail (Jira PE-256838).
 *
 * Token-driven from the Figma `breadcrumbs` component tokens
 * (`--ecw-breadcrumb-*`). Renders a native `<nav><ol>` of links separated by
 * chevrons. The last item is the current page (semibold, `aria-current="page"`,
 * not a link).
 *
 * Levels 1–3 render every item. From `maxItems` upward the middle items collapse
 * into a "…" trigger (`itemsBeforeCollapse` leading + `itemsAfterCollapse`
 * trailing stay visible); the trigger opens a popover listing the collapsed
 * items. Closes on outside click or Escape.
 *
 * Light/dark are token-driven (`[data-theme="dark"]`). Long labels truncate with
 * an ellipsis at `--ecw-breadcrumb-item-max-width`.
 */
@Component({
  selector: 'ecw-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class EcwBreadcrumbsComponent {
  private readonly host = inject(ElementRef<HTMLElement>);

  /** The trail, root → current page. The last item is treated as the current page. */
  readonly items = input<EcwBreadcrumbItem[]>([]);

  /** Collapse once the trail has more than this many items. Set `0` to disable. */
  readonly maxItems = input(4);

  /** How many leading items stay visible when collapsed. */
  readonly itemsBeforeCollapse = input(1);

  /** How many trailing items stay visible when collapsed. */
  readonly itemsAfterCollapse = input(1);

  /** Accessible name for the landmark `<nav>`. */
  readonly ariaLabel = input<string>('Breadcrumb');

  /** Accessible label for the collapsed "…" trigger. */
  readonly moreAriaLabel = input<string>('Show more breadcrumbs');

  /** Emitted when any breadcrumb link (visible or in the popover) is activated. */
  @Output() readonly itemSelect = new EventEmitter<EcwBreadcrumbSelect>();

  /** Whether the collapsed-items popover is open. */
  readonly popoverOpen = signal(false);

  /** Render plan: a flat list of item / "more" nodes with separators implied. */
  readonly nodes = computed<RenderNode[]>(() => {
    const items = this.items();
    if (items.length === 0) return [];

    const lastIndex = items.length - 1;
    const max = this.maxItems();
    const before = Math.max(0, this.itemsBeforeCollapse());
    const after = Math.max(1, this.itemsAfterCollapse());

    const shouldCollapse =
      max > 0 && items.length > max && items.length > before + after + 1;

    if (!shouldCollapse) {
      return items.map((item, index) => ({
        type: 'item',
        item,
        index,
        current: index === lastIndex,
      }));
    }

    const lead = items.slice(0, before);
    const middle = items.slice(before, items.length - after);
    const tailStart = items.length - after;
    const tail = items.slice(tailStart);

    return [
      ...lead.map((item, index) => ({
        type: 'item' as const,
        item,
        index,
        current: false,
      })),
      {
        type: 'more' as const,
        collapsed: middle.map((item, i) => ({ item, index: before + i })),
      },
      ...tail.map((item, i) => ({
        type: 'item' as const,
        item,
        index: tailStart + i,
        current: tailStart + i === lastIndex,
      })),
    ];
  });

  protected togglePopover(event: MouseEvent): void {
    event.stopPropagation();
    this.popoverOpen.update((open) => !open);
  }

  protected onSelect(
    item: EcwBreadcrumbItem,
    index: number,
    event: MouseEvent,
  ): void {
    this.itemSelect.emit({ item, index, originalEvent: event });
    this.popoverOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (
      this.popoverOpen() &&
      !this.host.nativeElement.contains(event.target as Node)
    ) {
      this.popoverOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.popoverOpen.set(false);
  }
}
