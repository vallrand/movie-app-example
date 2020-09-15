import { Component, OnInit, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { select, createSelector, Store } from '@ngrx/store';

import { MoviesState, selectMoviesState, movieListSelectors } from '../../reducers';
import { getMovieList } from '../../actions';
import { Movie, MovieSearchQuery } from '../../model';


@Component({
    selector: 'app-movie-search-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './movie-search-page.component.html',
    styleUrls: ['./movie-search-page.component.scss']
})
export class MovieSearchPageComponent implements OnInit, OnDestroy {
    private paramsSubscription: Subscription;
    constructor(
        private readonly store: Store,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ){}

    loading$: Observable<boolean> = this.store.pipe(select(createSelector(
        selectMoviesState,
        (state: MoviesState) => state.list.loading
    )));
    errorMessage$: Observable<string> = this.store.pipe(select(createSelector(
        selectMoviesState,
        (state: MoviesState) => state.list.errorMessage
    )));
    movies$: Observable<Movie[]> = this.store.pipe(select(movieListSelectors.selectAll));
    total$: Observable<number> = this.store.pipe(select(createSelector(
        selectMoviesState,
        (state: MoviesState) => state.list.total
    )));
    search$: Observable<MovieSearchQuery> = this.store.pipe(select(createSelector(
        selectMoviesState,
        (state: MoviesState) => state.list.searchQuery
    )));
    pageSize = 10;

    ngOnInit(): void {
        this.paramsSubscription = this.route.queryParams
        .pipe(
            map(params => getMovieList({ searchQuery: params as MovieSearchQuery, page: 1 }))
        ).subscribe(action => this.store.dispatch(action));
    }
    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    searchMovies(query: MovieSearchQuery): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: query,
            queryParamsHandling: 'merge'
        });
    }

    loadPage(page: number): void {
        console.log(`load page ${page}`);
        this.search$.pipe(
            take(1),
            map(searchQuery => getMovieList({ searchQuery, page }))
        ).subscribe(action => this.store.dispatch(action));
    }
}
