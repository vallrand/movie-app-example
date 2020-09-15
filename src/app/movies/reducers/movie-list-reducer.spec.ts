import { Action, createReducer, on } from '@ngrx/store';
import {
    getMovieList,
    getMovieListSuccess,
    getMovieListFailure
} from '../actions';
import { Movie, MovieSearchQuery } from '../model';
import { MovieListState, movieListInitialState } from './movie-list.state';
import { movieListReducer } from './movie-list.reducer';

describe('movie-List.reducer', () => {
    it('returns default state on undefined action', () => {
      expect(movieListReducer(undefined, {} as any)).toEqual(movieListInitialState());
    });

    it('sets loading to true when loading starts', () => {
        const searchQuery = { title: 'test title' };
        expect(movieListReducer(movieListInitialState(),
      getMovieList({ searchQuery, page: 1 })))
      .toEqual(jasmine.objectContaining({
        searchQuery,
        loading: true,
        errorMessage: undefined,
        ids: [],
        entities: {}
      }));
    });

    it('sets error message on error', () => {
        const searchQuery = { title: 'test title' };
        expect(movieListReducer(({ ...movieListInitialState(), loading: true, searchQuery }),
      getMovieListFailure({ searchQuery, errorMessage: 'test' })))
      .toEqual(jasmine.objectContaining({
        loading: false,
        errorMessage: 'test'
      }));
    });

    it('adds movies when movies are loaded', () => {
        const searchQuery = { title: 'test title' };
        expect(movieListReducer(({ ...movieListInitialState(), loading: true, searchQuery }),
      getMovieListSuccess({ searchQuery, total: 100, movies: [{ id: '1', title: 't1' }, { id: '2', title: 't2' }] as any })))
      .toEqual(jasmine.objectContaining({
        ids: ['1', '2'],
        entities: {
            1: {
                id: '1',
                title: 't1'
            },
            2: {
                id: '2',
                title: 't2'
            }
        },
        total: 100,
        loading: false,
        errorMessage: undefined,
        searchQuery
      }));
    });

    it('skips if response has different query', () => {
      const state = { ...movieListInitialState(), loading: true, searchQuery: { title: 'test' } };
      expect(movieListReducer(state,
      getMovieListFailure({ searchQuery: { title: 'other title' }, errorMessage: 'test' })))
      .toBe(state);

      expect(movieListReducer(state,
      getMovieListSuccess({ searchQuery: { title: 'other title' }, total: 10, movies: [{ id: '1', title: 't1' }] as any })))
      .toBe(state);
    });
});
