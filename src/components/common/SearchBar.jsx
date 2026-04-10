import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!search.trim()) return;

        const username = search.trim();

        onSearch(username);      
        navigate(`/user/${username}`);
        setSearch("");             
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}
            className="w-full max-w-xl"
        >
            <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-text absolute left-4 w-5 h-5 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>               
                <input type="text" placeholder="Search a GitHub username..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-12 pl-12 pr-28 rounded-lg bg-bg border border-border text-[#e2e7ee]" />
                <button type="submit" disabled={!search.trim()} className={`absolute right-1.5 h-9 px-5 rounded-md text-sm font-medium ${search.trim()
                    ? "bg-blue-500 text-white"
                    : "bg-blue-400 text-secondary cursor-not-allowed"
                    }`}
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;