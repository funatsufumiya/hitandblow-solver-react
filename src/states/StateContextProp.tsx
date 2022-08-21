import React from 'react';

type StateContextProp<T> = {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

export default StateContextProp;