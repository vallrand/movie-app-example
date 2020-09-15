export enum MovieType {
    movie = 'movie',
    series = 'series',
    episode = 'episode'
}

export const enum ServerResponseType {
    TRUE = 'True',
    FALSE = 'False'
}

export interface GenericServerResponse {
    Response: ServerResponseType;
    Error?: string;
}

export interface GenericMovieItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: MovieType;
    Poster: string;
}

export interface SearchMovieResult extends GenericServerResponse {
    Search: GenericMovieItem[];
    totalResults: string;
}

export interface FetchMovieResult extends GenericMovieItem, GenericServerResponse {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: {
        Source: string
        Value: string
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
}
