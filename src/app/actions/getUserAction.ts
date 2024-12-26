'use server';

import { trace } from '@opentelemetry/api';
import { z } from 'zod';
import { Role } from '@/lib/definitions';
import { verifySession } from '@/lib/session';

export type GetUserResponse = {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    isLockedOut: boolean;
    roles?: Role[];
    version: string;
};

const actionSchema = z.object({
    id: z
        .string({ message: 'Id must be a valid string' })
        .uuid('Id must be a valid UUID'),
});

export async function getUserAction(data: unknown) {
    return await trace
        .getTracer('halcyon')
        .startActiveSpan('getUserAction', async (span) => {
            try {
                const session = await verifySession([
                    Role.SYSTEM_ADMINISTRATOR,
                    Role.USER_ADMINISTRATOR,
                ]);

                const request = actionSchema.safeParse(data);

                if (!request.success) {
                    return {
                        errors: request.error.flatten().fieldErrors,
                    };
                }

                const response = await fetch(
                    `${process.env.API_URL}/user/${request.data.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    return {
                        errors: [
                            'An error occurred while processing your request',
                        ],
                    };
                }

                return (await response.json()) as GetUserResponse;
            } finally {
                span.end();
            }
        });
}
