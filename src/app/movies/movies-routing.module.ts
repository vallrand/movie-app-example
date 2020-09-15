import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieSearchPageComponent, MovieDetailPageComponent } from './containers';

export const routes: Routes = [
  { path: ':id', component: MovieDetailPageComponent, data: { animationState: 'movie-detail' } },
  { path: '', component: MovieSearchPageComponent, data: { reuse: true, animationState: 'movie-search' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
