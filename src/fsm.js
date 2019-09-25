class FSM {
    constructor(config) {
        if (config == undefined) throw new Error();
        this.state = 'normal';
        this.stateList = [[],[]];
        this.config = config;
        this.states = [];
        for (let key in this.config.states) {
            this.states.push(key);
        }
    }

    getState() {
        return this.state;
    }

    changeState(state) {
        if (this.states.indexOf(state) == -1) {throw new Error()}

        if (state != this.state) {
            this.stateList[0].push(this.state);
        }
        this.state = state;
    }

    trigger(event) {
        let nowState = this.state;

        if (this.config.states[nowState].transitions[event] === undefined) {
            throw new Error();
        }

        this.stateList[0].push(nowState);
        this.state = this.config.states[nowState].transitions[event];
    }

    reset() {
        this.stateList = [[],[]];
        this.state = this.config.initial;
    }

    getStates(event) {
        if (event == undefined) return this.states;

        let states = [];

    for (let key in this.config.states) {
        if (this.config.states[key].transitions[event] != undefined) {
            states.push(key);
        }
    }

        return  states;
    }

    undo() {
        if (this.stateList[0].length == 0) return false;

        if (this.stateList[1] != this.state) {
            this.stateList[1].push(this.state);
        }
        this.state = this.stateList[0].pop();
        return true;
    }

    redo() {
        if (this.stateList[1].length == 0) return false;

        this.stateList[0].push(this.state);
        this.state = this.stateList[1].pop();

        return true;
    }

    clearHistory() {
        this.stateList = [[],[]];
    }
}

module.exports = FSM;
