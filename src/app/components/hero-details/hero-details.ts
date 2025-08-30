import { Component, inject, model, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CreateHeroDto,
  Hero,
  UpdateHeroDto,
} from '../../interfaces/heroes.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeroService } from '../../services/hero-service';
import { UppercaseDirective } from '../../directives/upper-case.directive';

@Component({
  selector: 'app-hero-details',
  imports: [
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    UppercaseDirective,
  ],
  templateUrl: './hero-details.html',
  styleUrl: './hero-details.scss',
})
export class HeroDetails {
  private data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  private dialogRef = inject(MatDialogRef);
  heroModel = model<Hero>();

  heroForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    company: ['', [Validators.required, Validators.maxLength(100)]],
    occupation: ['', [Validators.required, Validators.maxLength(100)]],
  });

  mode = this.data.mode;
  hero = this.data.hero;

  ngOnInit() {
    if (this.mode === 'edit' && this.hero) {
      this.heroForm.patchValue({
        name: this.hero.name,
        occupation: this.hero.work.occupation,
        company: this.hero.work.base,
      });
    }
  }

  getControl(name: string) {
    return this.heroForm.get(name) as FormControl;
  }

  onSubmit() {
    this.heroForm.markAllAsTouched();
    if (this.heroForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      const hero: CreateHeroDto = {
        name: this.heroForm.value.name!,
        slug: this.heroForm.value.name!.toLowerCase().replace(/ /g, '-'),
        work: {
          base: this.heroForm.value.company!,
          occupation: this.heroForm.value.occupation!,
        },
      };
      this.heroService.createHero(hero);
    } else {
      const hero: UpdateHeroDto = {
        name: this.heroForm.value.name!,
        slug: this.heroForm.value.name!.toLowerCase().replace(/ /g, '-'),
        work: {
          base: this.heroForm.value.company!,
          occupation: this.heroForm.value.occupation!,
        },
      };
      this.heroService.updateHero(this.hero.id, hero);
    }
    this.dialogRef.close(true);
  }
}
