import { BodyLink } from '@/components/BodyLink/BodyLink';
import { getCurrentYear } from '@/utils/date';
import { config } from '@/utils/config';

export const Footer = () => (
    <footer className="container mx-auto mb-3 mt-8 flex max-w-screen-md justify-between border-t p-3 text-sm text-gray-400">
        <p>
            &copy;{' '}
            <BodyLink href="https://www.chrispoulter.com">
                Chris Poulter
            </BodyLink>{' '}
            {getCurrentYear()}
        </p>
        <p>v{config.VERSION}</p>
    </footer>
);
