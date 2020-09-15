import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';

import { MovieDetailPageComponent } from './movie-detail-page.component';
import { MovieDetailComponent, MovieTrailerComponent } from '../../components';
import { getMovieDetail } from '../../actions';
import { SharedModule } from '../../../common/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Movie Detail Page', () => {
    let fixture: ComponentFixture<MovieDetailPageComponent>;
    let store: MockStore;
    let route: ActivatedRoute;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, NoopAnimationsModule],
            providers: [
                provideMockStore(),
                { provide: ActivatedRoute, useValue: { params: new BehaviorSubject({}) } }
            ],
            declarations: [
                MovieDetailPageComponent,
                MovieDetailComponent,
                MovieTrailerComponent
            ]
        });
        fixture = TestBed.createComponent(MovieDetailPageComponent);
        store = TestBed.inject(MockStore);
        route = TestBed.inject(ActivatedRoute);
        spyOn(store, 'dispatch');

        store.setState({ movies: { detail: {}, trailer: {} } });
    });

    it('should compile', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should dispatch getMovieDetail action on init', () => {
        fixture.detectChanges();
        (route.params as BehaviorSubject<any>).next({ id: 'test' });
        expect(store.dispatch)
        .toHaveBeenCalledWith(jasmine.objectContaining(
            getMovieDetail({ id: 'test' })
        ));
    });
});
