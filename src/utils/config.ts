export const config = {
    VERSION: process.env.NEXT_PUBLIC_VERSION || '1.0.0',
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7257',
    JWT_SECURITY_KEY:
        process.env.JWT_SECURITY_KEY ||
        'X46npCfZgsMFwJNnLk3Yb9yUPW9x6SuD8ChZ6cVooSZMdtHHPEkwPkQoHUsNDLTanSEiG7y6shTXHePUZ5fr6i5J3R2cMvCRNGeq55jRXRxAeeSwA46ro5bTVSBiif86',
    JWT_ISSUER: process.env.JWT_ISSUER || 'HalcyonApi',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'HalcyonClient',
    NEXTAUTH_SECRET:
        process.env.NEXTAUTH_SECRET ||
        'YenEZqADi2YnfVCNWMFkcUpmr55ESFepmHgH3NSmPoBeSqf9Hs3Ui8vb6xdkCY9PNewqNxVQdjkqhCGaWeyri48FyDPU9HfKFjbHcfbyq4Fuqmk2suehduYJYzuPoSD8',
    NEXTAUTH_SESSION_MAXAGE: parseInt(
        process.env.NEXTAUTH_SESSION_MAXAGE || '3600'
    )
};
