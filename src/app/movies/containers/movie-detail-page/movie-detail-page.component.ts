import { Component, OnInit, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { select, createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MoviesState, selectMoviesState } from '../../reducers';
import { MovieDetailState } from '../../reducers/movie-detail.state';
import { MovieTrailerState } from '../../reducers/movie-trailer.state';
import { getMovieDetail } from '../../actions';

@Component({
    selector: 'app-movie-detail-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './movie-detail-page.component.html',
    styleUrls: ['./movie-detail-page.component.scss']
})
export class MovieDetailPageComponent implements OnInit, OnDestroy {
    private paramsSubscription: Subscription;
    constructor(
        private readonly store: Store,
        private readonly route: ActivatedRoute,
        private readonly location: Location
    ){}

    detail$: Observable<MovieDetailState> = this.store.pipe(select(createSelector(
        selectMoviesState,
        (state: MoviesState) => state.detail
    )));
    trailer$: Observable<MovieTrailerState> = this.store.pipe(select(createSelector(
        selectMoviesState,
        (state: MoviesState) => state.trailer
    )));

    back(): void {
        this.location.back();
    }
    ngOnInit(): void {
        this.paramsSubscription = this.route.params.pipe(
            map(params => getMovieDetail({ id: params.id }))
        ).subscribe(action => this.store.dispatch(action));
    }
    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }
}
