import { createAction, props } from '@ngrx/store';

export const getMovieTrailerSuccess = createAction(
    '[Movies] Get Movies Trailer Success',
    props<{ id: string, url: string }>()
);

export const getMovieTrailerFailure = createAction(
    '[Movies] Get Movies Trailer Failure',
    props<{ id: string, errorMessage: string }>()
);
