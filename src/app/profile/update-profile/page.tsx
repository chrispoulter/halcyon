'use client';

// import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import { ButtonLink } from '@/components/button-link';
import {
    UpdateProfileForm,
    UpdateProfileFormValues
} from '@/features/profile/components/update-profile-form';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { useUpdateProfile } from '@/features/profile/hooks/use-update-profile';

// export const metadata: Metadata = {
//     title: 'Update Profile'
// };

export default function UpdateProfilePage() {
    const router = useRouter();

    const { data } = useGetProfile();

    const version = data?.version;

    const { mutate, isPending } = useUpdateProfile();

    const onSubmit = (values: UpdateProfileFormValues) =>
        mutate(
            { ...values, version },
            {
                onSuccess: async () => {
                    toast.success('Your profile has been updated.');
                    return router.push('/profile');
                }
            }
        );

    return (
        <Container>
            <Title>Update Profile</Title>

            <UpdateProfileForm
                profile={data}
                isLoading={isPending}
                onSubmit={onSubmit}
                options={
                    <ButtonLink href="/profile" variant="secondary">
                        Cancel
                    </ButtonLink>
                }
            />
        </Container>
    );
}
