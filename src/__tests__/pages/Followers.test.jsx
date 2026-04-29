import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Followers from "../../pages/Followers"
import { vi } from "vitest"

vi.mock("../../store/useStore", () => ({
  default: (selector) =>
    selector({
      user: { followers: 20 },
    }),
}))

const mockFollowers = vi.fn()

vi.mock("../../services/githubHooks", () => ({
  userFollowers: (...args) => mockFollowers(...args),
}))

const mockFollowersData = [
  {
    login: "dhruv",
    html_url: "https://github.com/dhruv",
    avatar_url: "https://github.com/dhruv.png",
  },
]

describe("Followers", () => {
  beforeEach(() => {
    mockFollowers.mockClear()
  })

  test("shows loader when loading", () => {
    mockFollowers.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    })

    render(
      <MemoryRouter>
        <Followers />
      </MemoryRouter>
    )

    expect(document.body).toBeTruthy()
  })

  test("renders followers", async () => {
    mockFollowers.mockReturnValue({
      data: mockFollowersData,
      isLoading: false,
      isError: false,
    })

    render(
      <MemoryRouter>
        <Followers />
      </MemoryRouter>
    )

    expect(await screen.findByText("dhruv")).toBeInTheDocument()
    expect(screen.getByText(/20/i)).toBeInTheDocument()
  })

  test("shows empty state when no followers", async () => {
    mockFollowers.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    })

    render(
      <MemoryRouter>
        <Followers />
      </MemoryRouter>
    )

    expect(
      await screen.findByText("No repositories found.")
    ).toBeInTheDocument()
  })
})