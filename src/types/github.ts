export interface User {
    id: number;
    login: string;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    name?: string;
    email?: string;
    bio?: string;
    location?: string;
    blog?: string;
    company?: string;
    twitter_username?: string;
    created_at?: string;
    updated_at?: string;
    html_url?: string;
}

export interface Repo {
    id?: number;
    name: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    archived?: boolean;
    fork: boolean;
    description: string;
    html_url: string;
    created_at: string;
}

export interface Language {
    language: string;
    count: number;
}