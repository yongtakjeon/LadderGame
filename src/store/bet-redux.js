import { createStore } from 'redux';

function reducer(state, action) {
    if (state === undefined) {
        return {
            numOfBets: 6,
            bets: [],
            resultsBetIdx: []
        };
    }

    const newState = { ...state };
    if (action.type === 'setNumOfBets') {
        newState.numOfBets = action.numOfBets;
    }
    else if (action.type === 'setBets') {
        newState.bets = action.bets;
    }
    else if (action.type === 'setResultsBetIdx') {
        newState.resultsBetIdx = action.resultsBetIdx;
    }
    return newState;
}
const store = createStore(reducer);
export default store;