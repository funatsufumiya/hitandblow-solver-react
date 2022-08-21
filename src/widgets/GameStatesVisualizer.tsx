import StateContextProp from '@/states/StateContextProp';
import React from 'react';
import Solver, { GameState } from '../Solver';
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

const LastPossiblePatternsVisualizer = (props: { context: GameStatesContext }) => {
  const gameStatesContext = props.context;
  const gameStates = gameStatesContext.state;
  const patterns = gameStates.length > 1 ? gameStates[gameStates.length - 1].nextPossiblePatterns : gameStates[gameStates.length - 1].prevPossiblePatterns;

  return <React.Fragment>
    <h3>Possible Patterns</h3>
    <div className="patternsNum">count: {patterns.length}</div>
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

const GameStatesVisualizer = (props: { context: GameStatesContext }) => {
  return <React.Fragment>
    <MovesVisualizer context={props.context} />
    <LastPossiblePatternsVisualizer context={props.context} />
  </React.Fragment>
}

export default GameStatesVisualizer;