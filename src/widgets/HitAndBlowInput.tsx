import StateContextProp from '@/states/StateContextProp';
import React, { useContext } from 'react';
import { validateLocaleAndSetLanguage } from 'typescript';
import Solver, { GameMode, GameState, Move } from '../Solver';
import createStateContext from "../states/createStateContext";
import StateProvider from "../states/StateProvider";
import ColorSetVisualizer from './ColorSetVisualizer';

const GameModeStateContext = createStateContext<GameMode>();
const InputStateContext = createStateContext<string>();
const HitStateContext = createStateContext<string>();
const BlowStateContext = createStateContext<string>();

type GameStatesContext = StateContextProp<GameState[]>

const HitAndBlowInputImpl = (props: { context: GameStatesContext }) => {
    const gameModeContext = useContext(GameModeStateContext);
    const inputContext = useContext(InputStateContext);
    const hitContext = useContext(HitStateContext);
    const blowContext = useContext(BlowStateContext);
    const gameStatesContext = props.context;

    const changeGameMode = (gameMode: GameMode) => {
        gameStatesContext.setState([new GameState([], [], gameMode)])

        inputContext.setState("")
        hitContext.setState("")
        blowContext.setState("")
    }

    const reset = () => {
        gameStatesContext.setState([new GameState([], [], gameModeContext.state)])

        inputContext.setState("")
        hitContext.setState("")
        blowContext.setState("")
    }

    return <React.Fragment>
        is duplicable : <input type="checkbox"
            checked={gameModeContext.state === GameMode.Duplicable}
            onChange={(e) => {
                const val = e.target.checked ? GameMode.Duplicable : GameMode.Unduplicable
                gameModeContext.setState(val);
                changeGameMode(val)
            }} />
        <br />
        <br />
        input: <input type="text"
            value={inputContext.state}
            onChange={(e: any) => inputContext.setState(e.target.value)}
        /> (ex: brgw)
        <ColorSetVisualizer value={Solver.stringToColorSet(inputContext.state)} key={0} />
        <br />
        &nbsp;hit: <input type="text"
            value={hitContext.state}
            onChange={(e: any) => hitContext.setState(e.target.value)}
        /> (ex: 1)
        <br />
        &nbsp;blow: <input type="text"
            value={blowContext.state}
            onChange={(e: any) => blowContext.setState(e.target.value)}
        /> (ex: 0)
        <br />
        <button onClick={() => {
            const input = Solver.stringToColorSet(inputContext.state)
            const hit = parseInt(hitContext.state) || 0;
            const blow = parseInt(blowContext.state) || 0;
            const gameStates = gameStatesContext.state
            const move = new Move(input, hit, blow)

            const nextGameState = gameStates[gameStates.length - 1].goNext(move)
            gameStatesContext.setState([...gameStates, nextGameState])

            inputContext.setState("")
            hitContext.setState("")
            blowContext.setState("")
        }}>submit</button>

        <br /><br />

        <button onClick={() => {
            reset()
        }}>RESET ALL!!</button>
    </React.Fragment >
}

const HitAndBlowInput = (props: { context: GameStatesContext }) => {
    return <StateProvider context={GameModeStateContext} defaultValue={GameMode.Duplicable}>
        <StateProvider context={InputStateContext} defaultValue={""}>
            <StateProvider context={HitStateContext} defaultValue={""}>
                <StateProvider context={BlowStateContext} defaultValue={""}>
                    <HitAndBlowInputImpl context={props.context} />
                </StateProvider>
            </StateProvider>
        </StateProvider>
    </StateProvider>
}

export default HitAndBlowInput;