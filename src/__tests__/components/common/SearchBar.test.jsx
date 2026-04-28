import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../../../components/common/SearchBar"
import { vi } from "vitest"

//  mock navigate
const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("SearchBar Component", () => {

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test("renders input and button", () => {
    render(
      <SearchBar onSearch={vi.fn()} />
    )

    expect(
      screen.getByPlaceholderText("Search a GitHub username...")
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /search/i }))
      .toBeInTheDocument()
  })


  test("input change works", () => {
    render(
      <SearchBar onSearch={vi.fn()} />
    )
    const input = screen.getByPlaceholderText("Search a GitHub username...")
    fireEvent.change(input, { target: { value: "dhruv" } })
    expect(input.value).toBe("dhruv")
  })


  test("button disabled when input empty", () => {
    render(
      <SearchBar onSearch={vi.fn()} />
    )
    const button = screen.getByRole("button", { name: /search/i })
    expect(button).toBeDisabled()
  })


  test("button enabled when input has value", () => {
    render(
      <SearchBar onSearch={vi.fn()} />
    )
    const input = screen.getByPlaceholderText("Search a GitHub username...")
    const button = screen.getByRole("button", { name: /search/i })
    fireEvent.change(input, { target: { value: "dhruv" } })
    expect(button).not.toBeDisabled()
  })


  test("submit calls onSearch and navigate", () => {
    const mockOnSearch = vi.fn()
    render(
      <SearchBar onSearch={mockOnSearch} />
    )
    const input = screen.getByPlaceholderText("Search a GitHub username...")
    const button = screen.getByRole("button", { name: /search/i })
    fireEvent.change(input, { target: { value: "dhruv" } })
    fireEvent.click(button)
    expect(mockOnSearch).toHaveBeenCalledWith("dhruv")
    expect(mockNavigate).toHaveBeenCalledWith("/user/dhruv")
  })


  test("input clears after submit", () => {
    const mockOnSearch = vi.fn()
    render(
      <SearchBar onSearch={mockOnSearch} />
    )
    const input = screen.getByPlaceholderText("Search a GitHub username...")
    fireEvent.change(input, { target: { value: "dhruv" } })
    fireEvent.submit(input.closest("form"))
    expect(input.value).toBe("")
  })


  test("does not submit if input is empty", () => {
    const mockOnSearch = vi.fn()
    render(
      <SearchBar onSearch={mockOnSearch} />
    )

    const form = screen.getByRole("button", { name: /search/i }).closest("form")
    fireEvent.submit(form)
    expect(mockOnSearch).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

})