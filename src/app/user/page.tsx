import { Metadata } from 'next';
import SearchUsersContent from './content';

export const metadata: Metadata = {
    title: 'Users'
};

export default function SearchUsersPage() {
    return <SearchUsersContent />;
}
