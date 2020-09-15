import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, of  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { FetchMovieResult, SearchMovieResult, GenericMovieItem, GenericServerResponse, ServerResponseType } from './omdb.api';
import { Movie, MovieDetail, MovieSearchQuery } from '../model';

@Injectable({
    providedIn: 'root',
})
export class MoviesAPIService {
    constructor(private httpClient: HttpClient) {}
    private readonly path: string = environment.omdbAPIPath;
    private readonly queryParams = {
        apikey: environment.omdbAPIKey,
        r: 'json',
        v: '1'
    };

    private validateResponse = map((response: GenericServerResponse) => {
        if (response.Response !== ServerResponseType.TRUE) {
            throw new Error(response.Error);
        }
        return response;
    });

    public fetchMovieDetails = (id: string): Observable<MovieDetail> =>
    this.httpClient.get<FetchMovieResult>(this.path, {
        responseType: 'json',
        params: {
            ...this.queryParams,
            i: id,
            plot: 'full'
        }
    }).pipe(
        catchError(error => throwError(error.error)),
        this.validateResponse,
        map((response: FetchMovieResult): MovieDetail => ({
            id: response.imdbID,
            title: response.Title,
            year: response.Year,
            type: response.Type,
            poster: response.Poster,
            plot: response.Plot,
            rating: parseFloat(response.imdbRating),
            runtime: response.Runtime,
            genre: response.Genre
        }))
    )

    public searchMovies = (params: MovieSearchQuery, page: number = 1): Observable<{ list: Movie[], total: number }> =>
    params.title ?
    this.httpClient.get<SearchMovieResult>(this.path, {
        responseType: 'json',
        params: {
            ...this.queryParams,
            s: params.title,
            y: params.year && String(params.year) || '',
            type: params.type || '',
            page: String(page)
        }
    })
    .pipe(
        catchError(error => throwError(error.error)),
        this.validateResponse,
        map((response: SearchMovieResult) => ({
            list: response.Search.map((item: GenericMovieItem) => ({
                id: item.imdbID,
                title: item.Title,
                year: item.Year,
                type: item.Type,
                poster: item.Poster,
            } as Movie)),
            total: parseInt(response.totalResults, 10)
        }))
    ) : of({ list: [], total: 0 })
}
