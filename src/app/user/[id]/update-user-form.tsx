'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { Loader2 } from 'lucide-react';
import type { GetUserResponse } from '@/app/user/actions/user-definitions';
import { Role } from '@/app/user/actions/user-definitions';
import { updateUserAction } from '@/app/user/actions/update-user-action';
import { DeleteUserButton } from '@/app/user/[id]/delete-user-button';
import { LockUserButton } from '@/app/user/[id]/lock-user-button';
import { UnlockUserButton } from '@/app/user/[id]/unlock-user-button';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DateFormField } from '@/components/date-form-field';
import { RoleFormField } from '@/components/role-form-field';
import { TextFormField } from '@/components/text-form-field';
import { toast } from '@/hooks/use-toast';
import { isInPast } from '@/lib/dates';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address must be a valid string' })
        .email('Email Address must be a valid email'),
    firstName: z
        .string({ message: 'First Name must be a valid string' })
        .min(1, 'First Name is a required field')
        .max(50, 'First Name must be no more than 50 characters'),
    lastName: z
        .string({ message: 'Last Name must be a valid string' })
        .min(1, 'Last Name is a required field')
        .max(50, 'Last Name must be no more than 50 characters'),
    dateOfBirth: z
        .string({
            message: 'Date of Birth must be a valid string',
        })
        .date('Date Of Birth must be a valid date')
        .refine(isInPast, { message: 'Date Of Birth must be in the past' }),
    roles: z
        .array(
            z.nativeEnum(Role, {
                message: 'Role must be a valid user role',
            }),
            { message: 'Role must be a valid array' }
        )
        .optional(),
});

type UpdateUserFormValues = z.infer<typeof schema>;

type UpdateUserFormProps = {
    user: GetUserResponse;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
    const router = useRouter();

    const form = useForm<UpdateUserFormValues>({
        resolver: zodResolver(schema),
        values: user,
    });

    const { execute, isPending } = useAction(updateUserAction, {
        onSuccess() {
            toast({
                title: 'User successfully updated.',
            });

            router.push('/user');
        },
        onError() {
            toast({
                variant: 'destructive',
                title: 'An error occurred while processing your request.',
            });
        },
    });

    function onSubmit(data: UpdateUserFormValues) {
        execute({ ...data, id: user.id });
    }

    return (
        <Form {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <TextFormField
                    field="emailAddress"
                    label="Email Address"
                    type="email"
                    maxLength={254}
                    autoComplete="username"
                    required
                    disabled={isPending}
                />

                <div className="flex flex-col gap-6 sm:flex-row">
                    <TextFormField
                        field="firstName"
                        label="First Name"
                        maxLength={50}
                        autoComplete="given-name"
                        required
                        disabled={isPending}
                        className="flex-1"
                    />
                    <TextFormField
                        field="lastName"
                        label="Last Name"
                        maxLength={50}
                        autoComplete="family-name"
                        required
                        disabled={isPending}
                        className="flex-1"
                    />
                </div>

                <DateFormField
                    field="dateOfBirth"
                    label="Date Of Birth"
                    autoComplete={['bday-day', 'bday-month', 'bday-year']}
                    required
                    disabled={isPending}
                />

                <RoleFormField field="roles" disabled={isPending} />

                <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
                    <Button asChild variant="outline" className="min-w-36">
                        <Link href="/user">Cancel</Link>
                    </Button>

                    {user.isLockedOut ? (
                        <UnlockUserButton
                            user={user}
                            disabled={isPending}
                            className="min-w-36"
                        />
                    ) : (
                        <LockUserButton
                            user={user}
                            disabled={isPending}
                            className="min-w-36"
                        />
                    )}

                    <DeleteUserButton
                        user={user}
                        disabled={isPending}
                        className="min-w-36"
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="min-w-36"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
