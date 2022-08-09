open Jest
open Expect

let () = describe("test", () => {
  test("test", () => {
    expect(true) |> toBe(true)
  })
})
