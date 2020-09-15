import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, of  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SearchResponse, ErrorResponse } from './youtube.api';

@Injectable({
    providedIn: 'root',
})
export class YoutubeAPIService {
    private readonly path = environment.googleAPIPath;
    private readonly key = environment.googleAPIKey;

    constructor(private httpClient: HttpClient) {}

    searchMovieTrailer = (title: string, year: string): Observable<string> =>
    this.httpClient.get<SearchResponse | ErrorResponse>(`${this.path}v3/search`, {
        responseType: 'json',
        params: {
            part: 'snippet',
            q: `${title} ${year} movie trailer`,
            type: 'video',
            maxResults: '1',
            order: 'relevance',
            videoDuration: 'short',
            videoEmbeddable: 'true',
            key: this.key
        }
    }).pipe(
        catchError(error => throwError(error)),
        map(response => {
            const errorResponse = response as ErrorResponse;
            if (errorResponse.error){
                throw new Error(errorResponse.error.message);
            }
            return response as SearchResponse;
        }),
        map(response => {
            if (response.items.length === 0) {
                throw new Error('Failed to find a trailer.');
            }
            const videoId = response.items[0].id.videoId;
            return `https://www.youtube.com/embed/${videoId}`;
        })
    )
}

