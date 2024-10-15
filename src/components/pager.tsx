import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext
} from '@/components/ui/pagination';
import { ButtonGroupSkeleton } from '@/components/button-group-skeleton';

type PagerProps = {
    isLoading?: boolean;
    isFetching?: boolean;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onNextPage: () => void;
    onPreviousPage: () => void;
};

export const Pager = ({
    isLoading,
    isFetching,
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage
}: PagerProps) => {
    if (isLoading) {
        return <ButtonGroupSkeleton />;
    }

    if (!hasNextPage && !hasPreviousPage) {
        return null;
    }

    return (
        <Pagination>
            <PaginationContent>
                {hasPreviousPage && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={onPreviousPage}
                            aria-disabled={isFetching}
                        />
                    </PaginationItem>
                )}
                {hasNextPage && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={onNextPage}
                            aria-disabled={isFetching}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};
