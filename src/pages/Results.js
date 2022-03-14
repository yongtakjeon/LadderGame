import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';
import styles from './Results.module.css';

const Results = () => {
    const context = useContext(BetContext);
    const navigate = useNavigate();

    const headerContent = 'Capture and save the results.'

    for (let i = 0; i < context.bets.length; i++) {
        console.log('Character ' + i + ' - ' + context.bets[context.resultsBetIdx[i]]);
    }


    return <div>
        <Header content={headerContent} />
        {
            context.resultsBetIdx.map((resultBetIdx, index) => {
                return <div key={index} className={styles.results}>
                    <span className={styles.numbering}>{index + 1})</span>
                    <img alt={index + 1} src={`/images/${index + 1}.png`} width="55" className={styles.character}></img>
                    <span className={styles.result}>{context.bets[resultBetIdx]}</span>
                </div>;
            })
        }
        <button onClick={() => { navigate('/'); }}>↻ Replay</button>

    </div>;
};
export default Results;