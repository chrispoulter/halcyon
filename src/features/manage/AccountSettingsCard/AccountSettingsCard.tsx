import { GetProfileResponse } from '@/models/manage.types';
import { Card, CardBody, CardTitle } from '@/components/Card/Card';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { CardSkeleton } from '@/components/Skeleton/Skeleton';
import { ConfirmDeleteAccount } from '@/features/manage/ConfirmDeleteAccount/ConfirmDeleteAccount';

type AccountSettingsCardProps = {
    profile?: GetProfileResponse;
    isDeleting: boolean;
    onDelete: () => Promise<void>;
};

const AccountSettingsCardLoading = () => (
    <CardSkeleton>
        <div className="h-5 w-full bg-gray-100" />
    </CardSkeleton>
);

export const AccountSettingsCard = ({
    profile,
    isDeleting,
    onDelete
}: AccountSettingsCardProps) => {
    if (!profile) {
        return <AccountSettingsCardLoading />;
    }

    return (
        <Card>
            <CardTitle>Settings</CardTitle>
            <CardBody>
                Once you delete your account all of your data and settings will
                be removed. Please be certain.
            </CardBody>
            <ButtonGroup align="left">
                <ConfirmDeleteAccount
                    onConfirm={onDelete}
                    loading={isDeleting}
                />
            </ButtonGroup>
        </Card>
    );
};
