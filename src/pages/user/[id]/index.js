import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import {
    Spinner,
    TextInput,
    DateInput,
    CheckboxGroupInput,
    Button,
    Meta
} from '../../../components';
import {
    useGetUserQuery,
    useUpdateUserMutation,
    useLockUserMutation,
    useUnlockUserMutation,
    useDeleteUserMutation,
    showToast,
    showModal
} from '../../../redux';
import { ROLE_OPTIONS, USER_ADMINISTRATOR_ROLES } from '../../../utils/auth';

const UpdateUserPage = () => {
    const router = useRouter();

    const { id } = router.query;

    const dispatch = useDispatch();

    const {
        isFetching,
        refetch,
        data: user
    } = useGetUserQuery(id, { skip: !router.isReady });

    const [updateUser] = useUpdateUserMutation();

    const [lockUser, { isLoading: isLocking }] = useLockUserMutation();

    const [unlockUser, { isLoading: isUnlocking }] = useUnlockUserMutation();

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    if (isFetching || !router.isReady) {
        return <Spinner />;
    }

    if (!user?.data) {
        return (
            <Container>
                <Alert variant="info">User could not be found.</Alert>
            </Container>
        );
    }

    const onSubmit = async variables => {
        const { data: result } = await updateUser({
            id,
            body: variables
        });

        if (result) {
            dispatch(
                showToast({
                    variant: 'success',
                    message: result.message
                })
            );

            router.push('/user');
        }
    };

    const onLockUser = () =>
        dispatch(
            showModal({
                title: 'Confirm',
                body: (
                    <>
                        Are you sure you want to lock{' '}
                        <strong>
                            {user.data.firstName} {user.data.lastName}
                        </strong>
                        ?
                    </>
                ),
                onOk: async () => {
                    const { data: result } = await lockUser(id);

                    if (result) {
                        dispatch(
                            showToast({
                                variant: 'success',
                                message: result.message
                            })
                        );

                        refetch();
                    }
                }
            })
        );

    const onUnlockUser = () =>
        dispatch(
            showModal({
                title: 'Confirm',
                body: (
                    <>
                        Are you sure you want to unlock{' '}
                        <strong>
                            {user.data.firstName} {user.data.lastName}
                        </strong>
                        ?
                    </>
                ),
                onOk: async () => {
                    const { data: result } = await unlockUser(id);

                    if (result) {
                        dispatch(
                            showToast({
                                variant: 'success',
                                message: result.message
                            })
                        );

                        refetch();
                    }
                }
            })
        );

    const onDeleteUser = () =>
        dispatch(
            showModal({
                title: 'Confirm',
                body: (
                    <>
                        Are you sure you want to delete{' '}
                        <strong>
                            {user.data.firstName} {user.data.lastName}
                        </strong>
                        ?
                    </>
                ),
                onOk: async () => {
                    const { data: result } = await deleteUser(id);

                    if (result) {
                        dispatch(
                            showToast({
                                variant: 'success',
                                message: result.message
                            })
                        );

                        router.push('/user');
                    }
                }
            })
        );

    return (
        <Container>
            <Meta title="Update User" />

            <h1>
                User
                <br />
                <small className="text-muted">Update</small>
            </h1>
            <hr />

            <Formik
                enableReinitialize={true}
                initialValues={user.data}
                validationSchema={Yup.object({
                    emailAddress: Yup.string()
                        .label('Email Address')
                        .max(254)
                        .email()
                        .required(),
                    firstName: Yup.string()
                        .label('First Name')
                        .max(50)
                        .required(),
                    lastName: Yup.string()
                        .label('Last Name')
                        .max(50)
                        .required(),
                    dateOfBirth: Yup.string().label('Date Of Birth').required()
                })}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form noValidate>
                        <TextInput
                            name="emailAddress"
                            type="email"
                            label="Email Address"
                            required
                            maxLength={254}
                            autoComplete="username"
                        />

                        <TextInput
                            name="firstName"
                            type="text"
                            label="First Name"
                            required
                            maxLength={50}
                        />

                        <TextInput
                            name="lastName"
                            type="text"
                            label="Last Name"
                            required
                            maxLength={50}
                        />

                        <DateInput
                            name="dateOfBirth"
                            type="date"
                            label="Date Of Birth"
                            required
                        />

                        <CheckboxGroupInput
                            name="roles"
                            label="Roles"
                            options={ROLE_OPTIONS}
                        />

                        <div className="mb-3 text-end">
                            <Link href="/user" passHref>
                                <Button variant="secondary" className="me-1">
                                    Cancel
                                </Button>
                            </Link>
                            {user.data.isLockedOut ? (
                                <Button
                                    variant="warning"
                                    className="me-1"
                                    loading={isUnlocking}
                                    disabled={
                                        isLocking || isDeleting || isSubmitting
                                    }
                                    onClick={onUnlockUser}
                                >
                                    Unlock
                                </Button>
                            ) : (
                                <Button
                                    variant="warning"
                                    className="me-1"
                                    loading={isLocking}
                                    disabled={
                                        isUnlocking ||
                                        isDeleting ||
                                        isSubmitting
                                    }
                                    onClick={onLockUser}
                                >
                                    Lock
                                </Button>
                            )}
                            <Button
                                variant="danger"
                                className="me-1"
                                loading={isDeleting}
                                disabled={
                                    isLocking || isUnlocking || isSubmitting
                                }
                                onClick={onDeleteUser}
                            >
                                Delete
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                loading={isSubmitting}
                                disabled={
                                    isLocking || isUnlocking || isDeleting
                                }
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

UpdateUserPage.auth = true;
UpdateUserPage.requiredRoles = USER_ADMINISTRATOR_ROLES;

export default UpdateUserPage;
