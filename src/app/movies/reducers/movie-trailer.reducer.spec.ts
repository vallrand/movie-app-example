import { Action, createReducer, on } from '@ngrx/store';
import {
    getMovieDetail,
    getMovieTrailerSuccess,
    getMovieTrailerFailure
} from '../actions';
import { MovieTrailerState, movieTrailerInitialState } from './movie-trailer.state';
import { movieTrailerReducer } from './movie-trailer.reducer';

describe('movie-trailer.reducer', () => {
    it('returns default state on undefined action', () => {
      expect(movieTrailerReducer(undefined, {} as any)).toEqual(movieTrailerInitialState());
    });

    it('sets loading to true when loading starts', () => {
      expect(movieTrailerReducer(movieTrailerInitialState(),
      getMovieDetail({ id: 'test' })))
      .toEqual(jasmine.objectContaining({
        loading: true,
        id: 'test',
        errorMessage: undefined,
        url: null
      }));
    });

    it('sets error message on error', () => {
      expect(movieTrailerReducer({ id: 'test', loading: true } as any,
      getMovieTrailerFailure({ id: 'test', errorMessage: 'test' })))
      .toEqual(jasmine.objectContaining({
        loading: false,
        errorMessage: 'test',
        id: 'test'
      }));
    });

    it('sets url when trailer is loaded', () => {
      expect(movieTrailerReducer({ id: 'test', loading: true } as any,
      getMovieTrailerSuccess({ id: 'test', url: 'test url' })))
      .toEqual(jasmine.objectContaining({
        url: 'test url',
        loading: false,
        errorMessage: undefined,
        id: 'test'
      }));
    });

    it('skips if response has different id', () => {
      const state = { id: 'test', loading: true, errorMessage: undefined, url: null };
      expect(movieTrailerReducer(state,
      getMovieTrailerFailure({ id: 'otherid', errorMessage: 'test' })))
      .toBe(state);

      expect(movieTrailerReducer(state,
      getMovieTrailerSuccess({ id: 'other id', url: 'test url' })))
      .toBe(state);
    });
});
