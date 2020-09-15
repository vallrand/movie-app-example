import { Action, createReducer, on } from '@ngrx/store';
import {
    getMovieDetail,
    getMovieDetailSuccess,
    getMovieDetailFailure
} from '../actions';
import { MovieDetail } from '../model';
import { MovieDetailState, movieDetailInitialState } from './movie-detail.state';

export const movieDetailReducer = createReducer(
    movieDetailInitialState(),
    on(
        getMovieDetail,
        (state, { id }): MovieDetailState => ({
            id,
            loading: true,
            errorMessage: undefined,
            movie: undefined
        })
    ),
    on(
        getMovieDetailSuccess,
        (state, { movie }): MovieDetailState => movie.id === state.id ? ({
            movie,
            id: movie.id,
            loading: false,
            errorMessage: undefined
        }) : state
    ),
    on(
        getMovieDetailFailure,
        (state, { id, errorMessage }): MovieDetailState => state.id === id ? ({
            ...state,
            loading: false,
            errorMessage
        }) : state
    )
);
