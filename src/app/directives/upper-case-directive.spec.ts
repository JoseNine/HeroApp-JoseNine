import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { UppercaseDirective } from './upper-case.directive';

// Componente de prueba para usar la directiva
@Component({
  template: '<input [Uppercase] type="text" />',
  imports: [UppercaseDirective],
  standalone: true,
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [UpperCasePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component with directive', () => {
    expect(component).toBeTruthy();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
  });
});
