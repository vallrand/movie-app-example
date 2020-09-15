import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter  } from '@angular/core';
import { Movie } from '../../model';

@Component({
  selector: 'app-movie-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  @Input() movies: Movie[];
  @Input() pageSize: number;
  @Input() total: number;
  @Input() loading: boolean;
  @Output() nextPage = new EventEmitter<number>();

  get currentPage(): number {
    return Math.floor(this.movies.length / this.pageSize);
  }
  getItemId(index: number, item: Movie): string {
    return item.id;
  }
  onScroll(): void {
    const { currentPage, total, movies, loading } = this;
    if (total - movies.length <= 0 || loading) { return; }
    this.nextPage.emit(currentPage + 1);
  }
}
