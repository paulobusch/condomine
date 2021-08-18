export class ReducerBase {
    constructor(initialState) {
        this.initialState = initialState;

        this.execute = this.execute.bind(this);
    }

    execute(state, action) { 
        return state;
    }
}