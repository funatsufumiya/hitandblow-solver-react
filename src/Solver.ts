enum Color {
  B, R, G, Y, P, W
}

export type ColorSet = Color[]

enum GameMode {
  Duplicable, Unduplicable
}

export type ColorSetFilter = (colorSet: ColorSet) => boolean
export type int = number

interface Move {
  colorset: ColorSet
  hits: int
  blow: int
}

class GameState {
  public readonly nextPossiblePatterns: ColorSet[];

  constructor(public moves: Move[], private prevPossiblePatterns: ColorSet[]) {
    const patternFilter: ColorSetFilter = Solver.generatePatternFilter(moves[moves.length - 1])
    this.nextPossiblePatterns = Solver.filterPattern(this.prevPossiblePatterns, patternFilter)
  }
}

class __Solver {
  readonly colorList: Color[] = [Color.B, Color.R, Color.G, Color.Y, Color.P, Color.W]

  public colorSetToString = (colorSet: ColorSet): string => {
    return colorSet.map(c => Color[c]).join('')
  }

  public colorToString = (color: Color): string => {
    return Color[color]
  }

  public colorToColorCode = (color: Color): string => {
    switch (color) {
      case Color.B: return '#0000ff'
      case Color.R: return '#ff0000'
      case Color.G: return '#00ff00'
      case Color.Y: return '#ffff00'
      case Color.P: return '#ff00ff'
      case Color.W: return '#ffffff'
    }
  }

  public getRandomColor = (): Color => {
    return this.colorList[Math.floor(Math.random() * this.colorList.length)]
  }

  public getRandomSet = (): ColorSet => {
    return [this.getRandomColor(), this.getRandomColor(), this.getRandomColor(), this.getRandomColor()]
  }

  private colorSetMinus(colorSet: ColorSet, color: Color): ColorSet {
    return colorSet.filter(c => c !== color)
  }

  public generatePatterns = (gameMode: GameMode = GameMode.Duplicable): ColorSet[] => {
    switch (gameMode) {
      case GameMode.Unduplicable:
        return this.generatePatternsUnduplicable()
      case GameMode.Duplicable:
        return this.generatePatternsDuplicable()
    }
  }

  private generatePatternsUnduplicable = (basePattern: ColorSet = [], colorSubList: ColorSet = this.colorList): ColorSet[] => {
    var patterns: ColorSet[] = []
    for (let i = 0; i < colorSubList.length; i++) {
      const col = colorSubList[i]
      const pattern = basePattern.concat(col)
      if (pattern.length === 4) {
        patterns.push(pattern)
      } else {
        patterns = patterns.concat(this.generatePatternsUnduplicable(pattern, this.colorSetMinus(colorSubList, col)))
      }
    }
    return patterns
  }

  private generatePatternsDuplicable = (basePattern: ColorSet = [], colorSubList: ColorSet = this.colorList): ColorSet[] => {
    var patterns: ColorSet[] = []
    for (let i = 0; i < colorSubList.length; i++) {
      const col = colorSubList[i]
      const pattern = basePattern.concat(col)
      if (pattern.length === 4) {
        patterns.push(pattern)
      } else {
        patterns = patterns.concat(this.generatePatternsDuplicable(pattern, colorSubList))
      }
    }
    return patterns
  }

  private generatePatternFilterRegex = (move: Move): RegExp => {
    return new RegExp('^.*$')
  }

  public generatePatternFilter = (move: Move): ColorSetFilter => {
    const regex = this.generatePatternFilterRegex(move)

    return this.generatePatternFilterFunc(regex)
  }

  private generatePatternFilterFunc = (regex: RegExp): ColorSetFilter => {
    return (colorSet: ColorSet): boolean => {
      return true;
    };
  }

  public filterPattern = (colorSets: ColorSet[], filter: ColorSetFilter): ColorSet[] => {
    return colorSets.filter(filter)
  }
}

const Solver = new __Solver()

export default Solver
export { Color, GameMode }