type Props = {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
    maxpages: number;
}

/**
 * @description: A component for rendering pagination controls
 * @param {number} page - The current page number
 * @param {function} setPage - A function to update the current page number
 * @param {boolean} hasNextPage - A boolean indicating if there is a next page available
 * @param {number} maxpages - The total number of pages available
 */
function Pagination({ page, setPage, hasNextPage, maxpages }: Props) {

    /**
     * @description: Generate an array of page numbers to display in the pagination component, including ellipses for skipped pages
     * @returns {number[]} - An array of page numbers
     */
    const getpage = () => {
        let pages: (number|string)[] = [];
        pages.push(1);

        const start = Math.max(2, page - 1);
        const end = Math.min(maxpages - 1, page + 1);

        if (start > 2) {
            pages.push("..."as string);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (end < maxpages - 1) {
            pages.push("..." as string);
        }
        if (maxpages > 1) {
            pages.push(maxpages);
        }
        return pages;
    };

    /**
     * @description: Render pagination buttons with appropriate styles and functionality based on the current page and total pages
     */
    const pages: (number|string)[] = getpage();

    return (
        <div className="flex items-center justify-center gap-2 mt-5">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`border border-border text-text px-3 py-2 bg-secondary rounded-xl hover:border-blue-400 ${page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                Previous
            </button>
            {pages.map((p,id) => (
                <button
                    key={id}
                    onClick={() => typeof p === "number" && setPage(p)}
                    disabled={typeof p === "string" } 
                    className={`px-3 py-2 rounded-lg border 
                    ${p === page
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-secondary text-text border-border hover:border-blue-400"}
                    ${typeof p === "string"  ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNextPage}
                className={`border border-border text-text px-3 py-2 bg-secondary rounded-xl hover:border-blue-400 ${!hasNextPage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination