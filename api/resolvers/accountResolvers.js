import { ApolloError } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';
import { publish } from '../utils/events';
import { generateHash } from '../utils/hash';

export const accountResolvers = {
    Mutation: {
        register: async (_, { input }, { dataSources: { users } }) => {
            const existing = await users.getByEmailAddress(input.emailAddress);

            if (existing) {
                throw new ApolloError(
                    `User name "${input.emailAddress}" is already taken.`,
                    'DUPLICATE_USER'
                );
            }

            const result = await users.create({
                emailAddress: input.emailAddress,
                password: await generateHash(input.password),
                firstName: input.firstName,
                lastName: input.lastName,
                dateOfBirth: input.dateOfBirth.toISOString()
            });

            return {
                code: 'USER_REGISTERED',
                message: 'User successfully registered.',
                user: result
            };
        },
        forgotPassword: async (
            _,
            { emailAddress },
            { dataSources: { users } }
        ) => {
            const user = await users.getByEmailAddress(emailAddress);
            if (user) {
                user.passwordResetToken = uuidv4();
                await users.update(user);

                await publish({
                    type: 'SEND_EMAIL',
                    data: {
                        to: user.emailAddress,
                        template: 'RESET_PASSWORD',
                        context: {
                            token: user.passwordResetToken
                        }
                    }
                });
            }

            return {
                code: 'FORGOT_PASSWORD',
                message:
                    'Instructions as to how to reset your password have been sent to you via email.'
            };
        },
        resetPassword: async (_, { input }, { dataSources: { users } }) => {
            const user = await users.getByEmailAddress(input.emailAddress);
            if (!user || user.passwordResetToken !== input.token) {
                throw new ApolloError('Invalid token.', 'INVALID_TOKEN');
            }

            user.password = await generateHash(input.newPassword);
            user.passwordResetToken = undefined;
            await users.update(user);

            return {
                code: 'PASSWORD_RESET',
                message: 'Your password has been reset.',
                user
            };
        }
    }
};
