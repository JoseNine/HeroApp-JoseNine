import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatLabel } from '@angular/material/input';

import { ConfirmDialog, ConfirmDialogData } from './confirm-dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;

  const mockDialogData: ConfirmDialogData = {
    heroName: 'Batman',
  };

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog, MatDialogModule, MatButton, MatLabel],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hero name from dialog data', () => {
    expect(component.data.heroName).toBe('Batman');
  });
});
