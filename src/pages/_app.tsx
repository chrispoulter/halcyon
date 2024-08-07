import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import { Meta } from '@/components/Meta/Meta';
import { Header } from '@/components/Header/Header';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Footer } from '@/components/Footer/Footer';
import { Toaster } from '@/components/Toast/Toast';
import { Messages } from '@/components/Messages/Messages';

import '@/styles/globals.css';

const font = Open_Sans({
    subsets: ['latin'],
    display: 'swap'
});

const App = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <>
            <Meta />

            <style jsx global>{`
                :root {
                    --base-font: ${font.style.fontFamily};
                }
            `}</style>

            <SessionProvider session={props.pageProps.session}>
                <Provider store={store}>
                    <Header />
                    <main>
                        <ErrorBoundary>
                            <Component {...props.pageProps} />
                        </ErrorBoundary>
                    </main>
                    <Footer />
                    <Messages />
                </Provider>
            </SessionProvider>
            <Toaster />
        </>
    );
};

export default App;
