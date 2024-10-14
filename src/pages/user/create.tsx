import { useRouter } from 'next/router';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { Title, SubTitle } from '@/components/title';
import { ButtonLink } from '@/components/button-link';
import {
    CreateUserForm,
    CreateUserFormValues
} from '@/features/user/components/create-user-form';
import { useCreateUser } from '@/features/user/hooks/use-create-user';
import { useToast } from '@/hooks/use-toast';

const CreateUserPage = () => {
    const router = useRouter();

    const { toast } = useToast();

    const { mutate, isPending } = useCreateUser();

    const onSubmit = (values: CreateUserFormValues) =>
        mutate(values, {
            onSuccess: async () => {
                toast({ description: 'User successfully created.' });
                return router.push('/user');
            }
        });

    return (
        <>
            <Meta title="Create User" />

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
        </>
    );
};

export default CreateUserPage;
