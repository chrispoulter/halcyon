import { JWT } from 'next-auth/jwt';

export const SYSTEM_ADMINISTRATOR = 'SYSTEM_ADMINISTRATOR';
export const USER_ADMINISTRATOR = 'USER_ADMINISTRATOR';

export const isUserAdministrator = [SYSTEM_ADMINISTRATOR, USER_ADMINISTRATOR];

type Roles = {
    [key: string]: {
        title: string;
        description: string;
    };
};

export const roles: Roles = {
    [SYSTEM_ADMINISTRATOR]: {
        title: 'System Administrator',
        description: 'A system administrator has access to the entire system.'
    },
    [USER_ADMINISTRATOR]: {
        title: 'User Administrator',
        description: 'A user administrator can create / update / delete users.'
    }
};

export const roleOptions = Object.entries(roles).map(([value, item]) => ({
    value,
    ...item
}));

export const isAuthorized = (
    token?: Pick<JWT, 'roles'>,
    requiredRoles?: string[]
) => {
    if (!token) {
        return false;
    }

    if (!requiredRoles) {
        return true;
    }

    if (!token.roles) {
        return false;
    }

    const userRoles = token.roles;

    if (!requiredRoles.some(value => userRoles.includes(value))) {
        return false;
    }

    return true;
};
