import React from 'react';
import Solver from '../Solver';
import ColorSetVisualizer from './ColorSetVisualizer';

const GameStatesVisualizer = () => {
  return <React.Fragment>
    {
      Solver.generatePatterns().map((pattern, index) => {
        return <ColorSetVisualizer key={index} value={pattern}></ColorSetVisualizer>
      })
    }
  </React.Fragment>
}

export default GameStatesVisualizer;