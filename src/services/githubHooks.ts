import { useQuery } from "@tanstack/react-query";
import { getUser, getRepos, getFollowing, getFollowers } from "./githubService";
import { User } from "../types/github";
import { Repo } from "../types/github";

/**
 * @description: Custom hook to fetch user data from GitHub API using react-query
 * @param {string} username - The username of the user to fetch
 * @returns {Object} - The react-query result object
 */
export const useUser = ((username: string) => {
    return useQuery<User>({
        queryKey: ["user", username],
        queryFn: () => getUser(username)
    })

})

/**
 * @description: Custom hook to fetch user repositories from GitHub API using react-query, with pagination support
 * @param {string}user: User object containing the login information of the user whose repositories are to be fetched
 * @param {number} page : The page number for pagination, default is 1
 * @returns {Object}: The react-query result object containing the repositories data, loading state, and error state
 */
export const userRepos = ((user: User | null, page: number = 1) => {
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

/**
 * @description: Custom hook to fetch followers or following data for a user from GitHub API using react-query, with pagination support
 * @param {string}username : The username of the user whose followers or following data is to be fetched
 * @param {string}activeTab : A string indicating whether to fetch "followers" or "following" data
 * @param {number}page : The page number for pagination, default is 1
 * @returns {Object[]}: The react-query result object containing the followers or following data, loading state, and error state
 */
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

/**
 * @description: Custom hook to fetch user statistics such as repositories from GitHub API using react-query
 * @param {string}username : The username of the user whose statistics are to be fetched
 * @returns {Object}: The react-query result object containing the statistics data, loading state, and error state
 */
export const userStats = ((username: string) => {
    return useQuery({
        queryKey: ["repos", username],
        queryFn: () => getRepos(username),
        enabled: !!username,
    });
})



export default { useUser, userRepos, userFollowers, userStats }