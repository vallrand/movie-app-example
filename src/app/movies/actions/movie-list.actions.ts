import { createAction, props } from '@ngrx/store';
import { Movie, MovieSearchQuery } from '../model';

export const getMovieList = createAction(
    '[Movies] Get Movie List',
    props<{ searchQuery: MovieSearchQuery, page: number }>()
);

export const getMovieListSuccess = createAction(
    '[Movies] Get Movies Details Success',
    props<{ searchQuery: MovieSearchQuery, movies: Movie[], total: number }>()
);

export const getMovieListFailure = createAction(
    '[Movies] Get Movies Details Failure',
    props<{ searchQuery: MovieSearchQuery, errorMessage: string }>()
);
