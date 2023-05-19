import { GetProfileResponse, updateProfileSchema } from '@/models/manage.types';
import prisma from '@/utils/prisma';
import { handler, Handler, UpdatedResponse } from '@/utils/handler';

const getProfileHandler: Handler<GetProfileResponse> = async (
    _,
    res,
    { currentUserId }
) => {
    const user = await prisma.users.findUnique({
        where: {
            id: currentUserId
        }
    });

    if (!user || user.isLockedOut) {
        return res.status(404).json({
            code: 'USER_NOT_FOUND',
            message: 'User not found.'
        });
    }

    return res.json({
        data: {
            id: user.id,
            emailAddress: user.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth
        }
    });
};

const updateProfileHandler: Handler<UpdatedResponse> = async (
    req,
    res,
    { currentUserId }
) => {
    const body = await updateProfileSchema.validate(req.body);

    const user = await prisma.users.findUnique({
        where: {
            id: currentUserId
        }
    });

    if (!user) {
        return res.status(404).json({
            code: 'USER_NOT_FOUND',
            message: 'User not found.'
        });
    }

    if (user.emailAddress !== body.emailAddress) {
        const existing = await prisma.users.findUnique({
            where: {
                emailAddress: body.emailAddress
            }
        });

        if (existing) {
            return res.status(400).json({
                code: 'DUPLICATE_USER',
                message: `User name "${body.emailAddress}" is already taken.`
            });
        }
    }

    await prisma.users.update({
        where: {
            id: user.id
        },
        data: {
            emailAddress: body.emailAddress,
            firstName: body.firstName,
            lastName: body.lastName,
            dateOfBirth: body.dateOfBirth
        }
    });

    return res.json({
        code: 'PROFILE_UPDATED',
        message: 'Your profile has been updated.',
        data: {
            id: user.id
        }
    });
};

const deleteProfileHandler: Handler<UpdatedResponse> = async (
    _,
    res,
    { currentUserId }
) => {
    const user = await prisma.users.findUnique({
        where: {
            id: currentUserId
        }
    });

    if (!user) {
        return res.status(404).json({
            code: 'USER_NOT_FOUND',
            message: 'User not found.'
        });
    }

    await prisma.users.delete({
        where: {
            id: user.id
        }
    });

    return res.json({
        code: 'ACCOUNT_DELETED',
        message: 'Your account has been deleted.',
        data: {
            id: user.id
        }
    });
};

export default handler(
    {
        get: getProfileHandler,
        put: updateProfileHandler,
        delete: deleteProfileHandler
    },
    { auth: true }
);