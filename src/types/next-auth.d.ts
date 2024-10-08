import { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import { Role } from '@/lib/roles';

declare module 'next-auth' {
    interface User {
        accessToken: string;
        id: string;
        emailAddress: string;
        firstName: string;
        lastName: string;
        roles?: Role[];
    }

    interface Session {
        accessToken: string;
        user: {
            roles?: Role[];
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string;
        roles?: Role[];
    }
}
