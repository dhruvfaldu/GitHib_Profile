import API from "../api/githubApi";
import { User } from "../types/github";
import { Repo } from "../types/github";

export const getUser = async (username: string): Promise<User> => {
  if (!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}`)
  return response.data
}


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

export const getFollowers = async (username: string, page: number = 1):Promise<User[]> => {
  if (!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}/followers?per_page=9&page=${page}`)
  return response.data
}

export const getFollowing = async (username:string, page: number = 1):Promise<User[]> =>{
  if(!username) return Promise.reject("Username is required")
  const response = await API.get(`/users/${username}/following?per_page=9&page=${page}`)
  return response.data
}
  
export default { getUser, getRepos, getFollowers, getFollowing }