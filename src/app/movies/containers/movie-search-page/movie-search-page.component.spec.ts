import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';

import { MovieSearchPageComponent } from './movie-search-page.component';
import { MovieSearchComponent, MovieListComponent, MovieListItemComponent } from '../../components';
import { getMovieList } from '../../actions';
import { SharedModule } from '../../../common/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Movie Search Page', () => {
    let fixture: ComponentFixture<MovieSearchPageComponent>;
    let store: MockStore;
    let route: ActivatedRoute;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
            providers: [
                provideMockStore(),
                { provide: ActivatedRoute, useValue: { queryParams: new BehaviorSubject({}) } }
            ],
            declarations: [
                MovieSearchPageComponent,
                MovieSearchComponent,
                MovieListComponent,
                MovieListItemComponent
            ]
        });
        fixture = TestBed.createComponent(MovieSearchPageComponent);
        store = TestBed.inject(MockStore);
        route = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        spyOn(store, 'dispatch');
        spyOn(router, 'navigate');
        store.setState({ movies: { list: { searchQuery: { title: '' }, ids: [], entities: {} } } });
    });

    it('should compile', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should dispatch getMovieList action on query params change', () => {
        fixture.detectChanges();
        (route.queryParams as BehaviorSubject<any>).next({ title: 'title' });
        expect(store.dispatch)
        .toHaveBeenCalledWith(jasmine.objectContaining(
            getMovieList({ searchQuery: { title: 'title' }, page: 1 })
        ));
    });

    it('should dispatch getMovieList action when loading more', () => {
        store.setState({
            movies: {
                list: {
                    searchQuery: {
                        title: 'another title'
                    },
                    ids: []
                }
            }
        });
        fixture.detectChanges();
        fixture.componentInstance.loadPage(2);
        expect(store.dispatch)
        .toHaveBeenCalledWith(jasmine.objectContaining(
            getMovieList({ searchQuery: { title: 'another title' }, page: 2 })
        ));
    });

    it('should update url query when searching', () => {
        fixture.detectChanges();
        fixture.componentInstance.searchMovies({ title: 'search title' });
        expect(router.navigate).toHaveBeenCalledWith([], jasmine.objectContaining({
            queryParams: { title: 'search title' },
            queryParamsHandling: 'merge'
        }));
    });
});
