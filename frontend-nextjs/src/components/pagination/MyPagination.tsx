import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    totalPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function MyPagination({ totalPage, currentPage, onPageChange }: Props) {
    const pageNumbers = [];

    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 1, totalPage);

    for (let page = startPage; page <= endPage; page++) {
        pageNumbers.push(page);
    }

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (currentPage > 1) onPageChange(currentPage - 1);
                            }}
                        />
                    </PaginationItem>

                    {/* Pages: current ±1 */}
                    {pageNumbers.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Ellipsis */}
                    {endPage < totalPage - 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Last Page */}
                    {endPage < totalPage && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => onPageChange(totalPage)}
                            >
                                {totalPage}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                if (currentPage < totalPage) onPageChange(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
