import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';
import styles from './Main.module.css';

const Main = () => {
    const context = useContext(BetContext);
    const headerContent = "Set the number of participant. Up to 12 people can play.";

    const decreaseNum = () => {
        if (context.numOfBets > 2) {
            context.setNumOfBets(context.numOfBets - 1);
        }
    };

    const increaseNum = () => {
        if (context.numOfBets < 12) {
            context.setNumOfBets(context.numOfBets + 1);
        }
    };


    return <div>
        <Header content={headerContent} />
        <div className={styles.title}>Ladder Game</div>
        <div className={styles.selectNum}>

            <button className={context.numOfBets === 2 ? styles.disabledButton : styles.button} onClick={decreaseNum}>-</button>
            <span className={styles.num}>{context.numOfBets}</span>
            <button className={context.numOfBets === 12 ? styles.disabledButton : styles.button} onClick={increaseNum}>+</button>

        </div>
        <Link to='/betSetting' className={styles.startButton}>Start</Link>
    </div>;
};

export default Main;