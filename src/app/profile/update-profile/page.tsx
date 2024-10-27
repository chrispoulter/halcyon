import { Metadata } from 'next';
import UpdateProfileContent from './content';

export const metadata: Metadata = {
    title: 'Update Profile'
};

export default function UpdateProfilePage() {
    return <UpdateProfileContent />;
}
