import { Observable } from 'rxjs';

export interface Hero {
  id: number;
  name: string;
  slug: string;
  work: Work;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface CreateHeroDto {
  name: string;
  slug: string;
  work: Work;
}

export interface UpdateHeroDto {
  name?: string;
  slug?: string;
  work?: Work;
}

export interface PaginatedHeroes {
  heroes: Hero[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export type HeroArray = Hero[];

export type PageSize = 10 | 20 | 50 | 100;
