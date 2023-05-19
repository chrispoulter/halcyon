import { Users } from '@prisma/client';
import { encode } from 'next-auth/jwt';
import { config } from '@/utils/config';
import { Role } from '@/utils/auth';

export const generateToken = async (user: Users) =>
    encode({
        secret: config.NEXTAUTH_SECRET,
        maxAge: config.NEXTAUTH_SESSION_MAXAGE,
        token: {
            sub: user.id.toString(),
            email: user.emailAddress,
            given_name: user.firstName,
            family_name: user.lastName,
            roles: user.roles?.map(r => r as Role)
        }
    });