import StateContextProp from '@/states/StateContextProp';
import React from 'react';
import Solver, { ColorSet, GameState } from '../Solver';
import ColorSetVisualizer from './ColorSetVisualizer';

type GameStatesContext = StateContextProp<GameState[]>

const MovesVisualizer = (props: { context: GameStatesContext }) => {
  const gameStatesContext = props.context;
  const gameStates = gameStatesContext.state;
  const moves = gameStates.length > 0 ? gameStates[gameStates.length - 1].moves : [];
  return <React.Fragment>
    <h3>Moves</h3>
    <div className="moves">
      {
        moves.length > 0 ?
          moves.map((move, index) => {
            return <div key={index}>
              <ColorSetVisualizer value={move.colorSet} key={index} />
              <span>hits: {move.hits}</span>&nbsp;
              <span>blow: {move.blow}</span>
            </div>
          })
          : <span>no moves</span>
      }
    </div>
  </React.Fragment>
}

const PossiblePatternsVisualizer = (props: { patterns: ColorSet[] }) => {
  const patterns = props.patterns;

  return <React.Fragment>
    <div className="patternsNum">total: {patterns.length} patterns</div>
    <br />
    <div className="patterns">
      {
        patterns.map((pattern, index) => {
          return <div key={index}>
            <ColorSetVisualizer value={pattern} key={index} />
          </div>
        })
      }
    </div>
  </React.Fragment>
}

const PrevPossiblePatternsVisualizer = (props: { context: GameStatesContext }) => {
  const gameStatesContext = props.context;
  const gameStates = gameStatesContext.state;

  if (gameStates.length < 2) {
    return <React.Fragment></React.Fragment>
  } else {
    return <React.Fragment>
      <h3>Possible Patterns History</h3>
      <div className="prev-possible-patterns">

        {
          gameStates.map((gameState, index) => {
            const move = gameState.moves[gameState.moves.length - 1];
            const moveColorSetStr = move ? Solver.colorSetToString(move.colorSet) : "(init)";
            return <details>
              <summary>#{index + 1}: {moveColorSetStr}</summary>
              <PossiblePatternsVisualizer patterns={gameState.nextPossiblePatterns} />
            </details>
          })
        }
      </div>
    </React.Fragment >
  }
}

const LastPossiblePatternsVisualizer = (props: { context: GameStatesContext }) => {
  const gameStatesContext = props.context;
  const gameStates = gameStatesContext.state;
  const patterns = gameStates.length > 1 ? gameStates[gameStates.length - 1].nextPossiblePatterns : gameStates[gameStates.length - 1].prevPossiblePatterns;

  return <React.Fragment>
    <h3>Possible Patterns</h3>
    <details open={true}>
      <summary>patterns</summary>
      <div className="possible-patterns">
        <PossiblePatternsVisualizer patterns={patterns} />
      </div>
    </details>
  </React.Fragment>
}

const GameStatesVisualizer = (props: { context: GameStatesContext }) => {
  return <React.Fragment>
    <MovesVisualizer context={props.context} />
    <LastPossiblePatternsVisualizer context={props.context} />
    <PrevPossiblePatternsVisualizer context={props.context} />
  </React.Fragment>
}

export default GameStatesVisualizer;