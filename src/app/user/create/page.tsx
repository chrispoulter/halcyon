import { Metadata } from 'next';
import CreateUserContent from './content';

export const metadata: Metadata = {
    title: 'Create User'
};

export default function CreateUserPage() {
    return <CreateUserContent />;
}
