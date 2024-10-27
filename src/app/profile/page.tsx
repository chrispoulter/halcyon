import { Metadata } from 'next';
import ProfileContent from './content';

export const metadata: Metadata = {
    title: 'My Account'
};

export default function ProfilePage() {
    return <ProfileContent />;
}
