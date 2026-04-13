function Reposloader() {
    return (
        
            <div className="space-y-4 w-full">
                {[1, 2, 3, 4, 5].map(i => (
                    <div
                        key={i}
                        className="p-5 border border-gray-700/30 rounded-lg space-y-3"
                    >
                        <div className="flex justify-between">
                            <div className="h-4 w-40 bg-gray-700/30 rounded" />
                            <div className="h-4 w-16 bg-gray-700/30 rounded" />
                        </div>

                        <div className="h-3 w-3/4 bg-gray-700/30 rounded" />

                        <div className="flex gap-4">
                            <div className="h-3 w-20 bg-gray-700/30 rounded" />
                            <div className="h-3 w-16 bg-gray-700/30 rounded" />
                            <div className="h-3 w-24 bg-gray-700/30 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        
    );
}

export default Reposloader