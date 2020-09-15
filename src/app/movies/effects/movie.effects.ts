import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
    getMovieList,
    getMovieListSuccess,
    getMovieListFailure,
    getMovieDetail,
    getMovieDetailSuccess,
    getMovieDetailFailure
} from '../actions';
import { MoviesAPIService } from '../services';
import { Movie, MovieDetail, MovieSearchQuery } from '../model';

@Injectable()
export class MovieEffects {
  constructor(
    private moviesService: MoviesAPIService,
    private actions$: Actions
  ){}

  GetMovieList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(getMovieList),
    mergeMap(action => this.moviesService.searchMovies(action.searchQuery, action.page).pipe(
      map(({ list, total }) => getMovieListSuccess({ searchQuery: action.searchQuery, movies: list, total })),
      catchError((error: Error) => of(getMovieListFailure({ searchQuery: action.searchQuery, errorMessage: error.message })))
    ))
  ));

  GetMovieDetail$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(getMovieDetail),
    mergeMap(action => this.moviesService.fetchMovieDetails(action.id).pipe(
      map((movie: MovieDetail) => getMovieDetailSuccess({ movie })),
      catchError((error: Error) => of(getMovieDetailFailure({ id: action.id, errorMessage: error.message })))
    ))
  ));
}
