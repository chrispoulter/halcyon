import { currentYear } from '@/lib/dates';

export function Footer() {
    return (
        <footer className="mt-6 border-t">
            <div className="mx-auto flex max-w-screen-sm flex-col justify-between gap-2 p-6 text-center sm:flex-row sm:text-left">
                <div className="text-sm font-medium leading-none">
                    &copy;{' '}
                    <a
                        href="http://www.chrispoulter.com"
                        className="font-medium text-primary underline underline-offset-4"
                    >
                        Chris Poulter
                    </a>{' '}
                    {currentYear}
                </div>
                <div className="text-sm font-medium leading-none">v1.0.0</div>
            </div>
        </footer>
    );
}
