import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Movie, MovieSearchQuery } from '../model';

export interface MovieListState extends EntityState<Movie> {
    loading: boolean;
    total: number;
    searchQuery: MovieSearchQuery;
    errorMessage?: string;
}

export const movieListAdapter: EntityAdapter<Movie> = createEntityAdapter<Movie>({
  selectId: (movie: Movie) => movie.id,
  sortComparer: false
});

export const movieListInitialState = (): MovieListState => movieListAdapter.getInitialState({
  loading: false,
  total: 0,
  searchQuery: {
    title: ''
  },
  errorMessage: undefined
});
