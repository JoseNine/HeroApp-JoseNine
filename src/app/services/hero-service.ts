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
  // private heroesSubject = new BehaviorSubject<Hero[]>([]);
  // public heroes$ = this.heroesSubject.asObservable();
  // private heroesResource = resource({
  //   loader: () => firstValueFrom(this.getAllHeroes()),
  // });

  getAllHeroes() {
    return this.http.get<Hero[]>(this.heroesJSONPath).pipe(
      tap((heroes) => {
        this.heroes.set(heroes);
        // this.heroesSubject.next(heroes);
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
//   private heroes: Hero[] = [];
//   private nextId = 1;
//   private heroesSubject = new BehaviorSubject<Hero[]>([]);
//   public heroes$ = this.heroesSubject.asObservable();
//   private isLoaded = false;
//   private readonly heroesJsonPath = '/assets/heroes.json';
//   private http = inject(HttpClient);

//   constructor() {
//     this.loadHeroes();
//   }

//   /**
//    * Load heroes from JSON file
//    * @returns Observable<Hero[]>
//    */
//   private loadHeroes(): Observable<Hero[]> {
//     if (this.isLoaded) {
//       return of(this.heroes);
//     }

//     return this.http.get<Hero[]>(this.heroesJsonPath).pipe(
//       tap((heroes) => {
//         this.heroes = heroes.map((hero) => ({
//           ...hero,
//           name: hero.name.toUpperCase(), // Ensure names are uppercase
//         }));
//         this.nextId = Math.max(...this.heroes.map((h) => h.id), 0) + 1;
//         this.isLoaded = true;
//         this.heroesSubject.next([...this.heroes]);
//       }),
//       catchError((error) => {
//         console.error('Error loading heroes from JSON:', error);
//         // Fallback to default heroes if JSON loading fails
//         this.heroes = this.getDefaultHeroes();
//         this.nextId = Math.max(...this.heroes.map((h) => h.id), 0) + 1;
//         this.isLoaded = true;
//         this.heroesSubject.next([...this.heroes]);
//         return of(this.heroes);
//       })
//     );
//   }

//   /**
//    * Get default heroes as fallback
//    * @returns Hero[]
//    */
//   private getDefaultHeroes(): Hero[] {
//     return [
//       {
//         id: 1,
//         name: 'SUPERMAN',
//         slug: 'superman',
//         work: {
//           occupation: 'Reporter',
//           base: 'Metropolis',
//         },
//       },
//       {
//         id: 2,
//         name: 'SPIDERMAN',
//         slug: 'spiderman',
//         work: {
//           occupation: 'Photographer',
//           base: 'New York',
//         },
//       },
//       {
//         id: 3,
//         name: 'BATMAN',
//         slug: 'batman',
//         work: {
//           occupation: 'CEO Wayne Enterprises',
//           base: 'Gotham City',
//         },
//       },
//       {
//         id: 4,
//         name: 'MANOLITO EL FUERTE',
//         slug: 'manolito-el-fuerte',
//         work: {
//           occupation: 'Luchador',
//           base: 'Ciudad de México',
//         },
//       },
//     ];
//   }

//   /**
//    * Ensure heroes are loaded before performing operations
//    * @returns Observable<Hero[]>
//    */
//   private ensureHeroesLoaded(): Observable<Hero[]> {
//     if (this.isLoaded) {
//       return of(this.heroes);
//     }
//     return this.loadHeroes();
//   }

//   /**
//    * Get all heroes
//    * @returns Observable<Hero[]>
//    */
//   getAllHeroes(): Observable<Hero[]> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => [...this.heroes]),
//       delay(500), // Simulate API delay
//       catchError(this.handleError<Hero[]>('getAllHeroes', []))
//     );
//   }

//   /**
//    * Get hero by ID
//    * @param id Hero ID
//    * @returns Observable<Hero>
//    */
//   getHeroById(id: number): Observable<Hero> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         const hero = this.heroes.find((h) => h.id === id);
//         if (!hero) {
//           throw new Error(`Hero with id ${id} not found`);
//         }
//         return { ...hero };
//       }),
//       delay(300),
//       catchError(this.handleError<Hero>(`getHeroById id=${id}`))
//     );
//   }

//   /**
//    * Search heroes by name containing the search term
//    * @param searchTerm Search term to look for in hero names
//    * @returns Observable<Hero[]>
//    */
//   searchHeroesByName(searchTerm: string): Observable<Hero[]> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         if (!searchTerm.trim()) {
//           return [...this.heroes];
//         }

//         return this.heroes
//           .filter((hero) =>
//             hero.name.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//           .map((hero) => ({ ...hero }));
//       }),
//       delay(400),
//       catchError(this.handleError<Hero[]>('searchHeroesByName', []))
//     );
//   }

//   /**
//    * Create a new hero
//    * @param heroData Hero data without ID
//    * @returns Observable<Hero>
//    */
//   createHero(heroData: CreateHeroDto): Observable<Hero> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         // Validate required fields
//         if (!heroData.name || !heroData.slug || !heroData.work) {
//           throw new Error('Missing required fields');
//         }

//         // Check if slug already exists
//         const slugExists = this.heroes.some(
//           (hero) => hero.slug === heroData.slug
//         );
//         if (slugExists) {
//           throw new Error('Hero with this slug already exists');
//         }

//         const newHero: Hero = {
//           id: this.nextId++,
//           name: heroData.name.toUpperCase(), // Always uppercase as per requirements
//           slug: heroData.slug.toLowerCase(),
//           work: { ...heroData.work },
//         };

//         this.heroes.push(newHero);
//         this.heroesSubject.next([...this.heroes]);

//         return { ...newHero };
//       }),
//       delay(600),
//       catchError(this.handleError<Hero>('createHero'))
//     );
//   }

//   /**
//    * Update an existing hero (PATCH)
//    * @param id Hero ID
//    * @param updateData Partial hero data to update
//    * @returns Observable<Hero>
//    */
//   updateHero(id: number, updateData: UpdateHeroDto): Observable<Hero> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         const heroIndex = this.heroes.findIndex((h) => h.id === id);

//         if (heroIndex === -1) {
//           throw new Error(`Hero with id ${id} not found`);
//         }

//         // Check if slug already exists (if trying to update slug)
//         if (updateData.slug) {
//           const slugExists = this.heroes.some(
//             (hero) => hero.slug === updateData.slug && hero.id !== id
//           );
//           if (slugExists) {
//             throw new Error('Hero with this slug already exists');
//           }
//         }

//         const currentHero = this.heroes[heroIndex];
//         const updatedHero: Hero = {
//           ...currentHero,
//           ...(updateData.name && { name: updateData.name.toUpperCase() }),
//           ...(updateData.slug && { slug: updateData.slug.toLowerCase() }),
//           ...(updateData.work && {
//             work: {
//               ...currentHero.work,
//               ...updateData.work,
//             },
//           }),
//         };

//         this.heroes[heroIndex] = updatedHero;
//         this.heroesSubject.next([...this.heroes]);

//         return { ...updatedHero };
//       }),
//       delay(500),
//       catchError(this.handleError<Hero>(`updateHero id=${id}`))
//     );
//   }

//   /**
//    * Delete a hero
//    * @param id Hero ID
//    * @returns Observable<boolean>
//    */
//   deleteHero(id: number): Observable<boolean> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         const heroIndex = this.heroes.findIndex((h) => h.id === id);

//         if (heroIndex === -1) {
//           throw new Error(`Hero with id ${id} not found`);
//         }

//         this.heroes.splice(heroIndex, 1);
//         this.heroesSubject.next([...this.heroes]);

//         return true;
//       }),
//       delay(400),
//       catchError(this.handleError<boolean>('deleteHero'))
//     );
//   }

//   /**
//    * Get heroes with pagination
//    * @param page Page number (0-based)
//    * @param size Page size
//    * @returns Observable with paginated results
//    */
//   getHeroesPaginated(
//     page: number = 0,
//     size: number = 10
//   ): Observable<{
//     heroes: Hero[];
//     totalElements: number;
//     totalPages: number;
//     currentPage: number;
//     pageSize: number;
//   }> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         const startIndex = page * size;
//         const endIndex = startIndex + size;
//         const paginatedHeroes = this.heroes.slice(startIndex, endIndex);
//         const totalPages = Math.ceil(this.heroes.length / size);

//         return {
//           heroes: paginatedHeroes.map((hero) => ({ ...hero })),
//           totalElements: this.heroes.length,
//           totalPages,
//           currentPage: page,
//           pageSize: size,
//         };
//       }),
//       delay(400),
//       catchError(
//         this.handleError('getHeroesPaginated', {
//           heroes: [],
//           totalElements: 0,
//           totalPages: 0,
//           currentPage: 0,
//           pageSize: size,
//         })
//       )
//     );
//   }

//   /**
//    * Search heroes with pagination
//    * @param searchTerm Search term
//    * @param page Page number
//    * @param size Page size
//    * @returns Observable with paginated search results
//    */
//   searchHeroesWithPagination(
//     searchTerm: string,
//     page: number = 0,
//     size: number = 10
//   ): Observable<{
//     heroes: Hero[];
//     totalElements: number;
//     totalPages: number;
//     currentPage: number;
//     pageSize: number;
//     searchTerm: string;
//   }> {
//     return this.ensureHeroesLoaded().pipe(
//       map(() => {
//         let filteredHeroes = this.heroes;

//         if (searchTerm && searchTerm.trim()) {
//           filteredHeroes = this.heroes.filter((hero) =>
//             hero.name.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//         }

//         const startIndex = page * size;
//         const endIndex = startIndex + size;
//         const paginatedHeroes = filteredHeroes.slice(startIndex, endIndex);
//         const totalPages = Math.ceil(filteredHeroes.length / size);

//         return {
//           heroes: paginatedHeroes.map((hero) => ({ ...hero })),
//           totalElements: filteredHeroes.length,
//           totalPages,
//           currentPage: page,
//           pageSize: size,
//           searchTerm: searchTerm || '',
//         };
//       }),
//       delay(400),
//       catchError(
//         this.handleError('searchHeroesWithPagination', {
//           heroes: [],
//           totalElements: 0,
//           totalPages: 0,
//           currentPage: 0,
//           pageSize: size,
//           searchTerm: searchTerm || '',
//         })
//       )
//     );
//   }

//   /**
//    * Handle Http operation that failed
//    * @param operation name of the operation that failed
//    * @param result optional value to return as the observable result
//    */
//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       console.error(`${operation} failed:`, error);

//       // Let the app keep running by returning an empty result or the provided result
//       return of(result as T);
//     };
//   }

//   /**
//    * Get current heroes count
//    * @returns number of heroes
//    */
//   getHeroesCount(): number {
//     return this.heroes.length;
//   }

//   /**
//    * Reset heroes to initial state (useful for testing)
//    */
//   resetHeroes(): void {
//     this.heroes = this.getDefaultHeroes();
//     this.nextId = Math.max(...this.heroes.map((h) => h.id), 0) + 1;
//     this.heroesSubject.next([...this.heroes]);
//   }

//   /**
//    * Force reload heroes from JSON file
//    * @returns Observable<Hero[]>
//    */
//   reloadHeroes(): Observable<Hero[]> {
//     this.isLoaded = false;
//     return this.loadHeroes();
//   }
// }
