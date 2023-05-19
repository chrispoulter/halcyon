import { Button } from '@/components/Button/Button';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { ButtonGroupSkeleton } from '@/components/Skeleton/Skeleton';

type PagerProps = {
    isLoading?: boolean;
    isFetching?: boolean;
    hasMore?: boolean;
    onLoadMore: () => void;
};

export const Pager = ({
    isLoading,
    isFetching,
    hasMore,
    onLoadMore
}: PagerProps) => {
    if (isLoading) {
        return <ButtonGroupSkeleton />;
    }

    if (!hasMore) {
        return null;
    }

    return (
        <ButtonGroup>
            <Button
                variant="secondary"
                loading={isFetching}
                onClick={onLoadMore}
            >
                Load More...
            </Button>
        </ButtonGroup>
    );
};