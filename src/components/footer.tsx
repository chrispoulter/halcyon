import { TextLink } from '@/components/text-link';
import { currentYear } from '@/lib/dates';
import { config } from '@/lib/config';

export const Footer = () => (
    <footer className="container mx-auto mb-3 mt-8 flex max-w-screen-md justify-between border-t p-3 text-sm text-gray-400">
        <p>
            &copy;{' '}
            <TextLink href="https://www.chrispoulter.com">
                Chris Poulter
            </TextLink>{' '}
            {currentYear}
        </p>
        <p>v{config.VERSION}</p>
    </footer>
);
