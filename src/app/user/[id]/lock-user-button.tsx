'use client';

import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { lockUserAction } from '@/app/user/actions/lock-user-action';
import { GetUserResponse } from '@/app/user/user-types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LoadingButton } from '@/components/loading-button';
import { ServerActionErrorMessage } from '@/components/server-action-error';

type LockUserButtonProps = {
    user: GetUserResponse;
    className?: string;
};

export function LockUserButton({ user, className }: LockUserButtonProps) {
    const router = useRouter();

    const { execute, isPending } = useAction(lockUserAction, {
        onSuccess: () => {
            toast.success('User successfully locked.');
            router.refresh();
        },
        onError: ({ error }) => {
            toast.error(<ServerActionErrorMessage result={error} />);
        },
    });

    function onLock() {
        execute({
            id: user.id,
            version: user.version,
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <LoadingButton
                    variant="secondary"
                    loading={isPending}
                    className={className}
                >
                    Lock
                </LoadingButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Lock User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to lock this user account? The
                        user will no longer be able to access the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isPending} onClick={onLock}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
