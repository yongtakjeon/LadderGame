import { useContext } from 'react';
import { BetContext } from '../store/bet-context';
import styles from './Results.module.css';

const Results = () => {
    const context = useContext(BetContext);

    for (let i = 0; i < context.bets.length; i++) {
        console.log('Character ' + i + ' - ' + context.bets[context.resultsBetIdx[i]]);
    }

    return <div>


    </div>;
};
export default Results;