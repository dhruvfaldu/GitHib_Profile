import API from "../api/githubApi";
import { User } from "../types/github";
import { Repo } from "../types/github";

/**
 * @description: Fetch user data from GitHub API based on the provided username
 * @param {string} username - The GitHub username to fetch data for
 * @returns {Object} - A promise that resolves to the user data object
 * @throws {Error} - Throws an error if the username is not provided or if the API request fails
 * @returns {Object} - The user data object containing information such as login, id, avatar_url, etc.
 */
export const getUser = async (username: string): Promise<User> => {
  if (!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}`)
  return response.data
}

/**
 * @description: Fetch repositories of a user from GitHub API based on the provided username and page number
 * @param {string} username - The GitHub username to fetch repositories for
 * @param {number} page - The page number for pagination (default is 1)
 * @returns {Object} - A promise that resolves to an array of repository data objects
 */
export const getRepos = async (username: string, page: number = 1):Promise<Repo[]> => {
  if (!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}/repos`, {
    params: {
      per_page: 10, 
      page: page,
      sort: "updated",
    },
  });
  return response.data;
};

/**
 * @description: Fetch followers of a user from GitHub API based on the provided username and page number
 * @param {string} username - The GitHub username to fetch followers for
 * @param {number} page - The page number for pagination (default is 1)
 * @returns {Object[]} - A promise that resolves to an array of follower data objects
 */
export const getFollowers = async (username: string, page: number = 1):Promise<User[]> => {
  if (!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}/followers?per_page=9&page=${page}`)
  return response.data
}

/**
 * @description: Fetch following users of a user from GitHub API based on the provided username and page number
 * @param {string} username - The GitHub username to fetch following data for
 * @param {number} page - The page number for pagination (default is 1)
 * @returns {Object[]} - A promise that resolves to an array of following data objects
 */
export const getFollowing = async (username:string, page: number = 1):Promise<User[]> =>{
  if(!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}/following?per_page=9&page=${page}`)
  return response.data
}
  
export default { getUser, getRepos, getFollowers, getFollowing }