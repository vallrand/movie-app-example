import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../common/shared.module';
import { MovieEffects, TrailerEffects } from './effects';
import { featureKey, reducers } from './reducers';
import { MoviesRoutingModule } from './movies-routing.module';
import {
  MovieListComponent,
  MovieListItemComponent,
  MovieDetailComponent,
  MovieSearchComponent,
  MovieTrailerComponent
} from './components';
import { MovieSearchPageComponent, MovieDetailPageComponent } from './containers';

@NgModule({
  declarations: [
    MovieSearchPageComponent,
    MovieDetailPageComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    MovieTrailerComponent
  ],
  imports: [
    SharedModule,
    MoviesRoutingModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature([MovieEffects, TrailerEffects])
  ]
})
export class MoviesModule {}
