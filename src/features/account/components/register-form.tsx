import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/input';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/button';
import { ButtonGroup } from '@/components/button-group';
import { isInPast } from '@/lib/dates';

const schema = z
    .object({
        emailAddress: z
            .string({ message: 'Email Address is a required field' })
            .max(254, 'Password must be no more than 254 characters')
            .email('Email Address must be a valid email'),
        password: z
            .string({ message: 'Password is a required field' })
            .min(8, 'Password must be at least 8 characters')
            .max(50, 'Password must be no more than 50 characters'),
        confirmPassword: z.string({
            message: 'Confirm Password is a required field'
        }),
        firstName: z
            .string({ message: 'First Name is a required field' })
            .max(50, 'First Name must be no more than 50 characters'),
        lastName: z
            .string({ message: 'Last Name is a required field' })
            .max(50, 'Last Name must be no more than 50 characters'),
        dateOfBirth: z
            .string({
                message: 'Date of Birth is a required field'
            })
            .date('Date Of Birth must be a valid date')
            .refine(isInPast, { message: 'Date Of Birth must be in the past' })
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

export type RegisterFormValues = z.infer<typeof schema>;

type RegisterFormProps = {
    isLoading?: boolean;
    onSubmit: (values: RegisterFormValues) => void;
    className?: string;
};

export const RegisterForm = ({
    isLoading,
    onSubmit,
    className
}: RegisterFormProps) => {
    const { handleSubmit, control } = useForm<RegisterFormValues>({
        resolver: zodResolver(schema)
    });

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={className}
        >
            <Input
                control={control}
                label="Email Address"
                name="emailAddress"
                type="email"
                maxLength={254}
                autoComplete="username"
                required
                disabled={isLoading}
                className="mb-3"
            />
            <div className="sm:flex sm:gap-3">
                <Input
                    control={control}
                    label="Password"
                    name="password"
                    type="password"
                    maxLength={50}
                    autoComplete="new-password"
                    required
                    disabled={isLoading}
                    className="mb-3 sm:flex-1"
                />
                <Input
                    control={control}
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    maxLength={50}
                    autoComplete="new-password"
                    required
                    disabled={isLoading}
                    className="mb-3 sm:flex-1"
                />
            </div>
            <div className="sm:flex sm:gap-3">
                <Input
                    control={control}
                    label="First Name"
                    name="firstName"
                    type="text"
                    maxLength={50}
                    autoComplete="given-name"
                    required
                    disabled={isLoading}
                    className="mb-3 sm:flex-1"
                />
                <Input
                    control={control}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    maxLength={50}
                    autoComplete="family-name"
                    required
                    disabled={isLoading}
                    className="mb-3 sm:flex-1"
                />
            </div>
            <DatePicker
                control={control}
                label="Date Of Birth"
                name="dateOfBirth"
                required
                autoComplete={['bday-day', 'bday-month', 'bday-year']}
                disabled={isLoading}
                className="mb-5"
            />
            <ButtonGroup>
                <Button type="submit" loading={isLoading}>
                    Submit
                </Button>
            </ButtonGroup>
        </form>
    );
};