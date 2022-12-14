import React from 'react';
import Solver, { ColorSet } from '../Solver';

type Props = {
    value: ColorSet;
    key: number;
}
const ColorSetVisualizer = (props: Props) => {
    {
        return <div className="colorset">
            <React.Fragment>
                {
                    props.value.map((color, index) => {
                        return <span key={index} className={"color " + Solver.colorToString(color)}></span>
                    })
                }
            </React.Fragment>&nbsp;
            {
                props.value.length > 0 ?
                    <span><code>({Solver.colorSetToString(props.value)})</code></span>
                    : <React.Fragment></React.Fragment>
            }
        </div>
    }
}

export default ColorSetVisualizer;