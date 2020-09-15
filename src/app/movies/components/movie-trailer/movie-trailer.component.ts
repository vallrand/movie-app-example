import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, animate, transition, style, state, query } from '@angular/animations';

@Component({
  selector: 'app-movie-trailer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ transform: 'scale(0, 0)' }),
        animate('0.5s', style({ transform: 'scale(1, 1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MovieTrailerComponent {
    @Input() url: string;
    @Input() errorMessage: string;
    @Input() loading: boolean;
}
