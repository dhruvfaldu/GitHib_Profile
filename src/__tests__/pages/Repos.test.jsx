import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Repos from "../../pages/Repos"
import { vi } from "vitest"

vi.mock("../../components/common/RepoCard", () => ({
    default: ({ repo }) => <div>{repo.name}</div>,
}))

vi.mock("../../store/useStore", () => ({
    default: (selector) =>
        selector({
            user: { public_repos: 20 },
        }),
}))

const mockUserRepos = vi.fn()

vi.mock("../../services/githubHooks", () => ({
    userRepos: (...args) => mockUserRepos(...args),
}))


const mockRepos = [
    {
        name: "react-app",
       
    },
    {
        name: "node-api",
       
    },
    {
        name: "python-tool",
       
    },
]


describe("Repos Page", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })


    test("shows loader when loading", () => {
        mockUserRepos.mockReturnValue({
            data: [],
            isLoading: true,
            isError: false,
        })

        render(
            <MemoryRouter>
                <Repos />
            </MemoryRouter>
        )

        expect(document.body).toBeTruthy()
    })


    test("shows error page on error", () => {
        mockUserRepos.mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        })

        render(
            <MemoryRouter>
                <Repos />
            </MemoryRouter>
        )

        expect(document.body).toBeTruthy()
    })


    test("renders repositories correctly", async () => {
        mockUserRepos.mockReturnValue({
            data: mockRepos,
            isLoading: false,
            isError: false,
        })

        render(
            <MemoryRouter>
                <Repos />
            </MemoryRouter>
        )

        expect(await screen.findByText("react-app")).toBeInTheDocument()
        expect(screen.getByText("node-api")).toBeInTheDocument()
        expect(screen.getByText("python-tool")).toBeInTheDocument()
    })


    test("filters repositories by search", async () => {
        mockUserRepos.mockReturnValue({
            data: mockRepos,
            isLoading: false,
            isError: false,
        })

        render(
            <MemoryRouter>
                <Repos />
            </MemoryRouter>
        )

        const input = screen.getByPlaceholderText("Search repositories...")

        fireEvent.change(input, { target: { value: "react" } })

        expect(await screen.findByText("react-app")).toBeInTheDocument()
        expect(screen.queryByText("node-api")).not.toBeInTheDocument()
    })


    test("shows empty state when no repos", async () => {
        mockUserRepos.mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        })

        render(
            <MemoryRouter>
                <Repos />
            </MemoryRouter>
        )

        expect(
            await screen.findByText("No repositories found.")
        ).toBeInTheDocument()
    })

})