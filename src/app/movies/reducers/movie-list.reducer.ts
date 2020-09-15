import { Action, createReducer, on } from '@ngrx/store';
import {
    getMovieList,
    getMovieListSuccess,
    getMovieListFailure
} from '../actions';
import { Movie, MovieSearchQuery } from '../model';
import { MovieListState, movieListAdapter, movieListInitialState } from './movie-list.state';

const compareQuery = (a: MovieSearchQuery, b: MovieSearchQuery) => (
    a.title === b.title &&
    a.year === b.year &&
    a.type === b.type
);

export const movieListReducer = createReducer(
    movieListInitialState(),
    on(
        getMovieList,
        (state, { searchQuery }): MovieListState => compareQuery(searchQuery, state.searchQuery)
        ? {
            ...state,
            loading: true,
            errorMessage: undefined,
        } : {
            ...movieListAdapter.removeAll(state),
            total: 0,
            loading: true,
            errorMessage: undefined,
            searchQuery,
        }
    ),
    on(
        getMovieListSuccess,
        (state, { searchQuery, movies, total }): MovieListState => compareQuery(searchQuery, state.searchQuery) ? ({
            ...movieListAdapter.addMany(movies, state),
            total,
            loading: false,
            errorMessage: undefined
        }) : state
    ),
    on(
        getMovieListFailure,
        (state, { searchQuery, errorMessage }): MovieListState => compareQuery(searchQuery, state.searchQuery) ? ({
            ...state,
            loading: false,
            errorMessage
        }) : state
    )
);
