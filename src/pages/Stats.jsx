import Card from "../components/common/Card"
import { FaCode, FaRegStar } from "react-icons/fa6";
import { LuTrendingUp } from "react-icons/lu";
import LanguageChart from "../components/Charts/LanguageChart";
import { useParams } from "react-router-dom";
import { IoGitNetwork } from "react-icons/io5";
import TopRepos from "../components/charts/TopRepos";
import YearRepo from "../components/charts/YearRepo";
import { userStats } from "../services/githubHooks";
function Stats() {

    const { username } = useParams();

    const { data } = userStats(username);

    const repos = data?.data || [];
    console.log(repos);

    const averageStarsRepo = repos.reduce((total, repo) => total + repo.stargazers_count,0) / repos.length

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <Card className="text-center hover:scale-[1.02] ">
                    <FaRegStar className="w-5 h-5 mb-1 mx-auto text-text" />
                    <div className="text-2xl font-bold text-secondarytext font-mono">
                        {repos.reduce((total, repo) => total + repo.stargazers_count,0)}
                    </div>
                    <div className="text-xs text-text mt-1">Total Stars</div>
                </Card>
                <Card className="text-center hover:scale-[1.02]">
                    <IoGitNetwork className="w-5 h-5 mb-1 mx-auto text-text" />
                    <div className="text-2xl font-bold text-secondarytext font-mono">
                        {repos.reduce((total, repo) => total + repo.forks_count,0)}
                    </div>
                    <div className="text-xs text-text mt-1">Total Forks</div>
                </Card>
                <Card className="text-center hover:scale-[1.02]">
                    <FaCode  className="w-5 h-5 mb-1 mx-auto text-text" />
                    <div className="text-2xl font-bold text-secondarytext font-mono">
                        C
                    </div>
                    <div className="text-xs text-text mt-1">
                        Following
                    </div>
                </Card>
                <Card className="text-center hover:scale-[1.02]">
                    <LuTrendingUp className="w-5 h-5 mb-1 mx-auto text-text" />
                    <div className="text-2xl font-bold text-secondarytext font-mono">
                        {averageStarsRepo}
                    </div>
                    <div className="text-xs text-text mt-1">
                        Average Stars/Repos
                    </div>
                </Card>
            </div>

            <Card className="text-center">
                <LanguageChart repos={repos} />
            </Card>
            <Card>
                <TopRepos repos={repos} />
            </Card>
            <Card>
                <YearRepo repos={repos} />
            </Card>
        </>
    )
}

export default Stats