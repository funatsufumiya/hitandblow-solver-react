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

  public calcHitAndBlow(colorSet: ColorSet) {
    let hits = 0
    let blow = 0
    for (let i = 0; i < colorSet.length; i++) {
      if (colorSet[i] == this.colorSet[i]) {
        hits++
      } else if (this.colorSet.includes(colorSet[i])) {
        blow++
      }
    }
    return new Move(colorSet, hits, blow)
  }

  public matchPattern(colorSet: ColorSet) {
    let move = this.calcHitAndBlow(colorSet)
    return move.hits == this.hits && move.blow == this.blow
  }
}

class GameState {
  public readonly nextPossiblePatterns: ColorSet[];

  constructor(public moves: Move[] = [], public prevPossiblePatterns: ColorSet[] = [], public gameMode: GameMode = GameMode.Duplicable) {
    if (prevPossiblePatterns.length == 0 && moves.length <= 1) {
      this.prevPossiblePatterns = Solver.generatePatterns(gameMode)
    }

    if (moves.length > 0) {
      const patternFilter: ColorSetFilter = Solver.generatePatternFilter(moves[moves.length - 1])
      this.nextPossiblePatterns = Solver.filterPattern(this.prevPossiblePatterns, patternFilter)
    } else {
      this.nextPossiblePatterns = this.prevPossiblePatterns
    }
  }

  public goNext(move: Move) {
    return new GameState(this.moves.concat([move]), this.nextPossiblePatterns, this.gameMode)
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

  public generatePatternFilter = (move: Move): ColorSetFilter => {
    return this.generatePatternFilterFunc(move)
  }

  private generatePatternFilterFunc = (move: Move): ColorSetFilter => {
    return (colorSet: ColorSet): boolean => {
      return move.matchPattern(colorSet);
    };
  }

  public filterPattern = (colorSets: ColorSet[], filter: ColorSetFilter): ColorSet[] => {
    return colorSets.filter(filter)
  }
}

const Solver = new __Solver()

export default Solver
export { Color, GameMode, Move, GameState }