export interface MovieTrailerState {
    url: string;
    id: string;
    loading: boolean;
    errorMessage?: string;
}

export const movieTrailerInitialState = (): MovieTrailerState => ({
    url: null,
    id: null,
    loading: false,
    errorMessage: undefined
});
