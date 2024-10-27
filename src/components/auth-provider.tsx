'use client';

import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({ children }: React.PropsWithChildren) => (
    <SessionProvider>{children}</SessionProvider>
);
