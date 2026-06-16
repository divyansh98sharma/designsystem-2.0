import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcwButtonComponent } from './button.component';

/** Host that projects label content into the button. */
@Component({
  standalone: true,
  imports: [EcwButtonComponent],
  template: `<ecw-button>Click me</ecw-button>`,
})
class LabelHostComponent {}

describe('EcwButtonComponent', () => {
  let fixture: ComponentFixture<EcwButtonComponent>;
  let component: EcwButtonComponent;

  /** The main native `<button>` element. */
  const mainButton = (): HTMLButtonElement =>
    fixture.nativeElement.querySelector('.ecw-button__main');

  /** The split native `<button>` element, if rendered. */
  const splitButton = (): HTMLButtonElement | null =>
    fixture.nativeElement.querySelector('.ecw-button__split');

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwButtonComponent] });
    fixture = TestBed.createComponent(EcwButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  describe('keyboard navigation & native semantics', () => {
    it('renders a real <button> element (so Tab/Enter/Space work natively)', () => {
      expect(mainButton().tagName).toBe('BUTTON');
    });

    it('defaults to type="button" so it does not submit forms unexpectedly', () => {
      expect(mainButton().getAttribute('type')).toBe('button');
    });

    it('reflects the type input', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      expect(mainButton().getAttribute('type')).toBe('submit');
    });

    it('removes the button from the tab order when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(mainButton().disabled).toBe(true);
    });

    it('emits ecwClick when activated (click is what Enter/Space synthesize on a native button)', () => {
      const spy = vi.fn();
      component.ecwClick.subscribe(spy);
      mainButton().click();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not emit when disabled and activated', () => {
      const spy = vi.fn();
      component.ecwClick.subscribe(spy);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      mainButton().click();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('icon-only accessible name', () => {
    it('exposes aria-label when iconOnly', () => {
      fixture.componentRef.setInput('iconOnly', true);
      fixture.componentRef.setInput('ariaLabel', 'Delete');
      fixture.detectChanges();
      expect(mainButton().getAttribute('aria-label')).toBe('Delete');
    });

    it('does not set aria-label when a visible label is used', () => {
      fixture.componentRef.setInput('ariaLabel', 'Delete');
      fixture.detectChanges();
      expect(mainButton().getAttribute('aria-label')).toBeNull();
    });
  });

  describe('split action ARIA semantics', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('split', true);
      fixture.detectChanges();
    });

    it('renders a second native button for the split action', () => {
      expect(splitButton()?.tagName).toBe('BUTTON');
    });

    it('advertises a popup via aria-haspopup="menu"', () => {
      expect(splitButton()?.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('reports collapsed state by default', () => {
      expect(splitButton()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('reflects expanded state from splitExpanded', () => {
      fixture.componentRef.setInput('splitExpanded', true);
      fixture.detectChanges();
      expect(splitButton()?.getAttribute('aria-expanded')).toBe('true');
    });

    it('carries its own accessible label', () => {
      fixture.componentRef.setInput('splitAriaLabel', 'More actions');
      fixture.detectChanges();
      expect(splitButton()?.getAttribute('aria-label')).toBe('More actions');
    });

    it('emits splitClick independently of the main action', () => {
      const main = vi.fn();
      const split = vi.fn();
      component.ecwClick.subscribe(main);
      component.splitClick.subscribe(split);
      splitButton()!.click();
      expect(split).toHaveBeenCalledTimes(1);
      expect(main).not.toHaveBeenCalled();
    });

    it('disables the split action alongside the main button', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(splitButton()?.disabled).toBe(true);
    });
  });

  it('is not rendered when split is false', () => {
    expect(splitButton()).toBeNull();
  });

  describe('variant & host classes', () => {
    const host = (): HTMLElement => fixture.nativeElement;

    it('applies the variant modifier class (default primary)', () => {
      expect(host().classList).toContain('ecw-button--primary');
    });

    it('reflects a changed variant', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();
      expect(host().classList).toContain('ecw-button--error');
      expect(host().classList).not.toContain('ecw-button--primary');
    });

    it('toggles state classes for split / icon-only / disabled', () => {
      fixture.componentRef.setInput('split', true);
      fixture.componentRef.setInput('iconOnly', true);
      fixture.componentRef.setInput('ariaLabel', 'X');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(host().classList).toContain('ecw-button--split');
      expect(host().classList).toContain('ecw-button--icon-only');
      expect(host().classList).toContain('ecw-button--disabled');
    });
  });

  describe('icons', () => {
    const icons = (): NodeListOf<Element> =>
      fixture.nativeElement.querySelectorAll('ecw-icon');

    it('renders no icon by default', () => {
      expect(icons().length).toBe(0);
    });

    it('renders leading and trailing icons', () => {
      fixture.componentRef.setInput('leadingIcon', 'add');
      fixture.componentRef.setInput('trailingIcon', 'arrow_forward');
      fixture.detectChanges();
      expect(icons().length).toBe(2);
    });

    it('passes iconFilled through to the icon', () => {
      fixture.componentRef.setInput('leadingIcon', 'star');
      fixture.componentRef.setInput('iconFilled', true);
      fixture.detectChanges();
      // The filled axis is reflected by ecw-icon on its own host class.
      expect(icons().length).toBe(1);
      expect(fixture.nativeElement.querySelector('ecw-icon')).toBeTruthy();
    });
  });

  describe('counter pill', () => {
    const counter = (): HTMLElement | null =>
      fixture.nativeElement.querySelector('.ecw-button__counter');

    it('is absent when no counter is provided', () => {
      expect(counter()).toBeNull();
    });

    it('renders a non-zero counter', () => {
      fixture.componentRef.setInput('counter', 3);
      fixture.detectChanges();
      expect(counter()?.textContent?.trim()).toBe('3');
    });

    it('renders a zero counter (0 is a valid value, not "empty")', () => {
      fixture.componentRef.setInput('counter', 0);
      fixture.detectChanges();
      expect(counter()).not.toBeNull();
      expect(counter()?.textContent?.trim()).toBe('0');
    });
  });

  describe('alert indicator', () => {
    const dot = (): HTMLElement | null =>
      fixture.nativeElement.querySelector('.ecw-button__alert');
    const srText = (): HTMLElement | null =>
      fixture.nativeElement.querySelector('.ecw-button__sr-only');

    it('is absent by default', () => {
      expect(dot()).toBeNull();
      expect(srText()).toBeNull();
    });

    it('renders a decorative (aria-hidden) dot when alert is set', () => {
      fixture.componentRef.setInput('alert', true);
      fixture.detectChanges();
      expect(dot()).not.toBeNull();
      expect(dot()?.getAttribute('aria-hidden')).toBe('true');
    });

    it('announces the alert state via visually-hidden text', () => {
      fixture.componentRef.setInput('alert', true);
      fixture.detectChanges();
      expect(srText()?.textContent?.trim()).toBe('New notifications');
    });

    it('lets the announcement be customised', () => {
      fixture.componentRef.setInput('alert', true);
      fixture.componentRef.setInput('alertLabel', '5 unread messages');
      fixture.detectChanges();
      expect(srText()?.textContent?.trim()).toBe('5 unread messages');
    });

    it('suppresses the announcement when alertLabel is empty', () => {
      fixture.componentRef.setInput('alert', true);
      fixture.componentRef.setInput('alertLabel', '');
      fixture.detectChanges();
      expect(dot()).not.toBeNull();
      expect(srText()).toBeNull();
    });
  });

  describe('split icon', () => {
    it('defaults the split caret to arrow_drop_down and renders an icon', () => {
      fixture.componentRef.setInput('split', true);
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.ecw-button__split ecw-icon');
      expect(icon).toBeTruthy();
      expect(component.splitIcon()).toBe('arrow_drop_down');
    });

    it('honours a custom split icon', () => {
      fixture.componentRef.setInput('split', true);
      fixture.componentRef.setInput('splitIcon', 'expand_more');
      fixture.detectChanges();
      expect(component.splitIcon()).toBe('expand_more');
    });
  });

  describe('dev-mode accessibility guard', () => {
    it('warns when iconOnly is set without an ariaLabel', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      fixture.componentRef.setInput('iconOnly', true);
      fixture.detectChanges();
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('iconOnly'),
      );
      warn.mockRestore();
    });

    it('does not warn when iconOnly has an ariaLabel', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      fixture.componentRef.setInput('iconOnly', true);
      fixture.componentRef.setInput('ariaLabel', 'Delete');
      fixture.detectChanges();
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });
});

describe('EcwButtonComponent (projected label)', () => {
  it('projects label content into the button', () => {
    const fixture = TestBed.createComponent(LabelHostComponent);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.ecw-button__label');
    expect(label?.textContent?.trim()).toBe('Click me');
  });
});
