import { Component, Input, ChangeDetectionStrategy  } from '@angular/core';
import { trigger, animate, transition, style, state, query } from '@angular/animations';
import { MovieDetail } from '../../model';

@Component({
  selector: 'app-movie-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
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
export class MovieDetailComponent {
  @Input() movie: MovieDetail;
  @Input() loading: boolean;
  @Input() errorMessage: string;
}
