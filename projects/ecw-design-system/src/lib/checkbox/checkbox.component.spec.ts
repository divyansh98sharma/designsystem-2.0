import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcwCheckboxComponent } from './checkbox.component';

/** Host that projects label content into the checkbox. */
@Component({
  standalone: true,
  imports: [EcwCheckboxComponent],
  template: `<ecw-checkbox>Accept terms</ecw-checkbox>`,
})
class LabelHostComponent {}

/** Host that two-way binds checked and listens for checkedChange. */
@Component({
  standalone: true,
  imports: [EcwCheckboxComponent],
  template: `<ecw-checkbox [(checked)]="value" (checkedChange)="last = $event">Label</ecw-checkbox>`,
})
class BoundHostComponent {
  value = false;
  last: boolean | undefined;
}

describe('EcwCheckboxComponent', () => {
  let fixture: ComponentFixture<EcwCheckboxComponent>;
  let component: EcwCheckboxComponent;

  const input = (): HTMLInputElement =>
    fixture.nativeElement.querySelector('.ecw-checkbox__input');

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwCheckboxComponent] });
    fixture = TestBed.createComponent(EcwCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders a real <input type="checkbox"> (so Tab/Space work natively)', () => {
    expect(input().tagName).toBe('INPUT');
    expect(input().type).toBe('checkbox');
  });

  it('reflects the checked input', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(input().checked).toBe(true);
  });

  it('reflects the indeterminate state onto the native DOM property', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    expect(input().indeterminate).toBe(true);
  });

  it('removes the control from the tab order when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(input().disabled).toBe(true);
  });

  it('updates the checked model when toggled', () => {
    input().checked = true;
    input().dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
  });

  it('links the label to the input via a stable id', () => {
    expect(input().id).toBe(component.inputId());
    expect(input().id).toMatch(/^ecw-checkbox-/);
  });

  it('exposes an ariaLabel when set (for unlabeled checkboxes)', () => {
    fixture.componentRef.setInput('ariaLabel', 'Select row');
    fixture.detectChanges();
    expect(input().getAttribute('aria-label')).toBe('Select row');
  });

  it('forwards name and value for form submission', () => {
    fixture.componentRef.setInput('name', 'terms');
    fixture.componentRef.setInput('value', 'yes');
    fixture.detectChanges();
    expect(input().getAttribute('name')).toBe('terms');
    expect(input().getAttribute('value')).toBe('yes');
  });
});

describe('EcwCheckboxComponent (projected label)', () => {
  it('projects label content', () => {
    const fixture = TestBed.createComponent(LabelHostComponent);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.ecw-checkbox__label');
    expect(label?.textContent?.trim()).toBe('Accept terms');
  });
});

describe('EcwCheckboxComponent (two-way binding)', () => {
  it('propagates a toggle through [(checked)] and (checkedChange)', () => {
    const fixture = TestBed.createComponent(BoundHostComponent);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      '.ecw-checkbox__input',
    );
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe(true);
    expect(fixture.componentInstance.last).toBe(true);
  });
});
