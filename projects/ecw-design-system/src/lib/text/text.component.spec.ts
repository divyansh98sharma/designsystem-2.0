import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { EcwTextComponent } from './text.component';

@Component({
  standalone: true,
  imports: [EcwTextComponent],
  template: `<ecw-text>Hello text</ecw-text>`,
})
class HostComponent {}

describe('EcwTextComponent', () => {
  let fixture: ComponentFixture<EcwTextComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcwTextComponent);
    host = fixture.nativeElement as HTMLElement;
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('applies the ecw-text class', () => {
    fixture.detectChanges();
    expect(host.classList.contains('ecw-text')).toBe(true);
  });

  it('defaults to size 14 → font-size 14 token and line-height 20 token', () => {
    fixture.detectChanges();
    expect(host.style.fontSize).toBe('var(--ecw-typography-font-size-14)');
    expect(host.style.lineHeight).toBe('var(--ecw-typography-line-height-20)');
  });

  it('maps size 12 → line-height 16 token', () => {
    fixture.componentRef.setInput('size', 12);
    fixture.detectChanges();
    expect(host.style.fontSize).toBe('var(--ecw-typography-font-size-12)');
    expect(host.style.lineHeight).toBe('var(--ecw-typography-line-height-16)');
  });

  it('maps weight to the matching font-weight token', () => {
    fixture.componentRef.setInput('weight', 'semi-bold');
    fixture.detectChanges();
    expect(host.style.fontWeight).toBe(
      'var(--ecw-typography-font-weight-semi-bold)',
    );
  });

  it('maps color roles to public color tokens and omits when unset', () => {
    fixture.detectChanges();
    expect(host.style.color).toBe('');

    fixture.componentRef.setInput('color', 'brand');
    fixture.detectChanges();
    expect(host.style.color).toBe('var(--ecw-color-teal-700)');

    fixture.componentRef.setInput('color', 'error');
    fixture.detectChanges();
    expect(host.style.color).toBe('var(--ecw-color-error-700)');

    fixture.componentRef.setInput('color', 'muted');
    fixture.detectChanges();
    expect(host.style.color).toBe('var(--ecw-color-neutral-600)');
  });

  it('reflects align when set and omits it when unset', () => {
    fixture.detectChanges();
    expect(host.style.textAlign).toBe('');

    fixture.componentRef.setInput('align', 'center');
    fixture.detectChanges();
    expect(host.style.textAlign).toBe('center');
  });

  it('adds the ecw-text--truncate class when truncate is true', () => {
    fixture.detectChanges();
    expect(host.classList.contains('ecw-text--truncate')).toBe(false);

    fixture.componentRef.setInput('truncate', true);
    fixture.detectChanges();
    expect(host.classList.contains('ecw-text--truncate')).toBe(true);
  });

  it('projects content', () => {
    const hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.textContent).toContain('Hello text');
  });
});
