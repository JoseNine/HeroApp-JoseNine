import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { HeroDetails } from './hero-details';
import { HeroService } from '../../services/hero-service';
import { UppercaseDirective } from '../../directives/upper-case.directive';

describe('HeroDetails', () => {
  let component: HeroDetails;
  let fixture: ComponentFixture<HeroDetails>;

  const mockDialogData = {
    mode: 'create',
    hero: null
  };

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroDetails,
        ReactiveFormsModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        UppercaseDirective
      ],
      providers: [
        HeroService,
        provideHttpClient(withFetch()),
        provideNoopAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should form valid', () => {
    const fixture = TestBed.createComponent(HeroDetails);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let name = app.heroForm.controls['name'];
    let company = app.heroForm.controls['company'];
    let occupation = app.heroForm.controls['occupation'];

    name.setValue('Batman');
    company.setValue('DC');
    occupation.setValue('Millionaire');

    expect(app.heroForm.valid).toBeTrue();
  });

  it('should form invalid', () => {
    const fixture = TestBed.createComponent(HeroDetails);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let name = app.heroForm.controls['name'];
    let company = app.heroForm.controls['company'];
    let occupation = app.heroForm.controls['occupation'];

    name.setValue('');
    company.setValue('DC');
    occupation.setValue('7');

    expect(app.heroForm.invalid).toBeTrue();
  });
});
