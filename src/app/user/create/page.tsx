import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title, SubTitle } from '@/components/title';

export const metadata: Metadata = {
    title: 'Create User'
};

export default function CreateUserPage() {
    return (
        <Container>
            <Title>
                User
                <SubTitle>Create</SubTitle>
            </Title>
        </Container>
    );
}
