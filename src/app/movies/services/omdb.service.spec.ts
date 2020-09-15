import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { MoviesAPIService } from './omdb.service';

const searchMockResponse = {
    Search: [
        {Title: 'Funny People', Year: '2009', imdbID: 'tt1201167', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},
        {Title: 'The People vs. Larry Flynt', Year: '1996', imdbID: 'tt0117318', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTY3NjA3OTY2Nl5BMl5BanBnXkFtZTgwMjAyNjQxMTE@._V1_SX300.jpg'},
        {Title: 'How to Lose Friends & Alienate People', Year: '2008', imdbID: 'tt0455538', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjY0MzFmMDgtY2ZiOC00M2QyLWFmOWMtOTBmZWY4OWE2YTYzXkEyXkFqcGdeQXVyMjA5MTIzMjQ@._V1_SX300.jpg'},
        {Title: 'Ordinary People', Year: '1980', imdbID: 'tt0081283', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNWU3MDFkYWQtMWQ5YS00YTcwLThmNDItODY4OWE2ZTdhZmIwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'},
        {Title: 'People Like Us', Year: '2012', imdbID: 'tt1716777', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTM3MzUyNzg3NF5BMl5BanBnXkFtZTcwNjk3NDA4Nw@@._V1_SX300.jpg'},
        {Title: 'Sleeping with Other People', Year: '2015', imdbID: 'tt3165612', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTUyMzQwNjEyNV5BMl5BanBnXkFtZTgwMzYwMzgwNjE@._V1_SX300.jpg'},
        {Title: 'The Tomorrow People', Year: '2013–2014', imdbID: 'tt2660734', Type: 'series', Poster: 'https://m.media-amazon.com/images/M/MV5BMjEyMDA4NjY0Nl5BMl5BanBnXkFtZTgwMDgzNDIxMDE@._V1_SX300.jpg'},
        {Title: '24 Hour Party People', Year: '2002', imdbID: 'tt0274309', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BYTcyYzMyZGUtOGExYi00ZTljLWE3NDEtMGQyYTZiNmIzMzRiXkEyXkFqcGdeQXVyNzQ5MzY0NjM@._V1_SX300.jpg'},
        {Title: 'The People Under the Stairs', Year: '1991', imdbID: 'tt0105121', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNGQ4OTI4NmUtZDI1Mi00NTA2LWFlY2YtYWVmNjgzYmFmZjIyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},
        {Title: 'Ruthless People', Year: '1986', imdbID: 'tt0091877', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZjJlYTE3MzYtMGMxMy00OTYyLTg5NzktYmNlOGIzNDEyYjc1XkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg'}
    ],
    totalResults: '2311',
    Response: 'True'
};
const errorMockResponse = {
    Response: 'False',
    Error: 'Incorrect IMDb ID.'
};
const detalsMockResponse = {
    Title: 'Funny People',
    Year: '2009',
    Rated: 'R',
    Released: '31 Jul 2009',
    Runtime: '146 min',
    Genre: 'Comedy, Drama',
    Director: 'Judd Apatow',
    Writer: 'Judd Apatow',
    Actors: 'Adam Sandler, Seth Rogen, Leslie Mann, Eric Bana',
    Plot: 'When seasoned comedian George Simmons learns of his terminal, inoperable health condition, his desire to form a genuine friendship causes him to take a relatively green performer under his wing as his opening act.',
    Language: 'English',
    Country: 'USA',
    Awards: '3 nominations.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    Ratings: [
        {Source: 'Internet Movie Database', Value: '6.3/10'},
        {Source: 'Rotten Tomatoes', Value: '69%'},
        {Source: 'Metacritic', Value: '60/100'}
    ],
    Metascore: '60',
    imdbRating: '6.3',
    imdbVotes: '113,005',
    imdbID: 'tt1201167',
    Type: 'movie',
    DVD: '24 Nov 2009',
    BoxOffice: '$51,814,190',
    Production: 'Universal Pictures',
    Website: 'N/A',
    Response: 'True'
};

describe('OMDB.service', () => {
    let service: MoviesAPIService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MoviesAPIService]
        });
        service = TestBed.inject(MoviesAPIService);
        (service as any).queryParams.apikey = 'mockkey';
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('Handles server error responses', () => {
        service.searchMovies({ title: 'error' }).subscribe(result => {
            fail('Should throw error');
        }, error => {
            expect(error).toEqual(new Error('Incorrect IMDb ID.'));
        });
        const request = httpMock.expectOne({
            method: 'GET',
            url: 'http://www.omdbapi.com/?apikey=mockkey&r=json&v=1&s=error&y=&type=&page=1'
        });
        request.flush(errorMockResponse);
        httpMock.verify();
    });

    it('does not send request if query is empty', () => {
        service.searchMovies({ title: '' }).subscribe(result => {
            expect(result).toEqual({
                total: 0,
                list: []
            });
        }, fail);
        httpMock.expectNone(req => true);
        httpMock.verify();
    });

    it('Retrieves Movie Details', () => {
        service.fetchMovieDetails('mockid').subscribe(result => {
            expect(result).toEqual({
                title: 'Funny People',
                year: '2009',
                runtime: '146 min',
                genre: 'Comedy, Drama',
                plot: 'When seasoned comedian George Simmons learns of his terminal, inoperable health condition, his desire to form a genuine friendship causes him to take a relatively green performer under his wing as his opening act.',
                poster: 'https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
                rating: 6.3,
                id: 'tt1201167',
                type: 'movie'
            });
        }, fail);
        const request = httpMock.expectOne({
            method: 'GET',
            url: 'http://www.omdbapi.com/?apikey=mockkey&r=json&v=1&i=mockid&plot=full'
        });
        request.flush(detalsMockResponse);
        httpMock.verify();
    });

    it('Retrieves list of Movies', () => {
        service.searchMovies({ title: 'people' }, 2).subscribe(result => {
            expect(result.total).toBe(2311);
            expect(result.list.length).toBe(10);
            expect(result.list[0]).toEqual({
                title: 'Funny People',
                year: '2009',
                id: 'tt1201167',
                type: 'movie',
                poster: 'https://m.media-amazon.com/images/M/MV5BNWU0ZDllZWEtNWI4ZC00YjIzLTk3YjMtZmE0MmFiNzg4MmRlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
            });
        }, fail);
        const request = httpMock.expectOne({
            method: 'GET',
            url: 'http://www.omdbapi.com/?apikey=mockkey&r=json&v=1&s=people&y=&type=&page=2'
        });
        request.flush(searchMockResponse);
        httpMock.verify();
    });
});
