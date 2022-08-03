# Halcyon

A web application template.

**Technologies used:**

-   React
    [https://reactjs.org](https://reactjs.org)
-   Next.js
    [https://nextjs.org/](https://nextjs.org/)
-   PostgreSQL
    [https://www.postgresql.org/](https://www.postgresql.org/)

#### Custom Settings

Create a `.env` file in the web project directory.

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=example
DB_DATABASE=halcyon
DB_SSL=false

JWT_SECURITY_KEY=change-me-1234567890
JWT_ISSUER=HalcyonApi
JWT_AUDIENCE=HalcyonClient
JWT_EXPIRES_IN=3600

EMAIL_SMTP_SERVER=localhost
EMAIL_SMTP_PORT=1025
EMAIL_SMTP_USERNAME=
EMAIL_SMTP_PASSWORD=
EMAIL_NO_REPLY_ADDRESS=noreply@chrispoulter.com

SEED_EMAIL_ADDRESS=
SEED_PASSWORD=
```
