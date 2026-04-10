import { useQuery } from "@tanstack/react-query";
import { getUser, getRepos, getFollowing, getFollowers } from "./githubService";
import { User } from "../types/github";
import { Repo } from "../types/github";

export const useUser = ((username: string) => {
    return useQuery<User>({
        queryKey: ["user", username],
        queryFn: () => getUser(username)
    })

})

export const userRepos = ((user: User | null, page = 1) => {
    return useQuery<Repo[], Error>({
        queryKey: ["repos", user?.login, page],
        queryFn: () => {
            if (!user?.login) return Promise.reject("Username is required")
            return getRepos(user?.login, page);
        },
        placeholderData: (previousData) => previousData,
        enabled: !!user?.login,
    });
})

export const userFollowers = ((username: string, activeTab: string, page: number = 1) => {
    return useQuery({
        queryKey: ["followers", username, activeTab, page],
        queryFn: () =>
            activeTab === "followers"
                ? getFollowers(username, page)
                : getFollowing(username, page),
        enabled: !!username,
    });
})

export const userStats = ((username: string) => {
    return useQuery({
        queryKey: ["repos", username],
        queryFn: () => getRepos(username),
        enabled: !!username,
    });
})

export default { useUser, userRepos, userFollowers, userStats }

