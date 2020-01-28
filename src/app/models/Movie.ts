import { MovieComment } from "./MovieComment";

export interface Movie {
    category: string;
    actors: Array<string>;
    director: string;
    music: string;
    title: string;
    dateOfCreation: string;
    studio: string;
    description: string;
    rating: number;
    poster: string;
    trailer: string;
    duration: number;
    country: string;
    imdbRating: number;
    language: string;
    countryOfShooting: string;
    mainActors: Array<string>;
    awards: Array<string>;
    comments: Array<MovieComment>;
}