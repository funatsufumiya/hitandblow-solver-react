import React, { PropsWithChildren, useState } from "react";
import StateContextProp from "./StateContextProp";

interface Prop<T> {
    context: React.Context<StateContextProp<T>>,
    defaultValue: T
}

const StateProvider = <T,>(props: PropsWithChildren<Prop<T>>) => {
    const [state, setState] = useState(props.defaultValue);
    return React.createElement(props.context.Provider, {
        value: { state, setState }
    }, props.children);
}

export default StateProvider;