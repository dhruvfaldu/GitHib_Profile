import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { GrLocation } from "react-icons/gr";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import Skeleton from "../components/loaders/Skeleton";
import useUserStore from "../store/useStore";
import Card from "../components/common/Card";
import { useUser } from "../services/githubHooks";
import Error from "../components/errors/error";

function Profile() {
  const { username } = useParams<{ username: string }>()

  const setUser = useUserStore((state) => state.setUser);

  const { data, isLoading, isError } = useUser(username || "")
  console.log(data);

  /**
   * @description: Update user data in the store when fetched data changes
   */
  const userdata = data;

  /**
   * @description: Effect to set user data in the store when fetched data changes
   * @param {User} userdata - The user data fetched from the API
   */
  useEffect(() => {
    if (userdata) {
      setUser(userdata)
    }
  }, [userdata, setUser])

  if (isError || userdata instanceof Error) {
    return <Error/>
  }

  if (!userdata) {
    return <Skeleton />
  }


  /**
   * @description: Function to determine the style of navigation links based on active state
   */
  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col sm:flex-row items-center gap-2 px-4 py-3 text-sm hover:text-white hover:border-b-2 hover:border-gray-600 ${isActive
      ? "border-b-2 border-[#57a5ff] text-secondarytext"
      : "text-text"
    }`

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="bg-primary">
          <div className="max-w-7xl min-h-screen mx-auto px-4 py-6 sm:py-8 ">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">

              {/* first section */}
              <aside className="shirk-0 w-full md:w-70">
                <div className="space-y-5">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img src={userdata?.avatar_url} loading="lazy" alt="profile photo" className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-2 border-border" />
                    <h1 className="text-lg sm:text-xl text-[#e2e7ee] font-bold mt-4">{userdata?.name}</h1>
                    <p className="text-sm text-text">{userdata?.email}</p>
                    <p className="text-sm mt-2 text-text italic">{userdata?.bio}</p>
                  </div>
                  <div className="border-t border-border"></div>
                  <div className="space-y-3 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start text-sm gap-2">
                      <GrLocation className="h-4 w-4 text-text" />
                      <span className="text-text">{userdata?.location}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-4 h-4 text-text shrink-0"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
                      <span className="text-text">{userdata?.company}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link2 w-4 h-4 text-text shrink-0"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" x2="16" y1="12" y2="12"></line></svg>
                      <a href={userdata?.blog} className="text-secondarytext">{userdata?.blog}</a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-4 h-4 text-text foreground shrink-0"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      <a href={`https://twitter.com/${userdata?.twitter_username}`} className="text-secondarytext">{userdata?.twitter_username}</a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-sm gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-4 h-4 text-text shrink-0"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                      <span className="text-text">{userdata?.created_at}</span>
                    </div>
                  </div>
                  <div className="border-t border-border"></div>
                  <a href={userdata?.html_url} className="inline-flex items-center justify-center gap-2 h-9 w-full rounded-md border border-border bg-primary px-4 py-2 text-white text-sm font-medium hover:bg-[#27313d]">
                    <FaArrowUpRightFromSquare />
                    View on GitHub
                  </a>
                </div>
              </aside>

              {/* second section */}
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <Card className="text-center hover:scale-[1.02]">
                    <NavLink to={`/user/${username}/repos`} className="flex flex-col items-center gap-1">
                      <IoBookOutline className="w-5 h-5 mb-1 mx-auto text-text" />
                      <div className="text-xl sm:text-2xl font-bold text-secondarytext font-mono">
                        {userdata?.public_repos}
                      </div>
                      <div className="text-xs text-text mt-1">Repositories</div>
                    </NavLink>
                  </Card>
                  <Card className="text-center hover:scale-[1.02] ">
                    <NavLink to={`/user/${username}/followers`} className="flex flex-col items-center gap-1">
                      <AiOutlineTeam className="w-5 h-5 mb-1 mx-auto text-text" />
                      <div className="text-xl sm:text-2xl font-bold text-secondarytext font-mono">
                        {userdata?.followers}
                      </div>
                      <div className="text-xs text-text mt-1">Followers</div>
                    </NavLink>
                  </Card>
                  <Card className="text-center hover:scale-[1.02]" >
                    <NavLink to={`/user/${username}/followers`} className="flex flex-col items-center gap-1">
                      <SlUserFollowing className="w-5 h-5 mb-1 mx-auto text-text" />
                      <div className="text-xl sm:text-2xl font-bold text-secondarytext font-mono">
                        {userdata?.following}
                      </div>
                      <div className="text-xs text-text mt-1">
                        Following
                      </div>
                    </NavLink>
                  </Card>
                  <Card className="text-center hover:scale-[1.02]" >
                    <FaRegFileAlt className="w-5 h-5 mb-1 mx-auto text-text" />
                    <div className="text-xl sm:text-2xl font-bold text-secondarytext font-mono">
                      {userdata?.public_gists}
                    </div>
                    <div className="text-xs text-text mt-1">
                      Public Gists
                    </div>
                  </Card>
                </div>
                {/* tabs */}
                <div className="border-b border-border">
                  <div className="flex gap-1">
                    <NavLink
                      to={`/user/${username}/repos`}
                      className={navStyle}
                    >
                      <IoBookOutline className="w-4 h-4" />
                      Repositories
                    </NavLink>

                    <NavLink
                      to={`/user/${username}/followers`}
                      className={navStyle}
                    >
                      <AiOutlineTeam className="w-4 h-4" />
                      Followers
                    </NavLink>

                    <NavLink
                      to={`/user/${username}/stats`}
                      className={navStyle}
                    >
                      <IoStatsChartSharp className="w-4 h-4" />
                      Stats
                    </NavLink>
                  </div>
                </div>
                {/* filters */}
                <div className="mt-6">
                  <div className="space-y-5">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
