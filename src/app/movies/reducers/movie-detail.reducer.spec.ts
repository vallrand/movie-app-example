import { Action, createReducer, on } from '@ngrx/store';
import {
    getMovieDetail,
    getMovieDetailSuccess,
    getMovieDetailFailure
} from '../actions';
import { MovieDetail } from '../model';
import { MovieDetailState, movieDetailInitialState } from './movie-detail.state';
import { movieDetailReducer } from './movie-detail.reducer';

describe('movie-detail.reducer', () => {
    it('returns default state on undefined action', () => {
      expect(movieDetailReducer(undefined, {} as any)).toEqual(movieDetailInitialState());
    });

    it('sets loading to true when loading starts', () => {
      expect(movieDetailReducer(movieDetailInitialState(),
      getMovieDetail({ id: 'test' })))
      .toEqual(jasmine.objectContaining({
        loading: true,
        id: 'test',
        errorMessage: undefined,
        movie: undefined
      }));
    });

    it('sets error message on error', () => {
      expect(movieDetailReducer({ id: 'test', loading: true } as any,
      getMovieDetailFailure({ id: 'test', errorMessage: 'test' })))
      .toEqual(jasmine.objectContaining({
        loading: false,
        errorMessage: 'test',
        id: 'test'
      }));
    });

    it('sets details when movie is loaded', () => {
      const movie = { id: 'test', title: 'Test Title' } as any;
      expect(movieDetailReducer({ id: 'test', loading: true } as any,
      getMovieDetailSuccess({ movie })))
      .toEqual(jasmine.objectContaining({
        movie,
        loading: false,
        errorMessage: undefined,
        id: 'test'
      }));
    });

    it('skips if response has different id', () => {
      const state = { id: 'test', loading: true, errorMessage: undefined, movie: undefined };
      expect(movieDetailReducer(state,
      getMovieDetailFailure({ id: 'otherid', errorMessage: 'test' })))
      .toBe(state);

      expect(movieDetailReducer(state,
      getMovieDetailSuccess({ movie: { id: 'other' } as any })))
      .toBe(state);
    });
});
