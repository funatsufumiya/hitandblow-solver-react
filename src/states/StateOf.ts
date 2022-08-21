class StateOf<T> {
    constructor(t: T) {
        this.instance = t
    }

    instance: T
}

export default StateOf;