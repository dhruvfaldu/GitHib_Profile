import { RiGithubLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useState } from "react";

function Navbar() {
    const [search, setSearch] = useState<string>("")
    const debounced = useDebounce(search)
    const navigate = useNavigate()

    const handleSubmit = (): void => {
        if (debounced) {
            navigate(`/user/${debounced}`)
        }
    }

    return (
        <>
            <div className="bg-primary">
                <nav className="h-14 bg-[#161b22cc] border-b border-border font-medium sticky top-0 z-50">
                    <div className="flex items-center justify-between gap-2 sm:gap-4 px-3sm:px-4 max-w-7xl h-full mx-auto">
                        <a className="flex items-center text-secondarytext gap-2.5 shrink-0" href="/">
                            <RiGithubLine className="w-5 h-5 sm:w-6 sm:h-6  rounded-md" />
                            <span className="text-sm sm:text-lg font-semibold text-[#e2e7ee] line-clamp-1">GitHub Explorer</span>
                        </a>
                        <form className="flex-1 max-w-35 sm:max-w-sm md:max-w-md">
                            <div className="relative text-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 "><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 w-full rounded-md border border-border bg-[#252a31] pl-9 pr-3 text-xs sm:text-sm placeholder:text-text" placeholder="Search username.." />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleSubmit}></button>
                            </div>
                        </form>
                        <div className="shrink-0 hidden sm:block">
                            <a href="https://github.com" className="text-text text-xs cursor-pointer">github.com</a>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

export default Navbar
