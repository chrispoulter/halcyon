'use client';

import router from 'next/router';
import { SessionProvider, signOut } from 'next-auth/react';
import {
    isServer,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FetchError } from '@/lib/fetch';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                retry: false
            }
        },
        queryCache: new QueryCache({
            onError: (error: Error) => {
                if (error instanceof FetchError) {
                    switch (error.status) {
                        case 401:
                            return signOut({
                                callbackUrl: '/account/login'
                            });

                        case 403:
                            return router.push('/403', router.asPath);

                        case 404:
                            return router.push('/404', router.asPath);

                        default:
                            return router.push('/500', router.asPath);
                    }
                }

                return router.push('/500', router.asPath);
            }
        }),
        mutationCache: new MutationCache({
            onError: (error: Error) => {
                if (error instanceof FetchError) {
                    const message = error?.response?.title;

                    switch (error.status) {
                        case 401:
                            return signOut({
                                callbackUrl: '/account/login'
                            });

                        case 403:
                            return toast.error(
                                'Sorry, you do not have access to this resource.'
                            );

                        case 404:
                            return toast.error(
                                'Sorry, the resource you were looking for could not be found.'
                            );

                        default:
                            return toast.error(
                                message ||
                                    'Sorry, something went wrong. Please try again later.'
                            );
                    }
                }

                return toast.error(
                    error.message ||
                        'Sorry, something went wrong. Please try again later.'
                );
            }
        })
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }

        return browserQueryClient;
    }
}

export default function Providers({ children }: React.PropsWithChildren) {
    const queryClient = getQueryClient();

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}
