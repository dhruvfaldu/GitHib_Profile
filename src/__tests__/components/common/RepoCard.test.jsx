import { render, screen } from "@testing-library/react"
import RepoCard from "../../../components/common/RepoCard"

const mockRepo = {
  name: "test-repo",
  html_url: "https://github.com/test/repo",
  stargazers_count: 10,
  description: "Test description",
  language: "JavaScript",
  forks_count: 5,
  updated_at: "2024-01-01",
  fork: false,
  archived: false,
}

describe("RepoCard Component", () => {

  test("renders repo basic info", () => {
    render(<RepoCard repo={mockRepo} />)

    expect(screen.getByText("test-repo")).toBeInTheDocument()
    expect(screen.getByText("10")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()
  })


  test("renders correct link", () => {
    render(<RepoCard repo={mockRepo} />)

    const link = screen.getByRole("link")

    expect(link).toHaveAttribute("href", mockRepo.html_url)
    expect(link).toHaveAttribute("target", "_blank")
  })


  test("shows Fork badge when repo is fork", () => {
    render(<RepoCard repo={{ ...mockRepo, fork: true }} />)

    expect(screen.getByText("Fork")).toBeInTheDocument()
  })


  test("shows Archived badge when repo is archived", () => {
    render(<RepoCard repo={{ ...mockRepo, archived: true }} />)

    expect(screen.getByText("Archived")).toBeInTheDocument()
  })


  test("shows language when available", () => {
    render(<RepoCard repo={mockRepo} />)

    expect(screen.getByText("JavaScript")).toBeInTheDocument()
  })


  test("does not show language when not available", () => {
    render(<RepoCard repo={{ ...mockRepo, language: null }} />)

    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument()
  })


  test("shows fallback when description is null", () => {
    render(<RepoCard repo={{ ...mockRepo, description: null }} />)

    expect(screen.getByText("No description")).toBeInTheDocument()
  })


  test("renders forks count and updated date", () => {
    render(<RepoCard repo={mockRepo} />)

    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByText("2024-01-01")).toBeInTheDocument()
  })

})