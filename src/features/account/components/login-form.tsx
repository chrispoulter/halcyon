import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { ButtonGroup } from '@/components/button-group';

const schema = z.object({
    emailAddress: z
        .string({ message: 'Email Address is a required field' })
        .min(1, 'Email Address is a required field')
        .email('Email Address must be a valid email'),
    password: z
        .string({ message: 'Password is a required field' })
        .min(1, 'Password is a required field')
});

export type LoginFormValues = z.infer<typeof schema>;

type LoginFormProps = {
    onSubmit: (values: LoginFormValues) => void;
    className?: string;
};

export const LoginForm = ({ onSubmit, className }: LoginFormProps) => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<LoginFormValues>({
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
                disabled={isSubmitting}
                className="mb-3"
            />
            <Input
                control={control}
                label="Password"
                name="password"
                type="password"
                maxLength={50}
                autoComplete="current-password"
                required
                disabled={isSubmitting}
                className="mb-5"
            />
            <ButtonGroup>
                <Button type="submit" loading={isSubmitting}>
                    Submit
                </Button>
            </ButtonGroup>
        </form>
    );
};
