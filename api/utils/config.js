import 'dotenv/config';

const accountId = process.env.ACCOUNTID || '123456789012';
const region = process.env.REGION || 'eu-west-1';
const stage = process.env.STAGE || 'local';
const release = process.env.RELEASE || 'local';

export const config = {
    ACCOUNTID: accountId,
    REGION: region,
    STAGE: stage,
    RELEASE: release,

    JWT_SECURITYKEY: process.env.JWT_SECURITYKEY || 'change-me-1234567890',
    JWT_ISSUER: process.env.JWT_ISSUER || 'HalcyonApi',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'HalcyonClient',
    JWT_EXPIRESIN: parseInt(process.env.JWT_EXPIRESIN || '3600'),

    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    MAILGUN_APIKEY: process.env.MAILGUN_APIKEY,
    MAILGUN_NOREPLY: process.env.MAILGUN_NOREPLY || 'noreply@chrispoulter.com',

    SEED_EMAILADDRESS: process.env.SEED_EMAILADDRESS,
    SEED_PASSWORD: process.env.SEED_PASSWORD,

    DYNAMODB_ENDPOINT: stage === 'local' ? 'http://localhost:8000' : undefined,

    SNS_ENDPOINT: stage === 'local' ? 'http://127.0.0.1:4002' : undefined,

    CLIENT_URL:
        stage === 'local' ? 'http://localhost:3000' : process.env.CLIENT_URL
};
