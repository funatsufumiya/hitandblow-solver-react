import Solver from "../src/Solver"

describe("test", () => {
  let solver = new Solver()

  test("Solver.getRandomColor() test", () => {
    let c = solver.getRandomColor()
    expect(solver.getRandomColor()).toBeOneOf(solver.colorList)
  })

  test("Solver.getRandomSet() test", () => {
    let set = solver.getRandomSet()
    expect(set[0]).toBeOneOf(solver.colorList)
  })
})
