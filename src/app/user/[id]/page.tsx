import { Metadata } from 'next';
import UpdateUserContent from './content';

export const metadata: Metadata = {
    title: 'Update User'
};

type UpdateUserPageParams = {
    params: Promise<{ id: string }>;
};

export default async function UpdateUserPage({ params }: UpdateUserPageParams) {
    const { id } = await params;
    return <UpdateUserContent id={id} />;
}
