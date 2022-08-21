import React, { useContext } from 'react';
import Solver, { GameState } from '../Solver';
import HitAndBlowInput from './HitAndBlowInput';
import GameStatesVisualizer from './GameStatesVisualizer';
import createStateContext from "../states/createStateContext";
import StateProvider from "../states/StateProvider";

const GameStatesContext = createStateContext<GameState[]>();

const AppImpl = () => {
  const gameStatesContext = useContext(GameStatesContext);

  return <React.Fragment>
    <HitAndBlowInput context={gameStatesContext} />
    <hr />
    <GameStatesVisualizer context={gameStatesContext} />
  </React.Fragment>
}

const App = () => {
  return <StateProvider context={GameStatesContext} defaultValue={[new GameState()]}>
    <AppImpl />
  </StateProvider>
}

export default App;