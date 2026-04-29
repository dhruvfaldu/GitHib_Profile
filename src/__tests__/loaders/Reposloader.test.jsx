import { render, screen } from "@testing-library/react"
import Reposloader from "../../components/loaders/Reposloader"

describe("Reposloader Component", () => {

  test("renders without crashing", () => {
    render(<Reposloader />)
    expect(document.body).toBeTruthy()
  })


  test("renders 5 skeleton repo cards", () => {
    render(<Reposloader />)

    const cards = document.querySelectorAll(".space-y-4 > div")
    expect(cards.length).toBe(5)
  })


  test("has space-y layout", () => {
    render(<Reposloader />)

    const container = document.querySelector(".space-y-4")
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass("w-full")
  })


  test("each card has border and rounded styling", () => {
    render(<Reposloader />)

    const cards = document.querySelectorAll(".space-y-4 > div")
    cards.forEach((card) => {
      expect(card).toHaveClass("border")
      expect(card).toHaveClass("rounded-lg")
      expect(card).toHaveClass("p-5")
    })
  })


  test("each card has title placeholder", () => {
    render(<Reposloader />)

    const cards = document.querySelectorAll(".space-y-4 > div")
    cards.forEach((card) => {
      const titlePlaceholder = card.querySelector(".h-4")
      expect(titlePlaceholder).toBeInTheDocument()
    })
  })


  test("each card has description placeholder", () => {
    render(<Reposloader />)

    const cards = document.querySelectorAll(".space-y-4 > div")
    cards.forEach((card) => {
      const descPlaceholder = card.querySelector(".w-3\\/4")
      expect(descPlaceholder).toBeInTheDocument()
    })
  })


  test("each card has flex gap for stats", () => {
    render(<Reposloader />)

    const cards = document.querySelectorAll(".space-y-4 > div")
    cards.forEach((card) => {
      const statsContainer = card.querySelector(".flex.gap-4")
      expect(statsContainer).toBeInTheDocument()
    })
  })


  test("each card has 3 stat placeholders", () => {
    render(<Reposloader />)

    const cards = document.querySelectorAll(".space-y-4 > div")
    cards.forEach((card) => {
      const statsContainer = card.querySelector(".flex.gap-4")
      const statPlaceholders = statsContainer.querySelectorAll("div")
      expect(statPlaceholders.length).toBe(3)
    })
  })

})
