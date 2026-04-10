function skeleton() {
    return (
        <>
            <div className="w-full h-full mx-auto px-4 sm:py-8 bg-primary animate-pulse">
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8">

                    {/* LEFT SIDEBAR */}
                    <aside className="w-70 shrink-0 space-y-6">

                        <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
                            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gray-700/30" />
                            <div className="h-5 w-32 sm:w-40 bg-gray-700/30 rounded" />
                            <div className="h-3 w-20 sm:w-24 bg-gray-700/30 rounded" />
                            <div className="h-3 w-40 sm:w-56 bg-gray-700/30 rounded" />
                        </div>

                        <div className="border-t border-gray-700/30" />

                        {/* info rows */}
                        <div className="space-y-4">
                            <div className="h-4 w-28 sm:w-32 bg-gray-700/30 rounded md:mx-0" />
                            <div className="h-4 w-32 sm:w-40 bg-gray-700/30 rounded md:mx-0" />
                            <div className="h-4 w-28 sm:w-36 bg-gray-700/30 rounded md:mx-0"/>
                            <div className="h-4 w-36 sm:w-44 bg-gray-700/30 rounded md:mx-0"/>
                        </div>

                        <div className="border-t border-gray-700/30" />

                        <div className="h-9 w-full bg-gray-700/30 rounded-md" />
                    </aside>

                    {/* RIGHT CONTENT */}
                    <div className="flex-1 space-y-6">

                        {/* STATS GRID */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-20 sm:h-24 bg-gray-700/30 rounded-lg" />
                            ))}
                        </div>

                        {/* TABS */}
                        <div className="h-10 w-full bg-gray-700/30 rounded-md" />

                        {/* FILTER BAR */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="h-9 flex-1 bg-gray-700/30 rounded-md" />
                            <div className="h-9 w-full sm:w-44 bg-gray-700/30 rounded-md" />
                            <div className="h-9 w-full sm:w-44 bg-gray-700/30 rounded-md" />
                            <div className="h-9 w-full sm:w-30 bg-gray-700/30 rounded-md" />
                        </div>

                        {/* REPOSITORY LIST */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div
                                    key={i}
                                    className="p-5 border border-gray-700/30 rounded-lg space-y-3"
                                >
                                    <div className="flex justify-between">
                                        <div className="h-4 w-32 sm:w-40 bg-gray-700/30 rounded" />
                                        <div className="h-4 w-12 sm:w-16 bg-gray-700/30 rounded" />
                                    </div>

                                    <div className="h-3 w-full sm:w-3/4 bg-gray-700/30 rounded" />

                                    <div className="flex gap-4">
                                        <div className="h-3 w-16 sm:w-20 bg-gray-700/30 rounded" />
                                        <div className="h-3 w-12 sm:w-16 bg-gray-700/30 rounded" />
                                        <div className="h-3 w-20 sm:w-24 bg-gray-700/30 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default skeleton
