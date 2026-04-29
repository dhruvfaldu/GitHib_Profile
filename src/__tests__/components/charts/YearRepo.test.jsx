import { render, screen } from "@testing-library/react"
import YearRepo from "../../../components/charts/YearRepo"
import { vi } from "vitest"

// Mock recharts components
vi.mock("recharts", () => ({
  AreaChart: ({ children }) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,


}))

const mockRepos = [
  { name: "repo1", language: "JavaScript", stargazers_count: 100, forks_count: 5, updated_at: "2024-01-01", fork: false, description: "desc", html_url: "https://github.com/test/repo1", created_at: "2022-06-15" },
  { name: "repo2", language: "TypeScript", stargazers_count: 50, forks_count: 3, updated_at: "2024-02-01", fork: false, description: "desc", html_url: "https://github.com/test/repo2", created_at: "2023-03-20" },
  { name: "repo3", language: "Python", stargazers_count: 200, forks_count: 2, updated_at: "2024-03-01", fork: false, description: "desc", html_url: "https://github.com/test/repo3", created_at: "2023-08-10" },
  { name: "repo4", language: "Java", stargazers_count: 75, forks_count: 1, updated_at: "2024-04-01", fork: false, description: "desc", html_url: "https://github.com/test/repo4", created_at: "2022-01-05" },
]

describe("YearRepo Component", () => {

  test("renders chart title", () => {
    render(<YearRepo repos={mockRepos} />)

    expect(screen.getByText("Repos created per Year")).toBeInTheDocument()
  })


  test("renders chart components", () => {
    render(<YearRepo repos={mockRepos} />)

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
    expect(screen.getByTestId("area-chart")).toBeInTheDocument()
    expect(screen.getByTestId("area")).toBeInTheDocument()
    expect(screen.getByTestId("x-axis")).toBeInTheDocument()
    expect(screen.getByTestId("y-axis")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip")).toBeInTheDocument()
  })



  test("handles empty repos array", () => {
    render(<YearRepo repos={[]} />)

    expect(screen.getByText("Repos created per Year")).toBeInTheDocument()
    expect(screen.getByTestId("area-chart")).toBeInTheDocument()
  })


  test("title has correct styling", () => {
    render(<YearRepo repos={mockRepos} />)

    const title = screen.getByText("Repos created per Year")
    expect(title).toHaveClass("text-left")
    expect(title).toHaveClass("mb-3")
    expect(title).toHaveClass("text-text")
  })


  test("renders with repos from same year", () => {
    const sameYearRepos = [
      { name: "repo1", language: "JavaScript", stargazers_count: 100, forks_count: 5, updated_at: "2024-01-01", fork: false, description: "desc", html_url: "https://github.com/test/repo1", created_at: "2023-01-15" },
      { name: "repo2", language: "TypeScript", stargazers_count: 50, forks_count: 3, updated_at: "2024-02-01", fork: false, description: "desc", html_url: "https://github.com/test/repo2", created_at: "2023-06-20" },
    ]

    render(<YearRepo repos={sameYearRepos} />)

    expect(screen.getByText("Repos created per Year")).toBeInTheDocument()
    expect(screen.getByTestId("area-chart")).toBeInTheDocument()
  })


  test("renders with repos from multiple years", () => {
    const multiYearRepos = [
      { name: "repo1", language: "JavaScript", stargazers_count: 100, forks_count: 5, updated_at: "2024-01-01", fork: false, description: "desc", html_url: "https://github.com/test/repo1", created_at: "2020-01-15" },
      { name: "repo2", language: "TypeScript", stargazers_count: 50, forks_count: 3, updated_at: "2024-02-01", fork: false, description: "desc", html_url: "https://github.com/test/repo2", created_at: "2021-06-20" },
      { name: "repo3", language: "Python", stargazers_count: 200, forks_count: 2, updated_at: "2024-03-01", fork: false, description: "desc", html_url: "https://github.com/test/repo3", created_at: "2022-08-10" },
      { name: "repo4", language: "Java", stargazers_count: 75, forks_count: 1, updated_at: "2024-04-01", fork: false, description: "desc", html_url: "https://github.com/test/repo4", created_at: "2023-12-05" },
    ]

    render(<YearRepo repos={multiYearRepos} />)

    expect(screen.getByText("Repos created per Year")).toBeInTheDocument()
    expect(screen.getByTestId("area-chart")).toBeInTheDocument()
  })

})
