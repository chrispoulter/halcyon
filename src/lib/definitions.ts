export enum Role {
    SYSTEM_ADMINISTRATOR = 'SYSTEM_ADMINISTRATOR',
    USER_ADMINISTRATOR = 'USER_ADMINISTRATOR',
}

export const roleDetails = {
    [Role.SYSTEM_ADMINISTRATOR]: {
        title: 'System Administrator',
        description: 'A system administrator has access to the entire system.',
    },
    [Role.USER_ADMINISTRATOR]: {
        title: 'User Administrator',
        description: 'A user administrator can create / update / delete users.',
    },
};

export type SessionPayload = {
    accessToken: string;
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    roles?: Role[];
};