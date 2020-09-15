import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';

import { RouteReuseStrategyProvider } from './common//route-reuse.provider';

import { PageNotFoundComponent } from './common/components';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then(module => module.MoviesModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: !true, scrollPositionRestoration: 'enabled' })],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: RouteReuseStrategyProvider
}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
