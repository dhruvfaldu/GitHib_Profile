import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import Home from "../../pages/Home"

// mock navigate
const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom")
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

// mock localStorage hook
const mockSetRecent = vi.fn()

let recentData = ["dhruv", "john"]

vi.mock("../../hooks/useLocalStorage", () => ({
    useLocalStorage: () => [
        recentData,
        (newValue) => {
            recentData = newValue
            mockSetRecent(newValue)
        }
    ]
}))

describe("Home Page", () => {

    test("renders heading and search bar", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        expect(screen.getByText("GitHub Explorer")).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText("Search a GitHub username...")
        ).toBeInTheDocument()
    })


    test("renders recent searches", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        expect(screen.getByText("dhruv")).toBeInTheDocument()
        expect(screen.getByText("john")).toBeInTheDocument()
    })


    test("clicking recent user navigates to profile", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText("dhruv"))
        expect(mockNavigate).toHaveBeenCalledWith("/user/dhruv")
    })


    test("removes user from recent searches", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const removeButtons = screen.getAllByTestId("remove-btn")
        fireEvent.click(removeButtons[0])

        expect(mockSetRecent).toHaveBeenCalled()
    })


    test("search adds user to recent", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const input = screen.getByPlaceholderText("Search a GitHub username...")
        const button = screen.getByRole("button", { name: /search/i })

        fireEvent.change(input, { target: { value: "newuser" } })
        fireEvent.click(button)

        expect(mockSetRecent).toHaveBeenCalled()
    })


    test("clicking popular developer navigates and updates recent", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        const link = screen.getByText("torvalds").closest("a")
        fireEvent.click(link)
        expect(link).toHaveAttribute("href", "/user/torvalds")
        expect(mockSetRecent).toHaveBeenCalled()
    })

})