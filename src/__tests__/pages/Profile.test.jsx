import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import Profile from "../../pages/Profile"
import { vi } from "vitest"

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual,
        useParams: () => ({ username: "dhruv" }),
        Outlet: () => <div data-testid="outlet" />,
    }
})

const mockUseUser = vi.fn()

vi.mock("../../services/githubHooks", () => ({
    useUser: (...args) => mockUseUser(...args),
}))

const mockSetUser = vi.fn()

vi.mock("../../store/useStore", () => ({
    default: (selector) =>
        selector({
            setUser: mockSetUser
        })
}))

const mockUser = {
    name: "Dhruv",
    email: "dhruv@test.com",
    bio: "Frontend Developer",
    avatar_url: "avatar.png",
    location: "India",
    company: "Test Company",
    blog: "https://blog.com",
    twitter_username: "dhruvdev",
    created_at: "2024-01-01",
    html_url: "https://github.com/dhruv",
    public_repos: 10,
    followers: 5,
    following: 2,
    public_gists: 1,
}


describe("Profile Page", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("shows loading skeleton when no data", () => {
        mockUseUser.mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        })

        render(
            <MemoryRouter initialEntries={["/user/dhruv"]}>
                <Routes>
                    <Route path="/user/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        )

        expect(document.body).toBeTruthy()
    })


    test("shows error component on error", () => {
        mockUseUser.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        })

        render(
            <MemoryRouter initialEntries={["/user/dhruv"]}>
                <Routes>
                    <Route path="/user/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        )

        expect(document.body).toBeTruthy()
    })


    test("renders user data correctly", async () => {
        mockUseUser.mockReturnValue({
            data: mockUser,
            isLoading: false,
            isError: false,
        })

        render(
            <MemoryRouter initialEntries={["/user/dhruv"]}>
                <Routes>
                    <Route path="/user/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        )

        expect(await screen.findByText("Dhruv")).toBeInTheDocument()
        expect(screen.getByText("Frontend Developer")).toBeInTheDocument()
        expect(screen.getByText("India")).toBeInTheDocument()
        expect(screen.getByText("Test Company")).toBeInTheDocument()
    })


    test("calls setUser when data loads", async () => {
        mockUseUser.mockReturnValue({
            data: mockUser,
            isLoading: false,
            isError: false,
        })

        render(
            <MemoryRouter initialEntries={["/user/dhruv"]}>
                <Routes>
                    <Route path="/user/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        )

        await screen.findByText("Dhruv")

        expect(mockSetUser).toHaveBeenCalledWith(mockUser)
    })


    test("renders navigation links correctly", async () => {
        mockUseUser.mockReturnValue({
            data: mockUser,
            isLoading: false,
            isError: false,
        })

        render(
            <MemoryRouter initialEntries={["/user/dhruv"]}>
                <Routes>
                    <Route path="/user/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        )

        await screen.findByText("Dhruv")

        const allLinks = screen.getAllByRole("link")

        const reposLink = allLinks.find(
            (link) => link.getAttribute("href") === "/user/dhruv/repos"
        )

        const followersLink = allLinks.find(
            (link) => link.getAttribute("href") === "/user/dhruv/followers"
        )

        expect(reposLink).toBeInTheDocument()
        expect(followersLink).toBeInTheDocument()
    })

})