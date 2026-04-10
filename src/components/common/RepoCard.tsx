import { FaRegStar } from "react-icons/fa6";
import { IoGitNetwork } from "react-icons/io5";
import { LuGitBranch } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import Card from "./Card";
import { Repo } from "../../types/github";

type Props = {
    repo: Repo;
}
function RepoCard({ repo }: Props) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
    >
      <Card className="hover:bg-[#161b22] cursor-pointer mt-4">
        {/* top */}
        <div className="flex items-center sm:items-center justify-between gap-3">
          <div className="flex items-center min-w-0 gap-2 sm:flex-nowrap">
            <LuGitBranch className="text-text h-4 w-4 shrink-0" />
            <h3 className="text-secondarytext truncate font-semibold sm:text-base">
              {repo.name}
            </h3>

            {/* fork / archived */}
            {repo.fork && (
              <span className="border rounded-full py-0.5 text-xs px-2 bg-[#252a31] border-border text-text">
                Fork
              </span>
            )}
            {repo.archived && (
              <span className="border rounded-full py-0.5 text-xs px-2 bg-[#e39c1626] border-warning text-[#e39c16]">
                Archived
              </span>
            )}
          </div>

          <div className="flex items-center text-text gap-2">
            <FaRegStar className="h-4 w-4" />
            <span className="font-semibold">
              {repo.stargazers_count}
            </span>
          </div>
        </div>

        {/* description */}
        <p className="text-text text-sm line-clamp-2 mt-2">
          {repo.description || "No description"}
        </p>

        {/* bottom */}
        <div className="flex flex-wrap items-center gap-4 mt-3">
          {/* language */}
          {repo.language && (
            <span className="flex items-center gap-1.5 sm:gap-4 text-text text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
              {repo.language}
            </span>
          )}

          {/* forks */}
          <span className="flex items-center gap-1.5 text-text text-xs">
            <IoGitNetwork className="h-3.5 w-3.5" />
            {repo.forks_count}
          </span>

          {/* updated */}
          <span className="flex items-center gap-1.5 text-text text-xs">
            <MdAccessTime className="h-3.5 w-3.5" />
            {repo.updated_at}
          </span>
        </div>
      </Card>
    </a>
  );
}

export default RepoCard;
