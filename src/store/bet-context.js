import { createContext, useState } from "react";

export const BetContext = createContext({
    numOfBets: 0,
    setNumOfBets: () => { },
    bets: [],
    setBets: () => { },
    resultsBetIdx: [],
    setResultsBetIdx: () => { }
});

const BetProvider = (props) => {
    const [numOfBets, setNumOfBets] = useState(6);
    const [bets, setBets] = useState([]);
    const [resultsBetIdx, setResultsBetIdx] = useState([]);

    const contextValue = {
        numOfBets: numOfBets,
        setNumOfBets: setNumOfBets,
        bets: bets,
        setBets: setBets,
        resultsBetIdx: resultsBetIdx,
        setResultsBetIdx: setResultsBetIdx
    };

    return <BetContext.Provider value={contextValue}>
        {props.children}
    </BetContext.Provider>;
};

export default BetProvider;