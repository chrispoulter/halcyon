'use server';

import { z } from 'zod';
import type { GetUserResponse } from '@/app/user/user-types';
import { fetcher } from '@/lib/api-client';
import { authActionClient } from '@/lib/safe-action';
import { Role } from '@/lib/session-types';

const schema = z.object({
    id: z
        .string({ message: 'Id must be a valid string' })
        .uuid('Id must be a valid UUID'),
});

export const getUserAction = authActionClient([
    Role.SYSTEM_ADMINISTRATOR,
    Role.USER_ADMINISTRATOR,
])
    .schema(schema)
    .action(async ({ parsedInput: { id }, ctx: { accessToken } }) => {
        return await fetcher<GetUserResponse>(`/user/${id}`, {
            accessToken,
        });
    });
