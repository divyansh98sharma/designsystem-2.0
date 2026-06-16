import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcwStackComponent } from './stack.component';

/** Host that projects children into the stack. */
@Component({
  standalone: true,
  imports: [EcwStackComponent],
  template: `<ecw-stack><span class="child">A</span><span class="child">B</span></ecw-stack>`,
})
class ProjectionHostComponent {}

describe('EcwStackComponent', () => {
  let fixture: ComponentFixture<EcwStackComponent>;
  let component: EcwStackComponent;

  /** The host element. */
  const host = (): HTMLElement => fixture.nativeElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [EcwStackComponent] });
    fixture = TestBed.createComponent(EcwStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('applies the ecw-stack class', () => {
    expect(host().classList).toContain('ecw-stack');
  });

  it('defaults to display:flex and flex-direction:column', () => {
    expect(host().style.display).toBe('flex');
    expect(host().style.flexDirection).toBe('column');
  });

  it('uses inline-flex when inline is set', () => {
    fixture.componentRef.setInput('inline', true);
    fixture.detectChanges();
    expect(host().style.display).toBe('inline-flex');
  });

  it('reflects the direction input', () => {
    fixture.componentRef.setInput('direction', 'row');
    fixture.detectChanges();
    expect(host().style.flexDirection).toBe('row');
  });

  it('maps gap to the matching spacing token', () => {
    fixture.componentRef.setInput('gap', 8);
    fixture.detectChanges();
    expect(host().style.gap).toBe('var(--ecw-space-8)');
  });

  it('omits gap when unset', () => {
    expect(host().style.gap).toBe('');
  });

  it('maps align/justify roles to their flexbox values', () => {
    fixture.componentRef.setInput('align', 'start');
    fixture.componentRef.setInput('justify', 'between');
    fixture.detectChanges();
    expect(host().style.alignItems).toBe('flex-start');
    expect(host().style.justifyContent).toBe('space-between');
  });

  it('maps `center` and `end` roles', () => {
    fixture.componentRef.setInput('align', 'center');
    fixture.componentRef.setInput('justify', 'end');
    fixture.detectChanges();
    expect(host().style.alignItems).toBe('center');
    expect(host().style.justifyContent).toBe('flex-end');
  });

  it('omits align and justify when unset', () => {
    expect(host().style.alignItems).toBe('');
    expect(host().style.justifyContent).toBe('');
  });

  it('sets flex-wrap to wrap when wrap is set', () => {
    fixture.componentRef.setInput('wrap', true);
    fixture.detectChanges();
    expect(host().style.flexWrap).toBe('wrap');
  });

  it('omits flex-wrap when wrap is false', () => {
    expect(host().style.flexWrap).toBe('');
  });
});

describe('EcwStackComponent (projected content)', () => {
  it('projects children into the stack', () => {
    const fixture = TestBed.createComponent(ProjectionHostComponent);
    fixture.detectChanges();
    const children = fixture.nativeElement.querySelectorAll('.child');
    expect(children.length).toBe(2);
  });
});
