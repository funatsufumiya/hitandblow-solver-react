import Solver, { Color, GameMode, Move, GameState } from "../src/Solver"

describe("GameState tests", () => {
  let solver = Solver

  test("GameState()", () => {
    let gs = new GameState()
    expect(gs.gameMode).toBe(GameMode.Duplicable)
    expect(gs.prevPossiblePatterns.length).toBe(1296)
    expect(gs.nextPossiblePatterns.length).toBe(1296)
  })

  test("GameState()", () => {
    let gs = new GameState()
    let move = Move.parse("BBGY,1,2")
    let gs2 = gs.goNext(move)
    expect(gs2.gameMode).toBe(GameMode.Duplicable)
    expect(gs2.prevPossiblePatterns.length).toBe(1296)
    expect(gs2.nextPossiblePatterns.length).toBe(144)
  })
})