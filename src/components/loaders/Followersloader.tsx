function Followersloader() {
    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col items-center rounded-lg border border-border bg-secondary p-5 animate-pulse"
                >
                    <div className="w-10 sm:w-16 h-16 rounded-full bg-[#2a2f36]" />

                    <div className="mt-3 h-3 w-14 sm:w-20 bg-[#2a2f36] rounded" />

                    <div className="mt-3 h-7 w-16 sm:w-24 bg-[#2a2f36] rounded-md" />
                </div>
            ))}
        </div>
    )
}

export default Followersloader