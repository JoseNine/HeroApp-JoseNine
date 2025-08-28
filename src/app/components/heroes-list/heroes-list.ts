import { Component, inject, signal } from '@angular/core';
import { HeroService } from '../../services/hero-service';
import { HeroArray } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroes-list',
  imports: [],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.scss',
})
export class HeroesList {
  private heroService = inject(HeroService);
  heroes = signal<HeroArray>([]);
}
