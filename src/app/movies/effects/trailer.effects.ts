import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
    getMovieDetailSuccess,
    getMovieTrailerSuccess,
    getMovieTrailerFailure
} from '../actions';
import { YoutubeAPIService } from '../services';
import { Movie, MovieDetail, MovieSearchQuery } from '../model';

@Injectable()
export class TrailerEffects {
  constructor(
    private videoService: YoutubeAPIService,
    private actions$: Actions
  ){}

  GetMovieTrailer$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(getMovieDetailSuccess),
      mergeMap(action => this.videoService.searchMovieTrailer(action.movie.title, action.movie.year).pipe(
          map(url => getMovieTrailerSuccess({ id: action.movie.id, url })),
          catchError((error: Error) => of(getMovieTrailerFailure({ id: action.movie.id, errorMessage: error.message })))
      ))
  ));
}
