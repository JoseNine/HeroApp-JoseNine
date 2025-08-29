import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';
import {
  CreateHeroDto,
  Hero,
  PageSize,
  PaginatedHeroes,
  UpdateHeroDto,
} from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesJSONPath = '/heroes.json';
  private http = inject(HttpClient);
  private heroes = signal<Hero[]>([]);

  getAllHeroes() {
    return this.http.get<Hero[]>(this.heroesJSONPath).pipe(
      tap((heroes) => {
        this.heroes.set(heroes);
      }),
      catchError((error) => {
        console.error('Error loading heroes:', error);
        return of([]);
      })
    );
  }

  getHeroesPaginated(page: number, size: PageSize): PaginatedHeroes {
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedHeroes = this.heroes().slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.heroes().length / size);
    if (paginatedHeroes.length === 0 || totalPages === 0) {
      throw new Error('No heroes found');
    }
    if (page < 0) {
      throw new Error('Page number must be greater than 0');
    }
    if (size <= 0) {
      throw new Error('Page size must be greater than 0');
    }
    if (page >= totalPages) {
      throw new Error('Page number must be less than total pages');
    }
    if (size > this.heroes().length) {
      throw new Error('Page size must be less than total heroes');
    }
    const paginatedHeroesResponse: PaginatedHeroes = {
      heroes: paginatedHeroes,
      totalElements: this.heroes().length,
      totalPages,
      currentPage: page,
      pageSize: size,
    };
    return paginatedHeroesResponse;
  }

  getHeroById(id: number) {
    const heroIndex = this.heroes().findIndex((hero) => hero.id === id);
    if (heroIndex === -1) {
      throw new Error(`Hero with id ${id} not found`);
    }
    return this.heroes()[heroIndex];
  }

  searchHeroesByName(name: string) {
    return this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  createHero(hero: CreateHeroDto) {
    const newHero: Hero = {
      id: this.heroes().length + 1,
      name: hero.name.toUpperCase(),
      slug: hero.slug.toLowerCase(),
      work: hero.work,
    };
    this.heroes.set([...this.heroes(), newHero]);
  }

  updateHero(id: number, hero: UpdateHeroDto) {
    this.heroes.update((heroes) => {
      const heroIndex = heroes.findIndex((h) => h.id === id);
      if (heroIndex === -1) {
        throw new Error(`Hero with id ${id} not found`);
      }
      const currentHero = heroes[heroIndex];
      const updatedHero: Hero = {
        ...currentHero,
        ...hero,
      };
      heroes[heroIndex] = updatedHero;
      return heroes;
    });
  }

  deleteHero(id: number) {
    const heroIndex = this.heroes().findIndex((h) => h.id === id);
    if (heroIndex === -1) {
      throw new Error(`Hero with id ${id} not found`);
    }
    this.heroes.update((heroes) => {
      heroes.splice(heroIndex, 1);
      return heroes;
    });
  }

  resetHeroes() {
    this.heroes.set([]);
  }

  reloadHeroes() {
    this.resetHeroes();
    this.getAllHeroes();
  }
}
