type Props = {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
}

function Pagination({ page, setPage, hasNextPage }: Props) {
    return (
        <div className="flex items-center justify-center gap-2 mt-5">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`border border-border text-text px-3 py-2 bg-secondary rounded-xl cursor-pointer hover:border-blue-400 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Previous
            </button>
            <p className="text-text">Page {page}</p>
            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNextPage}
                className={`border border-border text-text px-3 py-2 bg-secondary rounded-xl cursor-pointer hover:border-blue-400 ${!hasNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination