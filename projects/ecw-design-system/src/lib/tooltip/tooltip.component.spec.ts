import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcwTooltipComponent } from './tooltip.component';

/** Host that projects text content into the tooltip. */
@Component({
  standalone: true,
  imports: [EcwTooltipComponent],
  template: `<ecw-tooltip>A simple text popup tip.</ecw-tooltip>`,
})
class ContentHostComponent {}

describe('EcwTooltipComponent', () => {
  let fixture: ComponentFixture<EcwTooltipComponent>;
  let component: EcwTooltipComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwTooltipComponent] });
    fixture = TestBed.createComponent(EcwTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('exposes role="tooltip" on the host for assistive tech', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('tooltip');
  });

  it('defaults to the top-left notch position', () => {
    expect(component.position()).toBe('top-left');
    expect(fixture.nativeElement.getAttribute('data-position')).toBe('top-left');
  });

  it('reflects the position input onto data-position (drives the notch CSS)', () => {
    fixture.componentRef.setInput('position', 'right-center');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-position')).toBe(
      'right-center',
    );
  });
});

describe('EcwTooltipComponent (projected content)', () => {
  it('projects text content into the label', () => {
    const fixture = TestBed.createComponent(ContentHostComponent);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.ecw-tooltip__label');
    expect(label?.textContent?.trim()).toBe('A simple text popup tip.');
  });
});
