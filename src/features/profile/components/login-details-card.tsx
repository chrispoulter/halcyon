import { Card, CardBody, CardTitle } from '@/components/card';
import { CardSkeleton } from '@/components/card-skeleton';
import { ButtonGroup } from '@/components/button-group';
import { ButtonLink } from '@/components/button-link';
import { GetProfileResponse } from '@/features/profile/profile-types';

type LoginDetailsCardProps = {
    profile?: GetProfileResponse;
    className?: string;
};

const LoginDetailsCardLoading = ({ className }: LoginDetailsCardProps) => (
    <CardSkeleton className={className}>
        <div className="mb-1 h-5 w-full bg-gray-100" />
        <div className="mb-3 h-5 w-7/12 bg-gray-100" />
    </CardSkeleton>
);

export const LoginDetailsCard = ({
    profile,
    className
}: LoginDetailsCardProps) => {
    if (!profile) {
        return <LoginDetailsCardLoading className={className} />;
    }

    return (
        <Card className={className}>
            <CardTitle>Login Details</CardTitle>
            <CardBody>
                Choose a strong password and don&apos;t reuse it for other
                accounts. For security reasons, change your password on a
                regular basis.
            </CardBody>
            <ButtonGroup align="left">
                <ButtonLink href="/profile/change-password" variant="primary">
                    Change Password
                </ButtonLink>
            </ButtonGroup>
        </Card>
    );
};
