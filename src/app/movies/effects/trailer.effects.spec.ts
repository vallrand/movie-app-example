import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import {
    getMovieDetailSuccess,
    getMovieTrailerSuccess,
    getMovieTrailerFailure
} from '../actions';
import { TrailerEffects } from './trailer.effects';
import { YoutubeAPIService } from '../services';

describe('movie.effects', () => {
    let actions$: Observable<Action>;
    let effects: TrailerEffects;
    let service: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TrailerEffects,
                provideMockStore(),
                provideMockActions(() => actions$),
                {
                    provide: YoutubeAPIService,
                    useValue: jasmine.createSpyObj('MoviesAPIService', ['searchMovieTrailer'])
                }
            ]
        });
        effects = TestBed.inject(TrailerEffects);
        service = TestBed.inject(YoutubeAPIService);
    });

    describe('get trailer', () => {
        it('should return getTrailerSuccess' , () => {
            service.searchMovieTrailer.and.returnValue(of('test url'));
            actions$ = of(getMovieDetailSuccess({ movie: { id: 'test', title: 'TestTitle', year: '2020' } } as any));
            effects.GetMovieTrailer$.subscribe((action: any) => {
                expect(action.type).toBe(getMovieTrailerSuccess.type);
                expect(action.id).toBe('test');
                expect(action.url).toBe('test url');

                expect(service.searchMovieTrailer).toHaveBeenCalledWith('TestTitle', '2020');
            }, fail);
        });
        it('should return getTrailerFailure', () => {
            service.searchMovieTrailer.and.returnValue(throwError(new Error('Test Error')));
            actions$ = of(getMovieDetailSuccess({ movie: { id: 'test', title: 'TestTitle', year: '2020' } } as any));
            effects.GetMovieTrailer$.subscribe((action: any) => {
                expect(action.type).toBe(getMovieTrailerFailure.type);
                expect(action.id).toBe('test');
                expect(action.errorMessage).toBe('Test Error');

                expect(service.searchMovieTrailer).toHaveBeenCalledWith('TestTitle', '2020');
            }, fail);
        });
    });
});
