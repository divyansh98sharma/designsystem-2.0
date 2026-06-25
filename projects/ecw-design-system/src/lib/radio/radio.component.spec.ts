import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcwRadioComponent } from './radio.component';

/** Host that projects label content into the radio. */
@Component({
  standalone: true,
  imports: [EcwRadioComponent],
  template: `<ecw-radio>Option A</ecw-radio>`,
})
class LabelHostComponent {}

/** Host with a two-radio group sharing a name. */
@Component({
  standalone: true,
  imports: [EcwRadioComponent],
  template: `
    <ecw-radio name="g" value="a" [checked]="true">A</ecw-radio>
    <ecw-radio name="g" value="b">B</ecw-radio>
  `,
})
class GroupHostComponent {}

describe('EcwRadioComponent', () => {
  let fixture: ComponentFixture<EcwRadioComponent>;
  let component: EcwRadioComponent;

  const input = (): HTMLInputElement =>
    fixture.nativeElement.querySelector('.ecw-radio__input');

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwRadioComponent] });
    fixture = TestBed.createComponent(EcwRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders a real <input type="radio"> (so arrow-key group nav works natively)', () => {
    expect(input().tagName).toBe('INPUT');
    expect(input().type).toBe('radio');
  });

  it('reflects the checked input', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(input().checked).toBe(true);
  });

  it('removes the control from the tab order when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(input().disabled).toBe(true);
  });

  it('updates the checked model when selected', () => {
    input().checked = true;
    input().dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
  });

  it('forwards name and value (radios share a name to form a group)', () => {
    fixture.componentRef.setInput('name', 'plan');
    fixture.componentRef.setInput('value', 'pro');
    fixture.detectChanges();
    expect(input().getAttribute('name')).toBe('plan');
    expect(input().getAttribute('value')).toBe('pro');
  });
});

describe('EcwRadioComponent (group behaviour)', () => {
  it('enforces single selection within a shared name (native)', () => {
    const fixture = TestBed.createComponent(GroupHostComponent);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll(
      '.ecw-radio__input',
    ) as NodeListOf<HTMLInputElement>;
    expect(inputs[0].checked).toBe(true);
    inputs[1].click();
    expect(inputs[1].checked).toBe(true);
    expect(inputs[0].checked).toBe(false);
  });
});

describe('EcwRadioComponent (projected label)', () => {
  it('projects label content', () => {
    const fixture = TestBed.createComponent(LabelHostComponent);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.ecw-radio__label');
    expect(label?.textContent?.trim()).toBe('Option A');
  });
});
