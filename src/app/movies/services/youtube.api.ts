export interface SearchResponse {
    kind: string;
    etag: any;
    nextPageToken: string;
    prevPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    };
    items: {
        kind: string
        etag: any
        id: {
            kind: string
            videoId: string
        }
        snippet: {
            publishedAt: string
            channelId: string
            title: string
            description: string
            thumbnails: {
                default: { url: string, width: number, height: number }
                medium: { url: string, width: number, height: number }
                high: { url: string, width: number, height: number }
            },
            channelTitle: string
            liveBroadcastContent: string
            publishTime: string
        }
    }[];
}

export interface ErrorResponse {
    error: {
        code: number
        message: string
        errors: {
            message: string
            domain: string
            reason: string
            extendedHelp: string
        }[]
        status: string
    };
}
