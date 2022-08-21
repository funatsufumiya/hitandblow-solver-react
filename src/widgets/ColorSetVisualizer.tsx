import React from 'react';
import Solver, { ColorSet } from '../Solver';

type Props = {
    value: ColorSet;
    key: number;
}
const ColorSetVisualizer = (props: Props) => {
    {
        return <div className="colorset">
            {
                props.value.map((color, index) => {
                    return <span key={index} className={"color " + Solver.colorToString(color)}></span>
                })
            }
        </div>
    }
}

export default ColorSetVisualizer;