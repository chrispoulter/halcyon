import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'Update Profile'
};

export default async function UpdateProfilePage() {
    return (
        <Container>
            <Title>Update Profile</Title>
        </Container>
    );
}
