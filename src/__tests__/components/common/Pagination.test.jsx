import { render, screen, fireEvent } from "@testing-library/react"
import Pagination from "../../../components/common/Pagination"
import { vi } from "vitest"

describe("Pagination Component", () => {

  test("renders Previous and Next buttons", () => {
    render(
      <Pagination page={1} setPage={vi.fn()} hasNextPage={true} maxpages={5} />
    )

    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument()
  })


  test("Previous button is disabled on page 1", () => {
    render(
      <Pagination page={1} setPage={vi.fn()} hasNextPage={true} maxpages={5} />
    )

    const prevButton = screen.getByRole("button", { name: /previous/i })
    expect(prevButton).toBeDisabled()
  })


  test("Next button is disabled when hasNextPage is false", () => {
    render(
      <Pagination page={3} setPage={vi.fn()} hasNextPage={false} maxpages={5} />
    )

    const nextButton = screen.getByRole("button", { name: /next/i })
    expect(nextButton).toBeDisabled()
  })


  test("clicking a page number calls setPage", () => {
    const mockSetPage = vi.fn()

    render(
      <Pagination page={1} setPage={mockSetPage} hasNextPage={true} maxpages={5} />
    )

    const page2Button = screen.getByRole("button", { name: "2" })
    fireEvent.click(page2Button)

    expect(mockSetPage).toHaveBeenCalledWith(2)
  })


  test("clicking Previous calls setPage with page - 1", () => {
    const mockSetPage = vi.fn()

    render(
      <Pagination page={3} setPage={mockSetPage} hasNextPage={true} maxpages={5} />
    )

    const prevButton = screen.getByRole("button", { name: /previous/i })
    fireEvent.click(prevButton)

    expect(mockSetPage).toHaveBeenCalledWith(2)
  })


  test("clicking Next calls setPage with page + 1", () => {
    const mockSetPage = vi.fn()

    render(
      <Pagination page={2} setPage={mockSetPage} hasNextPage={true} maxpages={5} />
    )

    const nextButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(nextButton)

    expect(mockSetPage).toHaveBeenCalledWith(3)
  })


  test("ellipsis buttons are disabled", () => {
    render(
      <Pagination page={5} setPage={vi.fn()} hasNextPage={true} maxpages={10} />
    )

    const ellipsisButtons = screen.getAllByText("...")
    ellipsisButtons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })


  test("current page button has active style", () => {
    render(
      <Pagination page={3} setPage={vi.fn()} hasNextPage={true} maxpages={5} />
    )

    const activeButton = screen.getByRole("button", { name: "3" })
    expect(activeButton).toHaveClass("bg-blue-500")
  })

  
})

