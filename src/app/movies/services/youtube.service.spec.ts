import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { YoutubeAPIService } from './youtube.service';

const mockResponse = {
  kind: 'youtube#searchListResponse',
  etag: 'fVD1fUfZBjD0my7fUNvrnK3FBpA',
  nextPageToken: 'CAEQAA',
  regionCode: 'EE',
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 1
  },
  items: [
    {
      kind: 'youtube#searchResult',
      etag: '0-Zf5gpovrZyMS8dv0pGuG-8xDU',
      id: {
        kind: 'youtube#video',
        videoId: 'LDBojdBAjXU'
      },
      snippet: {
        publishedAt: '2019-06-11T02:06:26Z',
        channelId: 'UCvC4D8onUfXzvjTOM-dBfEA',
        title: 'Marvel’s Avengers: A-Day | Official Trailer E3 2019',
        description: 'Play the Beta first on PS4. Pre-Order for Beta Access at playavengers.games/E3Trailer-YT ▻ Subscribe to Marvel: http://bit.ly/WeO3YJ Marvel\'s Avengers begins ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/LDBojdBAjXU/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/LDBojdBAjXU/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/LDBojdBAjXU/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'Marvel Entertainment',
        liveBroadcastContent: 'none',
        publishTime: '2019-06-11T02:06:26Z'
      }
    }
  ]
};

const mockErrorResponse = {
  error: {
    code: 403,
    message: 'YouTube Data API v3 has not been used in project 564604436654 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=564604436654 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.',
    errors: [
      {
        message: 'YouTube Data API v3 has not been used in project 564604436654 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=564604436654 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.',
        domain: 'usageLimits',
        reason: 'accessNotConfigured',
        extendedHelp: 'https://console.developers.google.com'
      }
    ],
    status: 'PERMISSION_DENIED'
  }
};

describe('youtube.service', () => {
  let service: YoutubeAPIService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [YoutubeAPIService]
      });
      service = TestBed.inject(YoutubeAPIService);
      (service as any).key = 'mockkey';
      httpMock = TestBed.inject(HttpTestingController);
  });

  it('Handles server error responses', () => {
      service.searchMovieTrailer('Marvels Avengers', '2020').subscribe(result => {
          fail('Should throw error');
      }, error => {
          expect(error).toEqual(new Error(mockErrorResponse.error.message));
      });
      const request = httpMock.expectOne({
        method: 'GET',
        url: encodeURI('https://www.googleapis.com/youtube/v3/search?part=snippet&q=Marvels Avengers 2020 movie trailer&type=video&maxResults=1&order=relevance&videoDuration=short&videoEmbeddable=true&key=mockkey')
      });
      request.flush(mockErrorResponse);
      httpMock.verify();
  });

  it('Retrieves Movie Traier url', () => {
      service.searchMovieTrailer('Marvels Avengers', '2020').subscribe(result => {
          expect(result).toBe('https://www.youtube.com/embed/LDBojdBAjXU');
      }, fail);
      const request = httpMock.expectOne({
        method: 'GET',
        url: encodeURI('https://www.googleapis.com/youtube/v3/search?part=snippet&q=Marvels Avengers 2020 movie trailer&type=video&maxResults=1&order=relevance&videoDuration=short&videoEmbeddable=true&key=mockkey')
      });
      request.flush(mockResponse);
      httpMock.verify();
  });
});
