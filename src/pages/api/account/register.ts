import { registerSchema } from '@/features/account/accountTypes';
import { createApiRouter, onError } from '@/utils/router';
import { User, query } from '@/utils/db';
import { hashPassword } from '@/utils/hash';

const router = createApiRouter();

router.post(async (req, res) => {
    const body = await registerSchema.validate(req.body, {
        stripUnknown: true
    });

    const {
        rows: [existing]
    } = await query<User>(
        'SELECT id FROM users WHERE email_address = $1 LIMIT 1',
        [body.emailAddress]
    );

    if (existing) {
        return res.status(400).json({
            message: 'User name is already taken.'
        });
    }

    const {
        rows: [result]
    } = await query<User>(
        'INSERT INTO users (email_address, password, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [
            body.emailAddress,
            await hashPassword(body.password),
            body.firstName,
            body.lastName,
            body.dateOfBirth
        ]
    );

    return res.json({
        id: result.id
    });
});

export default router.handler({
    onError
});
