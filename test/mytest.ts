import Solver, { Color, GameMode, Move } from "../src/Solver"

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

  test("Solver.stringToColorSet()", () => {
    expect(solver.stringToColorSet("BRGY")).toEqual([Color.B, Color.R, Color.G, Color.Y])
    expect(solver.stringToColorSet("BBWW")).toEqual([Color.B, Color.B, Color.W, Color.W])
    expect(solver.stringToColorSet("brgy")).toEqual([Color.B, Color.R, Color.G, Color.Y])
  })

  test("Move.parse()", () => {
    let move = Move.parse("BRGY,1,2")

    expect(move.colorSet).toEqual([Color.B, Color.R, Color.G, Color.Y])
    expect(move.hits).toBe(1)
    expect(move.blow).toBe(2)
  })

  test("Solver.generatePatternFilterRegex() 1", () => {
    const move = Move.parse("BRGY,1,0")
    const regex = Solver["generatePatternFilterRegex"](move)
    expect(regex.source).toMatch("^B...|.R..|..G.|...Y$")
  })

  test("Solver.generatePatternFilterRegex() 2", () => {
    const move = Move.parse("BRGY,2,0")
    const regex = Solver["generatePatternFilterRegex"](move)
    expect(regex.source).toMatch("^BR..|B.G.|B..Y|.RG.|.R.Y|..GY$")
  })

  test("Solver.generatePatternFilterRegex() 3", () => {
    const move = Move.parse("BRGY,3,0")
    const regex = Solver["generatePatternFilterRegex"](move)
    expect(regex.source).toMatch("^BRG.|BR.Y|B.GY|.RGY$")
  })

  test("Solver.generatePatternFilterRegex() 4", () => {
    const move = Move.parse("BRGY,4,0")
    const regex = Solver["generatePatternFilterRegex"](move)
    expect(regex.source).toMatch("^BRGY$")
  })
})
