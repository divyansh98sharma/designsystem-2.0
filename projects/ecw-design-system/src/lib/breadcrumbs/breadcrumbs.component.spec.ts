import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EcwBreadcrumbsComponent,
  EcwBreadcrumbItem,
} from './breadcrumbs.component';

const trail = (n: number): EcwBreadcrumbItem[] =>
  Array.from({ length: n }, (_, i) => ({
    label: `Item ${i + 1}`,
    href: i === n - 1 ? undefined : `/l${i + 1}`,
  }));

describe('EcwBreadcrumbsComponent', () => {
  let fixture: ComponentFixture<EcwBreadcrumbsComponent>;
  let component: EcwBreadcrumbsComponent;

  const links = (): HTMLAnchorElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.ecw-breadcrumbs__link'));
  const current = (): HTMLElement | null =>
    fixture.nativeElement.querySelector('.ecw-breadcrumbs__current');
  const seps = (): HTMLElement[] =>
    Array.from(
      fixture.nativeElement.querySelectorAll(
        '.ecw-breadcrumbs__item > .ecw-breadcrumbs__sep',
      ),
    );
  const more = (): HTMLButtonElement | null =>
    fixture.nativeElement.querySelector('.ecw-breadcrumbs__more');
  const popover = (): HTMLElement | null =>
    fixture.nativeElement.querySelector('.ecw-breadcrumbs__popover');

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwBreadcrumbsComponent] });
    fixture = TestBed.createComponent(EcwBreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('wraps the trail in a labelled <nav> landmark', () => {
    fixture.componentRef.setInput('items', trail(2));
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('renders the last item as the current page (not a link, aria-current=page)', () => {
    fixture.componentRef.setInput('items', trail(3));
    fixture.detectChanges();
    expect(links().length).toBe(2);
    expect(current()?.textContent?.trim()).toBe('Item 3');
    expect(current()?.getAttribute('aria-current')).toBe('page');
  });

  it('places a separator between items but not after the last', () => {
    fixture.componentRef.setInput('items', trail(3));
    fixture.detectChanges();
    // 3 items → 2 separators
    expect(seps().length).toBe(2);
  });

  it('renders every item when at/under maxItems', () => {
    fixture.componentRef.setInput('items', trail(3));
    fixture.detectChanges();
    expect(more()).toBeNull();
    expect(links().length).toBe(2);
  });

  it('collapses the middle into a "…" trigger past maxItems', () => {
    fixture.componentRef.setInput('items', trail(6));
    fixture.detectChanges();
    expect(more()).not.toBeNull();
    // itemsBeforeCollapse(1) leading link + itemsAfterCollapse(1) trailing (current)
    expect(links().length).toBe(1);
    expect(current()?.textContent?.trim()).toBe('Item 6');
  });

  it('opens and closes the popover when the trigger is toggled', () => {
    fixture.componentRef.setInput('items', trail(6));
    fixture.detectChanges();
    expect(popover()).toBeNull();

    more()!.click();
    fixture.detectChanges();
    expect(popover()).not.toBeNull();
    expect(more()!.getAttribute('aria-expanded')).toBe('true');

    more()!.click();
    fixture.detectChanges();
    expect(popover()).toBeNull();
  });

  it('lists the collapsed items in the popover', () => {
    fixture.componentRef.setInput('items', trail(6));
    fixture.detectChanges();
    more()!.click();
    fixture.detectChanges();
    const entries = popover()!.querySelectorAll('.ecw-breadcrumbs__popover-link');
    // collapsed middle = items 2..5 → 4 entries
    expect(entries.length).toBe(4);
  });

  it('closes the popover on Escape', () => {
    fixture.componentRef.setInput('items', trail(6));
    fixture.detectChanges();
    more()!.click();
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(popover()).toBeNull();
  });

  it('closes the popover on outside click', () => {
    fixture.componentRef.setInput('items', trail(6));
    fixture.detectChanges();
    more()!.click();
    fixture.detectChanges();
    document.body.click();
    fixture.detectChanges();
    expect(popover()).toBeNull();
  });

  it('emits itemSelect with the original index when a link is activated', () => {
    fixture.componentRef.setInput('items', trail(3));
    fixture.detectChanges();
    const spy = vi.fn();
    component.itemSelect.subscribe(spy);
    links()[0].click();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].index).toBe(0);
    expect(spy.mock.calls[0][0].item.label).toBe('Item 1');
  });

  it('renders nothing in the list when items is empty', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.ecw-breadcrumbs__item').length).toBe(0);
  });
});
