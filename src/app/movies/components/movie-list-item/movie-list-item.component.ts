import { Component, Input } from '@angular/core';
import { trigger, animate, transition, style, state, query } from '@angular/animations';

import { Movie } from '../../model';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MovieListItemComponent {
    @Input() movie: Movie;
}
