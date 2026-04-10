type Props = {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
    maxpages: number;
}

function Pagination({ page, setPage, hasNextPage, maxpages }: Props) {

    const getpage = () => {
        let pages: number[] = [];
        for (let i = page - 2; i <= page + 2; i++) {
            if (i >= 1 && i <= maxpages) {
                pages.push(i);
            }
        }
        return pages;
    }

    const pages: number[] = getpage();

    return (
        <div className="flex items-center justify-center gap-2 mt-5">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`border border-border text-text px-3 py-2 bg-secondary rounded-xl cursor-pointer hover:border-blue-400 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Previous
            </button>
            {/* <p className="text-text">Page {page}</p> */}
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    disabled={p > maxpages} // 👈 safety
                    className={`px-3 py-2 rounded-lg border 
                    ${p === page
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-secondary text-text border-border hover:border-blue-400"}
                    ${p > maxpages ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {p}
                </button>
            ))}
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