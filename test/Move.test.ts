import Solver, { Color, GameMode, Move } from "../src/Solver"

describe("Move tests", () => {
  let solver = Solver

  test("Move.parse()", () => {
    let move = Move.parse("BRGY,1,2")

    expect(move.colorSet).toEqual([Color.B, Color.R, Color.G, Color.Y])
    expect(move.hits).toBe(1)
    expect(move.blow).toBe(2)
  })

  test("Move.calcHitAndBlow() 1", () => {
    let move = Move.parse("BRGY,1,2")
    let colorSet2 = Solver.stringToColorSet("BRGY")
    let move2 = move.calcHitAndBlow(colorSet2)
    let colorSet3 = Solver.stringToColorSet("BRWG")
    let move3 = move.calcHitAndBlow(colorSet3)

    expect(move2.hits).toBe(4)
    expect(move2.blow).toBe(0)
    expect(move3.hits).toBe(2)
    expect(move3.blow).toBe(1)
  })

  test("Move.calcHitAndBlow() 2", () => {
    let move1 = Move.parse("BGBY,1,0")
    let colorSet2 = Solver.stringToColorSet("BGYB")
    // move1.isVerbose = true
    let move2 = move1.calcHitAndBlow(colorSet2)

    expect(move2.hits).toBe(2)
    expect(move2.blow).toBe(2)
  })

  test("Move.calcHitAndBlow() 3", () => {
    let move1 = Move.parse("BGBY,1,0")
    let colorSet2 = Solver.stringToColorSet("PPYY")
    let move2 = move1.calcHitAndBlow(colorSet2)

    expect(move2.hits).toBe(1)
    expect(move2.blow).toBe(0)
  })

  test("Move.compareExact() 1", () => {
    let move = Move.parse("BRGY,1,2")
    let colorSet1 = Solver.stringToColorSet("BRGP")
    let colorSet2 = Solver.stringToColorSet("BGYW")
    let colorSet3 = Solver.stringToColorSet("RRYP")

    expect(move.matchPattern(colorSet1)).toBe(false)
    expect(move.matchPattern(colorSet2)).toBe(true)
    // move.isVerbose = true
    expect(move.matchPattern(colorSet3)).toBe(false)
  })

  test("Move.compareExact() 2", () => {
    let move1 = Move.parse("BGBY,1,0")
    let colorSet2 = Solver.stringToColorSet("PPYY")

    expect(move1.matchPattern(colorSet2)).toBe(true)
  })
})
