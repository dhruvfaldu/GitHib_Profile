import { render, screen } from "@testing-library/react"
import TopRepos from "../../../components/charts/TopRepos"
import { vi } from "vitest"

// Mock recharts components
vi.mock("recharts", () => ({
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,


}))

const mockRepos = [
  { name: "repo1", language: "JavaScript", stargazers_count: 100, forks_count: 5, updated_at: "2024-01-01", fork: false, description: "desc", html_url: "https://github.com/test/repo1", created_at: "2023-01-01" },
  { name: "repo2", language: "TypeScript", stargazers_count: 50, forks_count: 3, updated_at: "2024-02-01", fork: false, description: "desc", html_url: "https://github.com/test/repo2", created_at: "2023-02-01" },
  { name: "repo3", language: "Python", stargazers_count: 200, forks_count: 2, updated_at: "2024-03-01", fork: false, description: "desc", html_url: "https://github.com/test/repo3", created_at: "2023-03-01" },
  { name: "repo4", language: "Java", stargazers_count: 75, forks_count: 1, updated_at: "2024-04-01", fork: false, description: "desc", html_url: "https://github.com/test/repo4", created_at: "2023-04-01" },
]

describe("TopRepos Component", () => {

  test("renders chart title", () => {
    render(<TopRepos repos={mockRepos} />)

    expect(screen.getByText("Top Repos by Stars")).toBeInTheDocument()
  })


  test("renders chart components", () => {
    render(<TopRepos repos={mockRepos} />)

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
    expect(screen.getByTestId("bar")).toBeInTheDocument()
    expect(screen.getByTestId("x-axis")).toBeInTheDocument()
    expect(screen.getByTestId("y-axis")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip")).toBeInTheDocument()
    expect(screen.getByTestId("legend")).toBeInTheDocument()
  })



  test("handles empty repos array", () => {
    render(<TopRepos repos={[]} />)

    expect(screen.getByText("Top Repos by Stars")).toBeInTheDocument()
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
  })


  test("title has correct styling", () => {
    render(<TopRepos repos={mockRepos} />)

    const title = screen.getByText("Top Repos by Stars")
    expect(title).toHaveClass("text-text")
    expect(title).toHaveClass("mb-4")
  })


  test("renders with many repos", () => {
    const manyRepos = Array.from({ length: 15 }, (_, i) => ({
      name: `repo${i}`,
      language: "JavaScript",
      stargazers_count: i * 10,
      forks_count: 1,
      updated_at: "2024-01-01",
      fork: false,
      description: "desc",
      html_url: `https://github.com/test/repo${i}`,
      created_at: "2023-01-01",
    }))

    render(<TopRepos repos={manyRepos} />)

    expect(screen.getByText("Top Repos by Stars")).toBeInTheDocument()
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
  })

})
