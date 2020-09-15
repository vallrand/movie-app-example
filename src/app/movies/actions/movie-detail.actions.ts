import { createAction, props } from '@ngrx/store';
import { MovieDetail } from './../model';

export const getMovieDetail = createAction(
    '[Movies] Get Movie Detail',
    props<{ id: string }>()
);

export const getMovieDetailSuccess = createAction(
    '[Movies] Get Movies Detail Success',
    props<{ movie: MovieDetail }>()
);

export const getMovieDetailFailure = createAction(
    '[Movies] Get Movies Detail Failure',
    props<{ id: string, errorMessage: string }>()
);
