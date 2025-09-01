import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { HeroService } from './hero-service';
import {
  Hero,
  CreateHeroDto,
  UpdateHeroDto,
} from '../interfaces/heroes.interface';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  const mockHeroes: Hero[] = [
    {
      id: 1,
      name: 'Spider-Man',
      slug: 'spider-man',
      work: {
        base: 'New York',
        occupation: 'Photographer',
      },
    },
    {
      id: 2,
      name: 'Spider-Woman',
      slug: 'spider-woman',
      work: {
        base: 'Los Angeles',
        occupation: 'Agent',
      },
    },
    {
      id: 3,
      name: 'Batman',
      slug: 'batman',
      work: {
        base: 'Gotham City',
        occupation: 'Detective',
      },
    },
    {
      id: 4,
      name: 'Iron Spider',
      slug: 'iron-spider',
      work: {
        base: 'Stark Tower',
        occupation: 'Avenger',
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllHeroes', () => {
    it('should fetch heroes successfully and update heroes signal', () => {
      service.getAllHeroes().subscribe((heroes) => {
        expect(heroes).toEqual(mockHeroes);
        expect(service.heroesList()).toEqual(mockHeroes);
      });

      const req = httpMock.expectOne('/heroes.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockHeroes);
    });
  });

  describe('getHeroById', () => {
    it('should return hero when valid ID is provided', () => {
      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      const hero = service.getHeroById(1);
      expect(hero).toEqual(mockHeroes[0]);
      expect(hero.name).toBe('Spider-Man');
    });

    it('should throw error when hero ID does not exist', () => {
      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      expect(() => service.getHeroById(999)).toThrowError(
        'Hero with id 999 not found'
      );
    });
  });

  describe('searchHeroesByName', () => {
    it('should return heroes that contain "spider" in their name', () => {
      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      const searchResults = service.searchHeroesByName('spider');

      expect(searchResults).toHaveSize(3);
      expect(searchResults).toEqual([
        mockHeroes[0],
        mockHeroes[1],
        mockHeroes[3],
      ]);
    });

    it('should return empty array when searching for non-existent hero name', () => {
      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      const searchResults = service.searchHeroesByName('Wonder Woman');

      expect(searchResults).toHaveSize(0);
      expect(searchResults).toEqual([]);
    });
  });

  describe('createHero', () => {
    it('should create a new hero successfully', () => {
      const newHeroData: CreateHeroDto = {
        name: 'Iron Man',
        slug: 'iron-man',
        work: {
          base: 'Stark Tower',
          occupation: 'Inventor',
        },
      };

      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      service.createHero(newHeroData).subscribe((heroes) => {
        expect(heroes).toHaveSize(5);

        const newHero = heroes.find(
          (hero) => hero.name === 'IRON MAN' && hero.slug === 'iron-man'
        );
        expect(newHero).toBeDefined();
        expect(newHero).toEqual({
          id: 5,
          name: 'IRON MAN',
          slug: 'iron-man',
          work: {
            base: 'Stark Tower',
            occupation: 'Inventor',
          },
        });
      });

      const createReq = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );
      expect(createReq.request.method).toBe('POST');
      createReq.flush({});
    });
  });

  describe('updateHero', () => {
    it('should update an existing hero successfully', () => {
      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      const updateData: UpdateHeroDto = {
        name: 'Amazing Spider-Man',
        work: {
          base: 'Queens, New York',
          occupation: 'Superhero',
        },
      };

      service.updateHero(1, updateData).subscribe((updatedHero) => {
        expect(updatedHero).toEqual({
          id: 1,
          name: 'Amazing Spider-Man',
          slug: 'spider-man',
          work: {
            base: 'Queens, New York',
            occupation: 'Superhero',
          },
        });
      });

      const updateReq = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      expect(updateReq.request.method).toBe('PATCH');
      updateReq.flush({});
    });
  });

  describe('deleteHero', () => {
    it('should delete an existing hero successfully', () => {
      service.getAllHeroes().subscribe();
      const req = httpMock.expectOne('/heroes.json');
      req.flush(mockHeroes);

      service.deleteHero(1).subscribe((deletedHero) => {
        expect(deletedHero).toEqual(mockHeroes[0]); // Spider-Man
        expect(service.heroesList()).toHaveSize(3); // Debe quedar 3 héroes
      });

      const deleteReq = httpMock.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      expect(deleteReq.request.method).toBe('DELETE');
      deleteReq.flush({});
    });
  });
});
