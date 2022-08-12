enum Color {
  B, R, G, Y, P, W
}
type ColorSet = Color[]

class Solver {
  readonly colorList: Color[] = [Color.B, Color.R, Color.G, Color.Y, Color.P, Color.W]

  public getRandomColor = (): Color => {
    return this.colorList[Math.floor(Math.random() * this.colorList.length)]
  }

  public getRandomSet = (): ColorSet => {
    return [this.getRandomColor(), this.getRandomColor(), this.getRandomColor(), this.getRandomColor()]
  }

  public getNextPatterns = (prevList: ColorSet[], colorSubList: ColorSet) => {
    const nextList: ColorSet[] = []
    for (let i = 0; i < prevList.length; i++) {
      for (let j = 0; j < colorSubList.length; j++) {
        nextList.push(prevList[i].concat(colorSubList[j]))
      }
    }
    return nextList
  }
  public generateAllPatterns = () => {
    const allPatterns: ColorSet[] = []
    const colorSubList: Color[] = this.colorList
    for (let i = 0; i < this.colorList.length; i++) {
      // allPatterns.push(this.getNextPatterns([], colorSubList))
    }
    return allPatterns
  }

}

export default Solver