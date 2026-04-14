import { useEffect, useState } from "react"
import useUserStore from "../store/useStore";
import Followersloader from "../components/loaders/Followersloader";
import Pagination from "../components/common/Pagination";
import Card from "../components/common/Card";
import { userFollowers } from "../services/githubHooks";
import NotFound from "./NotFound";
import { User } from "../types/github";
function Followers() {

    const [activeTab, setActiveTab] = useState("followers");
    const [page, setPage] = useState<number>(1);
    const [maxpages, setMaxPages] = useState<number>(1);

    const user = useUserStore((state) => state.user);

    const username = user?.login || "";

    const { data, isLoading, isError } = userFollowers(username, activeTab, page)

    /**
     * @description: Extract followers or following data based on active tab
     * @param {User[]} data - Array of user data containing followers and following information
     * @returns {User[]} - Array of users based on active tab (followers or following)
     */
    const users = data || []
    console.log(users);
    

    /**
     * @description: Calculate total pages based on followers count and items per page
     * @param {number} followers - Total number of followers
     * @returns {number}
     */
    const followers = users.map((user: User) => user)


    /**
     * @description: Update max pages whenever user data changes
     * @param {User} user - User data containing followers count
     * @returns {void}
     * @sideEffects: Updates maxpages state based on followers count
     */
    useEffect(() => {
        if (user) {
            const perPage = 10;
            const totalPages = Math.ceil(user.public_repos / perPage);

            setMaxPages(totalPages);
        }
    }, [user]);


    if (isError) {
        return <NotFound />
    }

    return (
        <>
            {isLoading ? (
                <Followersloader />
            ) : (
                <div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setActiveTab("followers")
                                setPage(1)
                            }}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${activeTab === "followers"
                                ? "bg-secondarytext text-primary"
                                : "border border-border bg-[#161b22] text-text"
                                }`}
                        >
                            Followers ({user?.followers})
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("following")
                                setPage(1)
                            }}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${activeTab === "following"
                                ? "bg-secondarytext text-primary"
                                : "border border-border bg-[#161b22] text-text"
                                }`}
                        >
                            Following ({user?.following})
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {users.map((u) => (
                            <Card key={u.id} className="flex flex-col items-center text-center hover:scale-[1.02]" >
                                <img src={u.avatar_url} className="w-16 h-16 rounded-full border-2 border-border" />
                                <h3 className="mt-3 text-secondarytext font-semibold text-sm">{u.login}</h3>
                                <a href={u.html_url} target="_blank" className="mt-3 text-xs border border-border bg-primary text-white px-3 py-1 rounded-md">
                                    View Profile
                                </a>
                            </Card>
                        ))}
                    </div>

                    <Pagination page={page} setPage={setPage} hasNextPage={users.length > 0} maxpages={maxpages} />
                </div>
            )}
        </>
    )
}

export default Followers