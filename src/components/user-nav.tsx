'use client';

import Link from 'next/link';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HasPersmission } from '@/components/has-permission';
import { UserAvatar } from '@/components/user-avatar';
import { UserStatus } from '@/components/user-status';
import { Role, SessionPayload } from '@/lib/definitions';

type UserNavProps = {
    session?: SessionPayload;
    onLogout: () => void;
};

export function UserNav({ session, onLogout }: UserNavProps) {
    if (!session) {
        return (
            <nav className="flex items-center gap-2">
                <Button asChild variant="secondary">
                    <Link href="/account/register">Register</Link>
                </Button>

                <Button asChild variant="secondary">
                    <Link href="/account/login">Login</Link>
                </Button>
            </nav>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                    <UserAvatar session={session} />
                    <span className="sr-only">Toggle profile menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-2">
                    <div className="truncate text-sm font-medium leading-none">
                        {session.firstName} {session.lastName}
                    </div>
                    <div className="truncate text-sm text-muted-foreground">
                        {session.emailAddress}
                    </div>
                    <UserStatus user={session} className="sm:flex-col" />
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User />
                        <span>My Account</span>
                    </Link>
                </DropdownMenuItem>

                <HasPersmission
                    session={session}
                    requiredRoles={[
                        Role.SYSTEM_ADMINISTRATOR,
                        Role.USER_ADMINISTRATOR,
                    ]}
                >
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/user">
                            <Settings />
                            <span>User Management</span>
                        </Link>
                    </DropdownMenuItem>
                </HasPersmission>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onLogout}>
                    <LogOut />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}