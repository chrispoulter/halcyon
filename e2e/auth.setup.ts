import { Page, expect, test as setup } from '@playwright/test';
import { randomUUID } from 'crypto';
import { RegisterFormValues } from '@/features/account/components/register-form';

const userFile = 'playwright/.auth/user.json';

const fillRegisterForm = async (
    page: Page,
    values: Omit<RegisterFormValues, 'confirmPassword'>
) => {
    await page.getByLabel('Email Address').fill(values.emailAddress);
    await page.getByLabel('Password', { exact: true }).fill(values.password);
    await page.getByLabel('Confirm Password').fill(values.password);
    await page.getByLabel('First Name').fill(values.firstName);
    await page.getByLabel('Last Name').fill(values.lastName);

    const [year, month, date] = values.dateOfBirth.split('-');
    await page.getByLabel('Date Of Birth Date').selectOption(date);
    await page.getByLabel('Date Of Birth Month').selectOption(month);
    await page.getByLabel('Date Of Birth Year').selectOption(year);
};

setup('register a new user', async ({ page }) => {
    await page.goto('/account/register');

    await fillRegisterForm(page, {
        emailAddress: `${randomUUID()}@example.com`,
        password: randomUUID(),
        firstName: 'Test',
        lastName: 'User',
        dateOfBirth: '1970-01-01'
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    await page.waitForURL('/');

    await expect(
        page.getByRole('button', { name: 'T', exact: true })
    ).toBeVisible();

    await page.context().storageState({ path: userFile });
});
