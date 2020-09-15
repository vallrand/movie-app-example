export interface Movie {
    id: string;
    title: string;
    year: string;
    type: string;
    poster: string;
}

export interface MovieDetail extends Movie {
    plot: string;
    rating: number;
    runtime: string;
    genre: string;
}

export interface MovieSearchQuery {
    title: string;
    year?: number;
    type?: string;
}
