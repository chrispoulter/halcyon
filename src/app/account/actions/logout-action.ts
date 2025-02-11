'use server';

import { redirect } from 'next/navigation';
import { actionClient } from '@/lib/safe-action';
import { deleteSession } from '@/lib/session';

export const logoutAction = actionClient
    .metadata({ actionName: 'logoutAction' })
    .action(async () => {
        await deleteSession();
        redirect('/account/login');
    });
