import { Link } from "react-router-dom"
import { RiGithubLine } from "react-icons/ri";
import SearchBar from "../components/common/SearchBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import { User } from "../types/github";


function Home() {
  const [recent, setRecent] = useLocalStorage("recentSearches", []);
  const navigate = useNavigate();
  const profile_box = [
    {
      img_url: "https://github.com/torvalds.png",
      name: "torvalds",
      disc: "Creator of Linux and Git",
    },
    {
      img_url: "https://github.com/gaearon.png",
      name: "gaearon",
      disc: "React Core Team",
    },
    {
      img_url: "https://github.com/sindresorhus.png",
      name: "sindresorhus",
      disc: "Open Source Developer",
    },
    {
      img_url: "https://github.com/tj.png",
      name: "tj",
      disc: "Creator of Express",
    },
    {
      img_url: "https://github.com/yyx990803.png",
      name: "yyx990803",
      disc: "Create of Vue.js",
    },
    {
      img_url: "https://github.com/addyosmani.png",
      name: "addyosmani",
      disc: "Engineering Manager, Google",
    },
  ]

  const handleSearch = (username: string): void => {
    const filtered = recent.filter((item: string): boolean => item !== username);
    const updated = [username, ...filtered].slice(0, 8);
    setRecent(updated);
  };

  const removeUser = (username: string): void => {
    const updated = recent.filter((item: string): boolean => item !== username);
    setRecent(updated);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-primary">
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
          <div className="text-center mb-10">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
              <RiGithubLine className="w-10 h-10 sm:w-12 sm:h-12 text-secondarytext rounded-md" />
            </div>
            <h1 className="text-3xlsm:text-4xl md:text-5xl font-bold text-[#e2e7ee] tracking-tight-[-0.025em]">GitHub Explorer</h1>
            <p className="text-base sm:text-lg text-text mt-3">Search any GitHub profile</p>
          </div>
          <SearchBar onSearch={handleSearch} />
          <div className="mt-8 w-full max-w-xl">
            <h3 className="text-xs font-medium tracking-wider uppercase text-text mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {recent.map((user: string, index: number) => (
                <button
                  key={index}
                  onClick={() => navigate(`/user/${user}`)}
                  className="text-sm text-[#e2e7ee] cursor-pointer hover:bg-[#161b22] transition-colors"
                >
                  <Card className="flex items-center gap-2 h-6 text-left px-3 py-4 border rounded-full" onClick={()=>{}}>
                    <img
                      src={`https://github.com/${user}.png`}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{user}</span>
                    <IoClose onClick={(e) => {
                      e.stopPropagation();
                      removeUser(user)
                    }} className="w-3.5 h-3.5 cursor-pointer text-text opacity-0 hover:opacity-100 transition-opacity hover:text-red-300" />
                  </Card>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 w-full max-w-2xl">
            <h3 className="mb-4 text-xs text-text font-medium uppercase tracking-wider">Popular Developers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {profile_box.map((profile, index) => (
                <Link to={`/user/${profile.name}`} key={index} >
                  <Card className="flex items-center gap-3 cursor-pointer h-20 text-left hover:bg-[#161b22]" onClick={()=>{}}>
                    <img src={profile.img_url} alt="profile image" className="w-10 h-10 rounded-full border border-border" />
                    <div>
                      <p className="text-sm font-medium text-[#e2e7ee]">{profile.name}</p>
                      <p className="text-xs text-text">{profile.disc}</p>
                    </div>
                  </Card >
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
