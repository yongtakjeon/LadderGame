import { createContext, useState } from "react";

export const BetContext = createContext({
    numOfBets: 0,
    setNumOfBets: () => { },
    bets: [],
    setBets: () => { }
});

const BetProvider = (props) => {
    const [numOfBets, setNumOfBets] = useState(6);
    const [bets, setBets] = useState([]);

    const contextValue = {
        numOfBets: numOfBets,
        setNumOfBets: setNumOfBets,
        bets: bets,
        setBets: setBets
    };

    return <BetContext.Provider value={contextValue}>
        {props.children}
    </BetContext.Provider>;
};

export default BetProvider;