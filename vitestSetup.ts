import { vi } from 'vitest';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({})),
    signIn: vi.fn(),
    signOut: vi.fn()
}));

vi.mock('@/lib/auth', () => ({
    auth: vi.fn()
}));
