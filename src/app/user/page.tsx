import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'Users'
};

export default async function SearchUsersPage() {
    return (
        <Container>
            <Title>Users</Title>
        </Container>
    );
}
