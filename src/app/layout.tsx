import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import { AuthProvider } from '@/components/auth-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/toast';

import './globals.css';

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans'
});

export const metadata: Metadata = {
    title: {
        template: '%s // Halcyon',
        default: 'Halcyon'
    },
    description: 'A web application template.',
    keywords: ['react', 'nextjs'],
    formatDetection: { telephone: false },
    applicationName: 'Halcyon'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#111827'
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en" className={openSans.variable}>
            <body>
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
