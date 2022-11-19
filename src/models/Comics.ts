import {CharacterComics, Thumbnail, Items, Series, URL} from './CommonTypes';

export interface IComics {
  characters: CharacterComics;
  collectedIssues: Array<Items>;
  collections: Array<Items>;
  creators: Series;
  dates: Array<ComicsDates>;
  description: string;
  diamondCode: string;
  digitalId: Number;
  ean: string;
  events: Series;
  format: string;
  id: Number;
  images: Array<Thumbnail>;
  isbn: string;
  issn: string;
  issueNumber: Number;
  modified: string;
  pageCount: Number;
  prices: Array<ComicsPrices>;
  resourceURI: string;
  series: Items;
  stories: Series;
  textObjects: Array<ComicsText>;
  thumbnail: Thumbnail;
  title: string;
  upc: string;
  urls: Array<URL>;
  variantDescription: string;
  variants: Array<Items>;
}

export type ComicsDates = {
  date: string;
  type: string;
};

export type ComicsPrices = {
  price: Number;
  type: string;
};

export type ComicsText = {
  language: string;
  text: string;
  type: string;
};
