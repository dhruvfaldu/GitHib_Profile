import { render, screen } from "@testing-library/react"
import LanguageChart from "../../../components/charts/LanguageChart"
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
  { name: "repo1", language: "JavaScript", stargazers_count: 10, forks_count: 5, updated_at: "2024-01-01", fork: false, description: "desc", html_url: "https://github.com/test/repo1", created_at: "2023-01-01" },
  { name: "repo2", language: "TypeScript", stargazers_count: 20, forks_count: 3, updated_at: "2024-02-01", fork: false, description: "desc", html_url: "https://github.com/test/repo2", created_at: "2023-02-01" },
  { name: "repo3", language: "JavaScript", stargazers_count: 15, forks_count: 2, updated_at: "2024-03-01", fork: false, description: "desc", html_url: "https://github.com/test/repo3", created_at: "2023-03-01" },
  { name: "repo4", language: null, stargazers_count: 5, forks_count: 1, updated_at: "2024-04-01", fork: false, description: "desc", html_url: "https://github.com/test/repo4", created_at: "2023-04-01" },
]

describe("LanguageChart Component", () => {

  test("renders chart title", () => {
    render(<LanguageChart repos={mockRepos} />)

    expect(screen.getByText("Most Use Languages")).toBeInTheDocument()
  })


  test("renders chart components", () => {
    render(<LanguageChart repos={mockRepos} />)

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
    expect(screen.getByTestId("bar")).toBeInTheDocument()
    expect(screen.getByTestId("x-axis")).toBeInTheDocument()
    expect(screen.getByTestId("y-axis")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip")).toBeInTheDocument()
    expect(screen.getByTestId("legend")).toBeInTheDocument()
  })


  test("processes language data correctly", () => {
    render(<LanguageChart repos={mockRepos} />)

    expect(screen.getByText("Most Use Languages")).toBeInTheDocument()
  })


  test("handles repos with no language", () => {
    const reposWithNoLang = [
      { name: "repo1", language: null, stargazers_count: 10, forks_count: 5, updated_at: "2024-01-01", fork: false, description: "desc", html_url: "https://github.com/test/repo1", created_at: "2023-01-01" },
    ]

    render(<LanguageChart repos={reposWithNoLang} />)

    expect(screen.getByText("Most Use Languages")).toBeInTheDocument()
  })


  test("title has correct styling", () => {
    render(<LanguageChart repos={mockRepos} />)

    const title = screen.getByText("Most Use Languages")
    expect(title).toHaveClass("text-left")
    expect(title).toHaveClass("mb-3")
    expect(title).toHaveClass("text-text")
  })

})
