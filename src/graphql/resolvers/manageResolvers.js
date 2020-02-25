const {
    getUserById,
    getUserByEmailAddress,
    updateUser,
    removeUser
} = require('../../data/userRepository');
const { isAuthenticated } = require('../context');
const { hashPassword, verifyPassword } = require('../../utils/password');

module.exports = {
    Query: {
        getProfile: async (_, __, context) => {
            isAuthenticated(context);
            return getUserById(context.payload.sub);
        }
    },
    Mutation: {
        updateProfile: async (_, { input }, context) => {
            isAuthenticated(context);

            const user = await getUserById(context.payload.sub);
            if (!user) {
                return {
                    code: 404,
                    success: false,
                    message: 'User not found.'
                };
            }

            if (user.emailAddress !== input.emailAddress) {
                const existing = await getUserByEmailAddress(
                    input.emailAddress
                );

                if (existing) {
                    return {
                        code: 400,
                        success: false,
                        message: `User name "${input.emailAddress}" is already taken.`
                    };
                }
            }

            user.emailAddress = input.emailAddress;
            user.firstName = input.firstName;
            user.lastName = input.lastName;
            user.dateOfBirth = input.dateOfBirth;
            await updateUser(user);

            return {
                code: 200,
                success: true,
                message: 'Your profile has been updated.',
                user
            };
        },
        changePassword: async (
            _,
            { currentPassword, newPassword },
            context
        ) => {
            isAuthenticated(context);

            const user = await getUserById(context.payload.sub);
            if (!user) {
                return {
                    code: 404,
                    success: false,
                    message: 'User not found.'
                };
            }

            const verified = await verifyPassword(
                currentPassword,
                user.password
            );

            if (!verified) {
                return {
                    code: 400,
                    success: false,
                    message: 'Incorrect password.'
                };
            }

            user.password = await hashPassword(newPassword);
            user.passwordResetToken = undefined;
            await updateUser(user);

            return {
                code: 200,
                success: true,
                message: 'Your password has been changed.',
                user
            };
        },
        deleteAccount: async (_, __, context) => {
            isAuthenticated(context);

            const user = await getUserById(context.payload.sub);
            if (!user) {
                return {
                    code: 404,
                    success: false,
                    message: 'User not found.'
                };
            }

            await removeUser(user);

            return {
                code: 200,
                success: true,
                message: 'Your account has been deleted.'
            };
        }
    }
};
