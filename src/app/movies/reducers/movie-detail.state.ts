import { MovieDetail } from '../model';

export interface MovieDetailState {
    id: string;
    movie: MovieDetail;
    loading: boolean;
    errorMessage?: string;
}

export const movieDetailInitialState = (): MovieDetailState => ({
    id: null,
    movie: null,
    loading: false,
    errorMessage: undefined
});
