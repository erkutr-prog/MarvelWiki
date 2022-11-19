import {CharacterComics, Series, Thumbnail, URL} from './CommonTypes';

export interface ICharacters {
  comics: CharacterComics;
  description: string;
  events: Series;
  id: Number;
  modified: string;
  name: string;
  resourceURI: string;
  series: Series;
  stories: Series;
  thumbnail: Thumbnail;
  urls: Array<URL>;
}
