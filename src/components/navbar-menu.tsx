import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { MenuIcon } from '@/components/menu-icon';
import { isAuthorized, isUserAdministrator } from '@/lib/roles';
import { cn } from '@/lib/utils';

type NavbarMenuOption = {
    href: string;
    label: string;
};

const NavbarMenuOptionsLoading = () => (
    <>
        <div role="status" className="animate-pulse p-2">
            <div className="h-3 bg-zinc-700 sm:w-14" />
        </div>
        <div role="status" className="animate-pulse p-2">
            <div className="h-3 bg-zinc-700 sm:w-14" />
        </div>
        <span className="sr-only">Loading...</span>
    </>
);

const NavbarMenuOptions = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) {
        return <NavbarMenuOptionsLoading />;
    }

    const options: NavbarMenuOption[] = [];

    if (!isAuthorized(session?.user)) {
        options.push({ href: '/account/login', label: 'Login' });
        options.push({ href: '/account/register', label: 'Register' });
    }

    if (isAuthorized(session?.user, isUserAdministrator)) {
        options.push({ href: '/user', label: 'Users' });
    }

    return (
        <>
            {options.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className="p-2 text-sm text-gray-400 hover:bg-neutral-900 hover:text-gray-100 focus:bg-neutral-900 focus:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:hover:bg-transparent sm:focus:bg-transparent"
                >
                    {label}
                </Link>
            ))}
        </>
    );
};

export const NavbarMenu = () => (
    <Popover className="contents">
        {({ open }) => (
            <>
                <PopoverButton
                    className="p-1 text-gray-400 hover:text-gray-100 focus:text-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:order-1 sm:hidden"
                    aria-label="Toggle Navigation"
                >
                    <MenuIcon className="h-6 w-6" />
                </PopoverButton>

                <PopoverPanel
                    static
                    className={cn(
                        'flex basis-full flex-col gap-1 p-1 sm:ml-auto sm:flex sm:basis-auto sm:flex-row sm:items-center sm:p-0',
                        {
                            hidden: !open
                        }
                    )}
                >
                    <NavbarMenuOptions />
                </PopoverPanel>
            </>
        )}
    </Popover>
);
