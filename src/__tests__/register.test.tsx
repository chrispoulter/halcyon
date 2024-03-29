import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { signIn } from 'next-auth/react';
import RegisterPage from '@/pages/register';
import { UpdatedResponse } from '@/features/common/commonTypes';
import { RegisterFormValues } from '@/features/account/RegisterForm/RegisterForm';
import { storeWrapper } from '@/utils/test-utils';

const fillRegisterForm = (values: RegisterFormValues) => {
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: values.emailAddress } });

    const passwordInput = screen.getAllByLabelText(/password/i);
    fireEvent.change(passwordInput[0], {
        target: { value: values.password }
    });
    fireEvent.change(passwordInput[1], {
        target: { value: values.confirmPassword }
    });

    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: values.firstName } });

    const lastNameInput = screen.getByLabelText(/last name/i);
    fireEvent.change(lastNameInput, { target: { value: values.lastName } });

    const [year, month, date] = values.dateOfBirth.split('-');

    const dobDateSelect = screen.getByLabelText(/date of birth date/i);
    fireEvent.change(dobDateSelect, {
        target: { value: date }
    });

    const dobMonthSelect = screen.getByLabelText(/date of birth month/i);
    fireEvent.change(dobMonthSelect, {
        target: { value: month }
    });

    const dobYearSelect = screen.getByLabelText(/date of birth year/i);
    fireEvent.change(dobYearSelect, {
        target: { value: year }
    });
};

describe('<RegisterPage />', () => {
    beforeEach(jest.clearAllMocks);
    beforeEach(fetchMock.resetMocks);

    it('should render a heading', () => {
        render(<RegisterPage />, { wrapper: storeWrapper });

        const heading = screen.getByRole('heading', {
            name: /register/i
        });

        expect(heading).toBeInTheDocument();
    });

    it('should register user when form submitted', async () => {
        const response: UpdatedResponse = { id: 1 };

        fetchMock.mockResponse(JSON.stringify(response), {
            headers: { 'content-type': 'application/json' }
        });

        render(<RegisterPage />, { wrapper: storeWrapper });

        fillRegisterForm({
            emailAddress: 'test@example.com',
            password: 'Testing123',
            confirmPassword: 'Testing123',
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '1970-01-01'
        });

        const registerButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(registerButton);

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(signIn).toHaveBeenCalledTimes(1);
    });
});
