import { vi } from 'vitest';

vi.mock('next/navigation', () => vi.importActual('next-router-mock'));

vi.mock('next-auth', () => ({
    default: () => ({
        auth: vi.fn()
    })
}));

vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({})),
    signIn: vi.fn(),
    signOut: vi.fn()
}));
