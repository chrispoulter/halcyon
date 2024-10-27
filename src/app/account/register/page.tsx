import { Metadata } from 'next';
import RegisterContent from './content';

export const metadata: Metadata = {
    title: 'Register'
};

export default function RegisterPage() {
    return <RegisterContent />;
}
