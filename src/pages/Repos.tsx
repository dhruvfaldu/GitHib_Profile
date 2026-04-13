import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react"
import RepoCard from "../components/common/RepoCard";
import useUserStore from "../store/useStore";
import Pagination from "../components/common/Pagination";
import Reposloader from "../components/loaders/Reposloader";
import { userRepos } from "../services/githubHooks";
import NotFound from "./NotFound";
import { User } from "../types/github";
import { Repo } from "../types/github";

function Repos() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [maxpages, setMaxPages] = useState(1);
    const [language, setLanguage] = useState("all");
    const [stars, setStars] = useState("Most Stars");
    const [all, setAll] = useState("All");

    const user = useUserStore((state: unknown) => {
        if (typeof state === "object" && state !== null && "user" in state) {
            return (state as { user: User }).user;
        }
        return null;
    });

    const { data, isLoading, isError } = userRepos(user, page);
    console.log(data);


    const repos = data as Repo[] || [];

    useEffect(() => {
        if (repos.length >= 0 && repos.length < 10) {
            setMaxPages(page);
        }
    }, [data])

    let filtered = [...repos];

    if (search) {
        filtered = filtered.filter((repo) =>
            repo.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (language !== "all") {
        filtered = filtered.filter(
            (repo) => repo.language?.toLowerCase() === language
        );
    }

    if (all === "Sources") {
        filtered = filtered.filter((repo) => !repo.fork);
    }

    if (all === "Forks") {
        filtered = filtered.filter((repo) => repo.fork);
    }

    if (all === "Archived") {
        filtered = filtered.filter((repo) => repo.archived);
    }

    if (stars === "Most Stars") {
        filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    if (stars === "Most Forks") {
        filtered.sort((a, b) => b.forks_count - a.forks_count);
    }

    if (stars === "Recently Updated") {
        filtered.sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
    }

    if (stars === "Name A-Z") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (isError) {
        return <NotFound />
    }

    return (
        <>
            {isLoading ? (
                <Reposloader />
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row gap-3 overflow-x-auto">
                        {/* search */}
                        <div className="flex-1  relative">
                            <IoSearchOutline className="absolute top-1/2 left-3 h-4 w-4 text-text -translate-y-1/2" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search repositories..." className="h-9 w-full font-medium rounded-md border border-border bg-bg pl-9 pr-3 text-sm text-text" />
                        </div>
                        {/* language */}
                        <Select.Root value={language} onValueChange={setLanguage}>
                            <Select.Trigger className="flex items-center justify-between h-9 px-3 w-full sm:w-44 rounded-md border border-[#30363d] bg-bg text-[#c9d1d9] text-sm hover:border-[#8b949e]">
                                <Select.Value placeholder="All Languages" />
                                <Select.Icon>
                                    <ChevronDownIcon className="text-[#8b949e]" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content
                                    position="popper"
                                    side="bottom"
                                    align="start"
                                    sideOffset={5}
                                    avoidCollisions={false}
                                    className="z-50 w-full sm:w-44 bg-bg border border-[#30363d] rounded-md shadow-lg"
                                >
                                    <Select.Viewport className="p-1">
                                        <Select.Item value="all" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>All Languages</Select.ItemText>
                                            <Select.ItemIndicator>
                                                <CheckIcon className="text-[#58a6ff]" />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="c" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>C</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="cpp" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>C++</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="javascript" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>JavaScript</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="python" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Python</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="shell" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Shell</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        {/* star short */}
                        <Select.Root value={stars} onValueChange={setStars}>
                            <Select.Trigger className="flex items-center justify-between h-9 px-3 w-full sm:w-44 rounded-md border border-[#30363d] bg-bg text-[#c9d1d9] text-sm hover:border-[#8b949e]">
                                <Select.Value placeholder="Most Stars" />
                                <Select.Icon>
                                    <ChevronDownIcon className="text-[#8b949e]" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content
                                    position="popper"
                                    side="bottom"
                                    align="start"
                                    sideOffset={5}
                                    avoidCollisions={false}
                                    className="z-50 w-full sm:w-44 bg-bg border border-[#30363d] rounded-md shadow-lg"
                                >
                                    <Select.Viewport className="p-1">
                                        <Select.Item value="Most Stars" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Most Stars</Select.ItemText>
                                            <Select.ItemIndicator>
                                                <CheckIcon className="text-[#58a6ff]" />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="Most Forks" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Most Forks</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="Recently Updated" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Recently Updated</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="Name A-Z" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Name A-Z</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        {/* All sources, forks */}
                        <Select.Root value={all} onValueChange={setAll}>
                            <Select.Trigger className="flex items-center justify-between h-9 px-3 w-full sm:w-30 rounded-md border border-[#30363d] bg-bg text-[#c9d1d9] text-sm hover:border-[#8b949e]">
                                <Select.Value placeholder="All" />
                                <Select.Icon>
                                    <ChevronDownIcon className="text-[#8b949e]" />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content
                                    position="popper"
                                    side="bottom"
                                    align="start"
                                    sideOffset={5}
                                    avoidCollisions={false}
                                    className="z-50 w-full sm:w-30 bg-bg border border-[#30363d] rounded-md shadow-lg"
                                >
                                    <Select.Viewport className="p-1">
                                        <Select.Item value="All" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>All</Select.ItemText>
                                            <Select.ItemIndicator>
                                                <CheckIcon className="text-[#58a6ff]" />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="Sources" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Sources</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="Forks" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Forks</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="Archived" className="flex justify-between px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-md">
                                            <Select.ItemText>Archived</Select.ItemText>
                                            <Select.ItemIndicator><CheckIcon /></Select.ItemIndicator>
                                        </Select.Item>
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>

                    <div className="space-y-4">
                        {filtered.map((repo, index) => <RepoCard key={index} repo={repo} />)}
                    </div>

                    <Pagination page={page} setPage={setPage} hasNextPage={data?.length == 10} maxpages={page} />
                </>
            )}
        </>
    );
}

export default Repos