export const config = {
    NODE_ENV: process.env.NODE_ENV,
    VERSION: process.env.NEXT_PUBLIC_GITVERSION_SEMVER || '1.0.0',

    API_URL:
        process.env.NEXT_PUBLIC_API_URL ||
        `${process.env.NEXTAUTH_URL || ''}/api`,

    DATABASE_URL: process.env.DATABASE_URL!,

    EMAIL_SMTP_SERVER: process.env.EMAIL_SMTP_SERVER || 'localhost',
    EMAIL_SMTP_PORT: parseInt(process.env.EMAIL_SMTP_PORT || '1025'),
    EMAIL_SMTP_USERNAME: process.env.EMAIL_SMTP_USERNAME,
    EMAIL_SMTP_PASSWORD: process.env.EMAIL_SMTP_PASSWORD,
    EMAIL_NO_REPLY_ADDRESS:
        process.env.EMAIL_NO_REPLY_ADDRESS || 'noreply@chrispoulter.com',

    SEED_EMAIL_ADDRESS: process.env.SEED_EMAIL_ADDRESS!,
    SEED_PASSWORD: process.env.SEED_PASSWORD!,

    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'change-me-1234567890',
    NEXTAUTH_SESSION_MAXAGE: parseInt(
        process.env.NEXTAUTH_SESSION_MAXAGE || '3600'
    ),

    JWT_SECURITY_KEY: process.env.JWT_SECURITY_KEY || 'change-me-1234567890',
    JWT_ISSUER: process.env.JWT_ISSUER || 'HalcyonApi',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'HalcyonClient',
    JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN || '3600')
};
