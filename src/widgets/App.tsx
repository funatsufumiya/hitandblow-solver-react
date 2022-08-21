import React from 'react';
import Solver from '../Solver';
import HitAndBlowInput from './HitAndBlowInput';
import GameStatesVisualizer from './GameStatesVisualizer';

const App = () => {
  return <React.Fragment>
    <HitAndBlowInput />
    <GameStatesVisualizer />
  </React.Fragment>
}

export default App;