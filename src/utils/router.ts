import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler, createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import { ValidationError } from 'yup';
import { httpLogger } from './logger';
import { isAuthorized } from './auth';
import { config } from './config';

export type AuthenticatedNextApiRequest = NextApiRequest & {
    currentUserId: number;
};

export const authorize =
    (requiredRoles?: string[]) =>
    async (
        req: AuthenticatedNextApiRequest,
        res: NextApiResponse,
        next: NextHandler
    ) => {
        const token = await getToken({
            req,
            secret: config.NEXTAUTH_SECRET
        });

        if (!token) {
            res.status(401).end();
            return;
        }

        if (requiredRoles) {
            const authorized = isAuthorized(token, requiredRoles);

            if (!authorized) {
                res.status(403).end();
                return;
            }
        }

        req.currentUserId = parseInt(token.sub!);

        return next();
    };

export const onError = (
    error: unknown,
    _: NextApiRequest,
    res: NextApiResponse
) => {
    // logger.error(error, 'Api handler failed');

    if (error instanceof ValidationError) {
        return res.status(400).json({
            message: 'One or more validation errors occurred.',
            errors: error.errors
        });
    }

    return res.status(500).json({
        message:
            error instanceof Error
                ? error.message
                : 'An error occurred while processing your request.'
    });
};

export const onNoMatch = (_: NextApiRequest, res: NextApiResponse) => {
    res.status(405).end();
};

export const baseRouter = createRouter<
    AuthenticatedNextApiRequest,
    NextApiResponse
>().use(httpLogger);
