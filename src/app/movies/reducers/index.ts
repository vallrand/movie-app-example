import {
    createFeatureSelector,
    createSelector,
    combineReducers,
    Action,
} from '@ngrx/store';

import { movieDetailReducer } from './movie-detail.reducer';
import { movieListReducer } from './movie-list.reducer';
import { MovieListState, movieListAdapter } from './movie-list.state';
import { MovieDetailState } from './movie-detail.state';
import { movieTrailerReducer } from './movie-trailer.reducer';
import { MovieTrailerState } from './movie-trailer.state';

export const featureKey = 'movies';

export interface MoviesState {
    list: MovieListState;
    detail: MovieDetailState;
    trailer: MovieTrailerState;
}

export const reducers = combineReducers({
    list: movieListReducer,
    detail: movieDetailReducer,
    trailer: movieTrailerReducer
});

export const selectMoviesState = createFeatureSelector<any, MoviesState>(featureKey);
export const movieListSelectors = movieListAdapter.getSelectors(createSelector(
    selectMoviesState,
    (state: MoviesState) => state.list
));
