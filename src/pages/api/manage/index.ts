import { ErrorResponse, UpdatedResponse } from '@/common/types';
import {
    GetProfileResponse,
    deleteAccountSchema,
    updateProfileSchema
} from '@/features/manage/manageTypes';
import prisma from '@/utils/prisma';
import { mapHandlers, Handler } from '@/utils/handler';
import { toDateOnlyString } from '@/utils/date';

const getProfileHandler: Handler<GetProfileResponse | ErrorResponse> = async (
    _,
    res,
    { currentUserId }
) => {
    const user = await prisma.users.findUnique({
        select: {
            id: true,
            emailAddress: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            isLockedOut: true,
            version: true
        },
        where: {
            id: currentUserId
        }
    });

    if (!user || user.isLockedOut) {
        return res.status(404).json({
            message: 'User not found.'
        });
    }

    return res.json({
        id: user.id,
        emailAddress: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: toDateOnlyString(user.dateOfBirth),
        version: user.version!
    });
};

const updateProfileHandler: Handler<UpdatedResponse | ErrorResponse> = async (
    req,
    res,
    { currentUserId }
) => {
    const body = await updateProfileSchema.validate(req.body, {
        stripUnknown: true
    });

    const user = await prisma.users.findUnique({
        select: {
            id: true,
            emailAddress: true,
            version: true
        },
        where: {
            id: currentUserId
        }
    });

    if (!user) {
        return res.status(404).json({
            message: 'User not found.'
        });
    }

    if (body.version && body.version !== user.version) {
        return res.status(409).json({
            message: 'Data has been modified since entities were loaded.'
        });
    }

    if (user.emailAddress !== body.emailAddress) {
        const existing = await prisma.users.findUnique({
            select: {
                id: true
            },
            where: {
                emailAddress: body.emailAddress
            }
        });

        if (existing) {
            return res.status(400).json({
                message: 'User name is already taken.'
            });
        }
    }

    await prisma.users.update({
        where: {
            id: user.id
        },
        data: {
            ...body,
            search: `${body.emailAddress} ${body.firstName} ${body.lastName}`,
            version: crypto.randomUUID()
        }
    });

    return res.json({
        id: user.id
    });
};

const deleteProfileHandler: Handler<UpdatedResponse | ErrorResponse> = async (
    req,
    res,
    { currentUserId }
) => {
    const user = await prisma.users.findUnique({
        select: {
            id: true,
            version: true
        },
        where: {
            id: currentUserId
        }
    });

    if (!user) {
        return res.status(404).json({
            message: 'User not found.'
        });
    }

    const body = await deleteAccountSchema.validate(req.body);

    if (body.version && body.version !== user.version) {
        return res.status(409).json({
            message: 'Data has been modified since entities were loaded.'
        });
    }

    await prisma.users.delete({
        where: {
            id: user.id
        }
    });

    return res.json({
        id: user.id
    });
};

export default mapHandlers(
    {
        get: getProfileHandler,
        put: updateProfileHandler,
        delete: deleteProfileHandler
    },
    { authorize: true }
);
