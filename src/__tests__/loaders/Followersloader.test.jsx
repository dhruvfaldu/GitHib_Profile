import { render, screen } from "@testing-library/react"
import Followersloader from "../../components/loaders/Followersloader"

describe("Followersloader Component", () => {

  test("renders without crashing", () => {
    render(<Followersloader />)
    expect(document.body).toBeTruthy()
  })


  test("renders 9 skeleton cards", () => {
    render(<Followersloader />)

    const cards = document.querySelectorAll(".grid > div")
    expect(cards.length).toBe(9)
  })


  test("has grid layout", () => {
    render(<Followersloader />)

    const grid = document.querySelector(".grid")
    expect(grid).toHaveClass("grid-cols-2")
    expect(grid).toHaveClass("sm:grid-cols-3")
    expect(grid).toHaveClass("gap-4")
  })


  test("each card has animate-pulse class", () => {
    render(<Followersloader />)

    const cards = document.querySelectorAll(".animate-pulse")
    expect(cards.length).toBe(9)
  })


  test("each card has avatar placeholder", () => {
    render(<Followersloader />)

    const avatars = document.querySelectorAll(".rounded-full")
    expect(avatars.length).toBe(9)
  })


  test("each card has username placeholder", () => {
    render(<Followersloader />)

    const cards = document.querySelectorAll(".grid > div")
    cards.forEach((card) => {
      const usernamePlaceholder = card.querySelector(".h-3")
      expect(usernamePlaceholder).toBeInTheDocument()
    })
  })


  test("each card has button placeholder", () => {
    render(<Followersloader />)

    const cards = document.querySelectorAll(".grid > div")
    cards.forEach((card) => {
      const buttonPlaceholder = card.querySelector(".h-7")
      expect(buttonPlaceholder).toBeInTheDocument()
    })
  })


  test("has correct background color", () => {
    render(<Followersloader />)

    const cards = document.querySelectorAll(".grid > div")
    cards.forEach((card) => {
      expect(card).toHaveClass("bg-secondary")
      expect(card).toHaveClass("border")
      expect(card).toHaveClass("border-border")
    })
  })

})
