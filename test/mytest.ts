import Solver, { Color, GameMode } from "../src/Solver"

describe("Solver tests", () => {
  let solver = Solver

  test("Solver.getRandomColor()", () => {
    let c = solver.getRandomColor()
    expect(solver.getRandomColor()).toBeOneOf(solver.colorList)
  })

  test("Solver.getRandomSet()", () => {
    let set = solver.getRandomSet()
    expect(set[0]).toBeOneOf(solver.colorList)
    expect(set[1]).toBeOneOf(solver.colorList)
    expect(set[2]).toBeOneOf(solver.colorList)
    expect(set[3]).toBeOneOf(solver.colorList)
  })

  test("Solver.generatePatterns(UNDUP)", () => {
    let patterns = solver.generatePatterns(GameMode.Unduplicable)
    expect(patterns.length).toBe(360)
  })

  test("Solver.generatePatterns(DUP)", () => {
    let patterns = solver.generatePatterns(GameMode.Duplicable)
    expect(patterns.length).toBe(1296)
  })

  test("Solver.colorSetToString()", () => {
    expect(solver.colorSetToString([Color.B, Color.R, Color.G, Color.Y])).toBe("BRGY")
    expect(solver.colorSetToString([Color.B, Color.B, Color.W, Color.W])).toBe("BBWW")
  })
})
