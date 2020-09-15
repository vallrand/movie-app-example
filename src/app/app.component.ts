import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { trigger, animate, transition, style, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('transition', [
      transition('* => *', [
        query(':leave', [
          style({ display: 'none' })
        ], { optional: true }),
        query(':enter', [
          style({ left: '100vw' }),
          animate('0.4s ease-out', style({ left: '0vw' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'movie-app-example';

  prepareRoute(outlet: RouterOutlet): string {
    return outlet && outlet.isActivated && outlet.activatedRouteData && outlet.activatedRouteData.animationState;
  }
}
