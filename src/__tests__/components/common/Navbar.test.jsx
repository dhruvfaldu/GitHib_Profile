import { render, screen, fireEvent } from "@testing-library/react"
import Navbar from "../../../components/common/Navbar"
import { vi } from "vitest"

// Mock react-router-dom
const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock useDebounce hook
vi.mock("../../../hooks/useDebounce", () => ({
  useDebounce: (value) => value,
}))

// Mock useLocalStorage hook
vi.mock("../../../hooks/useLocalStorage", () => ({
  useLocalStorage: () => [[], vi.fn()],
}))

describe("Navbar Component", () => {

  beforeEach(() => {
    mockNavigate.mockClear()
    // Mock localStorage
    Storage.prototype.getItem = vi.fn(() => null)
    Storage.prototype.setItem = vi.fn()
  })


  test("renders logo and brand name", () => {
    render(<Navbar />)

    expect(screen.getByText("GitHub Explorer")).toBeInTheDocument()
  })


  test("renders search input", () => {
    render(<Navbar />)

    expect(screen.getByPlaceholderText("Search username..")).toBeInTheDocument()
  })


  test("renders github link", () => {
    render(<Navbar />)

    const githubLink = screen.getByText("github.com")
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute("href", "https://github.com")
  })


  test("input updates on change", () => {
    render(<Navbar />)

    const input = screen.getByPlaceholderText("Search username..")
    fireEvent.change(input, { target: { value: "testuser" } })

    expect(input.value).toBe("testuser")
  })


  test("navigates to user profile on submit", () => {
    render(<Navbar />)

    const input = screen.getByPlaceholderText("Search username..")
    fireEvent.change(input, { target: { value: "testuser" } })

    const button = screen.getByRole("button", { type: "submit" })
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith("/user/testuser")
  })



  test("does not navigate when input is empty", () => {
    render(<Navbar />)

    const form = screen.getByPlaceholderText("Search username..").closest("form")
    fireEvent.submit(form)

    expect(mockNavigate).not.toHaveBeenCalled()
  })


  test("logo link points to home", () => {
    render(<Navbar />)

    const logoLink = screen.getByText("GitHub Explorer").closest("a")
    expect(logoLink).toHaveAttribute("href", "/")
  })


  test("has sticky navigation", () => {
    render(<Navbar />)

    const nav = document.querySelector("nav")
    expect(nav).toHaveClass("sticky")
    expect(nav).toHaveClass("top-0")
    expect(nav).toHaveClass("z-50")
  })


  test("search input has correct styling", () => {
    render(<Navbar />)

    const input = screen.getByPlaceholderText("Search username..")
    expect(input).toHaveClass("rounded-md")
    expect(input).toHaveClass("border")
    expect(input).toHaveClass("border-border")
  })

})
