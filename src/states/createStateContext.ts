import { createContext } from "react";
import StateContextProp from "./StateContextProp";

const createStateContext = <T,>() =>
    createContext({} as StateContextProp<T>);

export default createStateContext;