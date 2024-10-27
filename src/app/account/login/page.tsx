import { Metadata } from 'next';
import LoginContent from './content';

export const metadata: Metadata = {
    title: 'Login'
};

export default function LoginPage() {
    return <LoginContent />;
}
