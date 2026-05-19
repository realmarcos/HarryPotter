export interface Book {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

export interface Character {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  children: string[];
  image: string;
  birthdate: string;
  index: number;
}

export interface Spell {
  spell: string;
  use: string;
  index: number;
}

export interface House {
  house: string;
  emoji: string;
  founder: string;
  colors: string[];
  animal: string;
  index: number;
}

export type Category = "books" | "characters" | "spells" | "houses";

export interface FavoriteItem {
  id: string;
  type: Category;
  title: string;
  subtitle?: string;
  image?: string;
  emoji?: string;
}
