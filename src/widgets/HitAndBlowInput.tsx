import StateContextProp from '@/states/StateContextProp';
import React, { useContext } from 'react';
import Solver, { GameState, Move } from '../Solver';
import createStateContext from "../states/createStateContext";
import StateProvider from "../states/StateProvider";
import ColorSetVisualizer from './ColorSetVisualizer';

const InputStateContext = createStateContext<string>();
const HitStateContext = createStateContext<string>();
const BlowStateContext = createStateContext<string>();

type GameStatesContext = StateContextProp<GameState[]>

const HitAndBlowInputImpl = (props: { context: GameStatesContext }) => {
    const inputContext = useContext(InputStateContext);
    const hitContext = useContext(HitStateContext);
    const blowContext = useContext(BlowStateContext);
    const gameStatesContext = props.context;

    return <React.Fragment>
        input: <input type="text"
            value={inputContext.state}
            onChange={(e: any) => inputContext.setState(e.target.value)}
        />
        <ColorSetVisualizer value={Solver.stringToColorSet(inputContext.state)} key={0} />
        <br />
        &nbsp;hit: <input type="text"
            value={hitContext.state}
            onChange={(e: any) => hitContext.setState(e.target.value)}
        />
        <br />
        &nbsp;blow: <input type="text"
            value={blowContext.state}
            onChange={(e: any) => blowContext.setState(e.target.value)}
        />
        <br />
        <button onClick={() => {
            const input = Solver.stringToColorSet(inputContext.state)
            const hit = parseInt(hitContext.state)
            const blow = parseInt(blowContext.state)
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
            gameStatesContext.setState([new GameState()])

            inputContext.setState("")
            hitContext.setState("")
            blowContext.setState("")
        }}>RESET ALL!!</button>
    </React.Fragment >
}

const HitAndBlowInput = (props: { context: GameStatesContext }) => {
    return <StateProvider context={InputStateContext} defaultValue={""}>
        <StateProvider context={HitStateContext} defaultValue={""}>
            <StateProvider context={BlowStateContext} defaultValue={""}>
                <HitAndBlowInputImpl context={props.context} />
            </StateProvider>
        </StateProvider>
    </StateProvider>
}

export default HitAndBlowInput;