import { Formik, Form, Field } from 'formik';
import { InferType, object, ref, string } from 'yup';
import { GetProfileResponse } from '@/features/manage/manageTypes';
import { Input } from '@/components/Form/Input';
import { Button } from '@/components/Button/Button';
import { ButtonGroup } from '@/components/Button/ButtonGroup';
import { FormSkeleton } from '@/components/Form/FormSkeleton';
import { InputSkeleton } from '@/components/Form/InputSkeleton';

const schema = object({
    currentPassword: string().label('Current Password').required(),
    newPassword: string().label('New Password').min(8).max(50).required(),
    confirmNewPassword: string()
        .label('Confirm New Password')
        .required()
        .oneOf([ref('newPassword')], 'Passwords do not match')
});

export type ChangePasswordFormValues = InferType<typeof schema>;

const initialValues = schema.getDefault() as any;

type ChangePasswordFormProps = {
    profile?: GetProfileResponse;
    options?: JSX.Element;
    onSubmit: (values: ChangePasswordFormValues) => void;
    className?: string;
};

type ChangePasswordFormInternalProps = Omit<ChangePasswordFormProps, 'profile'>;

const ChangePasswordFormLoading = () => (
    <FormSkeleton>
        <InputSkeleton className="mb-3" />
        <div className="sm:flex sm:gap-3">
            <InputSkeleton className="mb-3 sm:flex-1" />
            <InputSkeleton className="mb-5 sm:flex-1" />
        </div>
    </FormSkeleton>
);

const ChangePasswordFormInternal = ({
    onSubmit,
    options,
    className
}: ChangePasswordFormInternalProps) => (
    <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
        enableReinitialize
    >
        {({ isSubmitting }) => (
            <Form noValidate className={className}>
                <Field type="hidden" name="version" />
                <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    maxLength={50}
                    autoComplete="current-password"
                    required
                    disabled={isSubmitting}
                    className="mb-3"
                />
                <div className="sm:flex sm:gap-3">
                    <Input
                        label="New Password"
                        name="newPassword"
                        type="password"
                        maxLength={50}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting}
                        className="mb-5 sm:flex-1"
                    />
                    <Input
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        maxLength={50}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting}
                        className="mb-5 sm:flex-1"
                    />
                </div>
                <ButtonGroup>
                    {options}
                    <Button type="submit" loading={isSubmitting}>
                        Submit
                    </Button>
                </ButtonGroup>
            </Form>
        )}
    </Formik>
);

export const ChangePasswordForm = ({
    profile,
    ...props
}: ChangePasswordFormProps) => {
    if (!profile) {
        return <ChangePasswordFormLoading />;
    }

    return <ChangePasswordFormInternal {...props} />;
};
