import crypto from 'crypto';
import { UpdatedResponse } from '@/models/base.types';
import { getUserSchema, unlockUserSchema } from '@/models/user.types';
import prisma from '@/utils/prisma';
import { handler, Handler } from '@/utils/handler';
import { isUserAdministrator } from '@/utils/auth';

const unlockUserHandler: Handler<UpdatedResponse> = async (req, res) => {
    const query = await getUserSchema.validate(req.query);

    const user = await prisma.users.findUnique({
        where: {
            id: query.id
        }
    });

    if (!user) {
        return res.status(404).json({
            code: 'USER_NOT_FOUND',
            message: 'User not found.'
        });
    }

    const body = await unlockUserSchema.validate(req.body);

    if (body.version && body.version !== user.version) {
        return res.status(409).json({
            code: 'CONFLICT',
            message:
                'Data has been modified or deleted since entities were loaded.'
        });
    }

    await prisma.users.update({
        where: {
            id: user.id
        },
        data: {
            isLockedOut: false,
            version: crypto.randomUUID()
        }
    });

    return res.json({
        code: 'USER_UNLOCKED',
        message: 'User successfully unlocked.',
        data: {
            id: user.id
        }
    });
};

export default handler(
    {
        put: unlockUserHandler
    },
    { auth: isUserAdministrator }
);
