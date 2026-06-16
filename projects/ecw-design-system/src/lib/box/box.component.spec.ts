import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcwBoxComponent } from './box.component';

/** Host that projects content into the box. */
@Component({
  standalone: true,
  imports: [EcwBoxComponent],
  template: `<ecw-box>Boxed content</ecw-box>`,
})
class ContentHostComponent {}

describe('EcwBoxComponent', () => {
  let fixture: ComponentFixture<EcwBoxComponent>;
  let component: EcwBoxComponent;

  const host = (): HTMLElement => fixture.nativeElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwBoxComponent] });
    fixture = TestBed.createComponent(EcwBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('applies the ecw-box class', () => {
    expect(host().classList).toContain('ecw-box');
  });

  describe('padding', () => {
    it('maps `padding` to var(--ecw-space-{n}) on all sides', () => {
      fixture.componentRef.setInput('padding', 8);
      fixture.detectChanges();
      expect(host().style.padding).toBe('var(--ecw-space-8)');
    });

    it('composes a y/x shorthand from paddingY/paddingX', () => {
      fixture.componentRef.setInput('paddingY', 4);
      fixture.componentRef.setInput('paddingX', 16);
      fixture.detectChanges();
      expect(host().style.padding).toBe('var(--ecw-space-4) var(--ecw-space-16)');
    });

    it('falls back to 0 for an unset axis', () => {
      fixture.componentRef.setInput('paddingY', 12);
      fixture.detectChanges();
      expect(host().style.padding).toBe('var(--ecw-space-12) 0');
    });

    it('prefers `padding` over the axis inputs when both are set', () => {
      fixture.componentRef.setInput('padding', 16);
      fixture.componentRef.setInput('paddingX', 4);
      fixture.detectChanges();
      expect(host().style.padding).toBe('var(--ecw-space-16)');
    });

    it('emits no padding style when nothing is set', () => {
      expect(host().style.padding).toBe('');
    });
  });

  describe('radius', () => {
    it('maps `radius` to var(--ecw-radius-{n})', () => {
      fixture.componentRef.setInput('radius', 4);
      fixture.detectChanges();
      expect(host().style.borderRadius).toBe('var(--ecw-radius-4)');
    });

    it('emits no border-radius style when unset', () => {
      expect(host().style.borderRadius).toBe('');
    });
  });

  describe('display', () => {
    it('defaults to block', () => {
      expect(host().style.display).toBe('block');
    });

    it('reflects a changed display mode', () => {
      fixture.componentRef.setInput('display', 'flex');
      fixture.detectChanges();
      expect(host().style.display).toBe('flex');
    });
  });

  describe('background', () => {
    it('maps the `surface` role to the public surface token', () => {
      fixture.componentRef.setInput('background', 'surface');
      fixture.detectChanges();
      expect(host().style.background).toBe('var(--ecw-color-neutral-0)');
    });

    it('maps the `subtle` role to its token', () => {
      fixture.componentRef.setInput('background', 'subtle');
      fixture.detectChanges();
      expect(host().style.background).toBe('var(--ecw-color-neutral-50)');
    });

    it('maps the `muted` role to its token', () => {
      fixture.componentRef.setInput('background', 'muted');
      fixture.detectChanges();
      expect(host().style.background).toBe('var(--ecw-color-neutral-200)');
    });

    it('omits the background style when unset', () => {
      expect(host().style.background).toBe('');
    });
  });

  it('projects content', () => {
    const projected = TestBed.createComponent(ContentHostComponent);
    projected.detectChanges();
    expect(projected.nativeElement.textContent?.trim()).toBe('Boxed content');
  });
});
