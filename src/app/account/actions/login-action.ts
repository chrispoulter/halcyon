'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { actionClient, ActionError } from '@/lib/safe-action';
import { Role } from '@/lib/definitions';
import { verifyHash } from '@/lib/hash';
import { createSession } from '@/lib/session';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address must be a valid string' })
        .email('Email Address must be a valid email'),
    password: z
        .string({ message: 'Password must be a valid string' })
        .min(1, 'Password is a required field'),
});

export const loginAction = actionClient
    .metadata({ actionName: 'loginAction' })
    .schema(schema)
    .action(async ({ parsedInput }) => {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.emailAddress, parsedInput.emailAddress))
            .limit(1);

        if (!user || !user.password) {
            throw new ActionError('The credentials provided were invalid.');
        }

        const verified = verifyHash(parsedInput.password, user.password);

        if (!verified) {
            throw new ActionError('The credentials provided were invalid.');
        }

        if (user.isLockedOut) {
            throw new ActionError(
                'This account has been locked out, please try again later.'
            );
        }

        await createSession({
            sub: user.id,
            email: user.emailAddress,
            given_name: user.firstName,
            family_name: user.lastName,
            roles: user.roles as Role[],
        });
    });
