import { Action, createReducer, on } from '@ngrx/store';
import {
    getMovieDetail,
    getMovieTrailerSuccess,
    getMovieTrailerFailure
} from '../actions';
import { MovieTrailerState, movieTrailerInitialState } from './movie-trailer.state';

export const movieTrailerReducer = createReducer(
    movieTrailerInitialState(),
    on(
        getMovieDetail,
        (state, { id }): MovieTrailerState => ({
            url: null,
            id,
            loading: true,
            errorMessage: undefined
        })
    ),
    on(
        getMovieTrailerSuccess,
        (state, { id, url }): MovieTrailerState => state.id === id ? ({
            url,
            id,
            loading: false,
            errorMessage: undefined
        }) : state
    ),
    on(
        getMovieTrailerFailure,
        (state, { id, errorMessage }): MovieTrailerState => state.id === id ? ({
            ...state,
            loading: false,
            errorMessage
        }) : state
    )
);
