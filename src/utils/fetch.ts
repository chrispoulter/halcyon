import { HandlerResponse } from '@/utils/handler';

class FetchError extends Error {
    status: number;
    response: HandlerResponse;

    constructor(status: number, response: HandlerResponse) {
        super('An error has occurred whilst communicating with the server.');
        this.name = 'FetchError';
        this.status = status;
        this.response = response;
    }
}

export const fetcher = async <T = unknown>(
    url: string,
    method: string,
    body?: T
) => {
    const result = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body && JSON.stringify(body)
    });

    let response: any;

    try {
        response = await result.json();
    } catch (_) {}

    if (!result.ok) {
        throw new FetchError(result.status, response);
    }

    return response;
};