'use client';

// import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title, SubTitle } from '@/components/title';
import { ButtonLink } from '@/components/button-link';
import {
    CreateUserForm,
    CreateUserFormValues
} from '@/features/user/components/create-user-form';
import { useCreateUser } from '@/features/user/hooks/use-create-user';

// export const metadata: Metadata = {
//     title: 'Create User'
// };

export default function CreateUserPage() {
    const router = useRouter();

    const { mutate, isPending } = useCreateUser();

    const onSubmit = (values: CreateUserFormValues) =>
        mutate(values, {
            onSuccess: async () => {
                toast.success('User successfully created.');
                return router.push('/user');
            }
        });

    return (
        <Container>
            <Title>
                User
                <SubTitle>Create</SubTitle>
            </Title>

            <CreateUserForm
                isLoading={isPending}
                onSubmit={onSubmit}
                options={
                    <ButtonLink href="/user" variant="secondary">
                        Cancel
                    </ButtonLink>
                }
            />
        </Container>
    );
}
