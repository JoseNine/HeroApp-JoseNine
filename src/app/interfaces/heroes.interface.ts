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

export type HeroArray = Hero[];
