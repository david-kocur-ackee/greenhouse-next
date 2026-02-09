import '~styles/globals.css';

import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorBoundary } from '@workspace/errors';

import { AppQueryProvider } from '~modules/api/components';
import { Intl } from '~modules/intl/components';
import Navbar from '~modules/layout/components/Navbar';

export interface ExtendedAppProps extends AppProps {}

function App({ Component, pageProps }: ExtendedAppProps) {
    return (
        <ErrorBoundary>
            <AppQueryProvider dehydratedState={pageProps.dehydratedState}>
                <Intl>
                    <Navbar />
                    <div className='pb-20 md:pb-0 md:pl-24 2xl:pl-32'>
                        <Component {...pageProps} />
                    </div>
                </Intl>
                <ReactQueryDevtools initialIsOpen={false} />
            </AppQueryProvider>
        </ErrorBoundary>
    );
}

export default App;
