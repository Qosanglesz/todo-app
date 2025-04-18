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

export default function MyPagination({totalPage, currentPage, onPageChange}: Props) {
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {currentPage > 1 ? (<PaginationPrevious onClick={()=> {
                            onPageChange(currentPage-1)
                        }}/>): (<PaginationPrevious/>)}
                    </PaginationItem>
                    {new Array(totalPage).fill(0).map((_, page) => {
                        page += 1
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={()=> {
                                        onPageChange(page)
                                    }}
                                >{page}</PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    {currentPage < totalPage ? (<PaginationNext onClick={()=> {
                        onPageChange(currentPage+1)
                    }}/>): (<PaginationNext/>)}
                </PaginationContent>
            </Pagination>

        </div>
    )
}