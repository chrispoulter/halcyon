// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import jestFetchMock from 'jest-fetch-mock';
jestFetchMock.enableMocks();

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next-auth', () => ({
    __esModule: true,
    default: jest.fn(),
    getServerSession: jest.fn()
}));

jest.mock('next-auth/react', () => ({
    __esModule: true,
    getSession: jest.fn(),
    signIn: jest.fn()
}));
