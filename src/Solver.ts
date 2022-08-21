import unimplemented from 'ts-unimplemented'

enum Color {
  B, R, G, Y, P, W
}

export type ColorSet = Color[]

enum GameMode {
  Duplicable, Unduplicable
}

export type ColorSetFilter = (colorSet: ColorSet) => boolean
export type int = number

class Move {

  constructor(public colorSet: ColorSet, public hits: int, public blow: int) {
  }

  public static parseEach(colorsetStr: string, hits: int, blow: int): Move {
    return new Move(Solver.stringToColorSet(colorsetStr), hits, blow)
  }

  public static parse(str: string): Move {
    let parts = str.split(",")
    return this.parseEach(parts[0], parseInt(parts[1]), parseInt(parts[2]))
  }
}

class GameState {
  public readonly nextPossiblePatterns: ColorSet[];

  constructor(public moves: Move[], private prevPossiblePatterns: ColorSet[], gameMode: GameMode = GameMode.Duplicable) {
    if (prevPossiblePatterns.length == 0 && moves.length == 1) {
      this.prevPossiblePatterns = Solver.generatePatterns(gameMode)
    }

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

  public stringToColorSet = (colorSetStr: string): ColorSet => {
    return colorSetStr.toUpperCase().split('').map(c => (<any>Color)[c])
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

  private getRegExpSourceContent = (regex: RegExp): string => {
    let s = regex.source
    if (s.startsWith('^')) {
      s = s.substring(1)
    }
    if (s.endsWith('$')) {
      s = s.substring(0, s.length - 1)
    }
    return s
  }

  private generatePatternFilterRegex = (move: Move): RegExp => {
    let str = "";
    if (move.blow == 0) {
      let s = this.colorSetToString(move.colorSet)
      if (move.hits == 1) {
        str = s[0] + "..."
        str += "|." + s[1] + ".."
        str += "|.." + s[2] + "."
        str += "|..." + s[3] + ""
      } else if (move.hits == 2) {
        str = s[0] + s[1] + ".."
        str += "|" + s[0] + "." + s[2] + "."
        str += "|" + s[0] + ".." + s[3]
        str += "|." + s[1] + s[2] + "."
        str += "|." + s[1] + "." + s[3]
        str += "|.." + s[2] + s[3]
      } else if (move.hits == 3) {
        str = s[0] + s[1] + s[2] + "."
        str += "|" + s[0] + s[1] + "." + s[3]
        str += "|" + s[0] + "." + s[2] + s[3]
        str += "|." + s[1] + s[2] + s[3]
      } else if (move.hits == 4) {
        str = s
      } else {
        return unimplemented()
      }
    } else if (move.hits == 0) {
      let s = this.colorSetToString(move.colorSet)
      if (move.blow == 1) {
        let e = ""
        str = ""
        e = "[^" + s[3] + "]"
        str += s[0] + s[1] + s[2] + e
        str += s[0] + s[2] + s[1] + e
        str += s[1] + s[2] + s[0] + e
        str += s[2] + s[1] + s[0] + e
        str += s[1] + s[0] + s[2] + e
        str += s[2] + s[0] + s[1] + e

        e = "[^" + s[0] + "]"
        str += e + s[1] + s[2] + s[3]
        str += e + s[1] + s[3] + s[2]
        str += e + s[2] + s[1] + s[3]
        str += e + s[3] + s[1] + s[2]
        str += e + s[2] + s[3] + s[1]
        str += e + s[3] + s[2] + s[1]

        e = "[^" + s[1] + "]"
        str += s[0] + e + s[2] + s[3]
        str += s[0] + e + s[3] + s[2]
        str += s[2] + e + s[0] + s[3]
        str += s[3] + e + s[0] + s[2]
        str += s[2] + e + s[3] + s[0]
        str += s[3] + e + s[2] + s[0]

        e = "[^" + s[2] + "]"
        str += s[0] + s[1] + e + s[3]
        str += s[0] + s[3] + e + s[1]
        str += s[1] + s[0] + e + s[3]
      } else {
        return unimplemented()
      }
    } else {
      return unimplemented()
    }
    return new RegExp("^" + str + "$")
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
export { Color, GameMode, Move }