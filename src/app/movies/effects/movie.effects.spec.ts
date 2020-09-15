import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import {
    getMovieList,
    getMovieListSuccess,
    getMovieListFailure,
    getMovieDetail,
    getMovieDetailSuccess,
    getMovieDetailFailure
} from '../actions';
import { MovieEffects } from './movie.effects';
import { Movie, MovieDetail, MovieSearchQuery } from '../model';
import { MoviesAPIService } from '../services';

describe('movie.effects', () => {
    let actions$: Observable<Action>;
    let effects: MovieEffects;
    let service: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MovieEffects,
                provideMockStore(),
                provideMockActions(() => actions$),
                {
                    provide: MoviesAPIService,
                    useValue: jasmine.createSpyObj('MoviesAPIService', ['searchMovies', 'fetchMovieDetails'])
                }
            ]
        });
        effects = TestBed.inject(MovieEffects);
        service = TestBed.inject(MoviesAPIService);
    });

    describe('get list', () => {
        it('should return getListSuccess' , () => {
            const searchQuery = { title: 'test' };
            const movieList = [{ title: 'test movie title' }];
            service.searchMovies.and.returnValue(of({
                total: 10,
                list: movieList
            }));
            actions$ = of(getMovieList({ searchQuery, page: 1 }));
            effects.GetMovieList$.subscribe((action: any) => {
                expect(action.type).toBe(getMovieListSuccess.type);
                expect(action.searchQuery).toBe(searchQuery);
                expect(action.total).toBe(10);
                expect(action.movies).toBe(movieList);
            }, fail);
        });
        it('should return getListFailure', () => {
            service.searchMovies.and.returnValue(throwError(new Error('Test Error')));
            const searchQuery = { title: 'test' };
            actions$ = of(getMovieList({ searchQuery, page: 1 }));
            effects.GetMovieList$.subscribe((action: any) => {
                expect(action.type).toBe(getMovieListFailure.type);
                expect(action.searchQuery).toBe(searchQuery);
                expect(action.errorMessage).toBe('Test Error');
            }, fail);
        });
    });

    describe('get details', () => {
        it('should return getDetailSuccess', () => {
            const movie = {
                title: 'test movie',
                id: 'test'
            };
            service.fetchMovieDetails.and.returnValue(of(movie));
            actions$ = of(getMovieDetail({ id: 'test' }));
            effects.GetMovieDetail$.subscribe((action: any) => {
                expect(action.type).toBe(getMovieDetailSuccess.type);
                expect(action.movie).toBe(movie);
            }, fail);
        });
        it('should return getDetailFailure', () => {
            service.fetchMovieDetails.and.returnValue(throwError(new Error('Test Error')));
            actions$ = of(getMovieDetail({ id: 'test' }));
            effects.GetMovieDetail$.subscribe((action: any) => {
                expect(action.type).toBe(getMovieDetailFailure.type);
                expect(action.id).toBe('test');
                expect(action.errorMessage).toBe('Test Error');
            }, fail);
        });
    });
});
