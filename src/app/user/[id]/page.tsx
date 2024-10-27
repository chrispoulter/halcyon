import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title, SubTitle } from '@/components/title';

export const metadata: Metadata = {
    title: 'Update User'
};

type UpdateUserPageProps = {
    params: { id: string };
};

export default async function UpdateUserPage({
    params: { id }
}: UpdateUserPageProps) {
    console.log(id);

    return (
        <Container>
            <Title>
                User
                <SubTitle>Update</SubTitle>
            </Title>
        </Container>
    );
}
