import { Component, Output, Input, EventEmitter } from '@angular/core';

import { MovieSearchQuery } from '../../model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
    @Input() set query(value: MovieSearchQuery){
      this.title = value.title;
    }
    get query(): MovieSearchQuery {
      return {
        title: this.title
      };
    }
    @Output() search = new EventEmitter<MovieSearchQuery>();

    title: string;

    submit(): void {
        this.search.emit(this.query);
    }
}
