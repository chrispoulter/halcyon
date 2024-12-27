import { Role } from '@/lib/session-definitions';

export enum UserSort {
    EMAIL_ADDRESS_ASC = 'EMAIL_ADDRESS_ASC',
    EMAIL_ADDRESS_DESC = 'EMAIL_ADDRESS_DESC',
    NAME_ASC = 'NAME_ASC',
    NAME_DESC = 'NAME_DESC',
}

export type SearchUsersItem = {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    isLockedOut: boolean;
    roles?: Role[];
};

export type SearchUsersResponse = {
    items: SearchUsersItem[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type GetUserResponse = {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    isLockedOut: boolean;
    roles?: Role[];
    version: string;
};

export type CreateUserResponse = {
    id: string;
};

export type UpdateUserResponse = {
    id: string;
};

export type LockUserResponse = {
    id: string;
};

export type UnlockUserResponse = {
    id: string;
};

export type DeleteUserResponse = {
    id: string;
};
