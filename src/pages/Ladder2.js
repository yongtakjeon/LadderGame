import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';
import styles from './Ladder2.module.css';

const Ladder2 = () => {
    const context = useContext(BetContext);
    const navigate = useNavigate();
    const headerContent = 'After selecting each Marvel character for each person, click on the character to see the results.';

    const drawLadder = () => {
        let canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            for (let i = 0; i < context.numOfBets; i++) {
                ctx.beginPath();
                ctx.moveTo(38 + i * 75, 20);
                ctx.lineTo(38 + i * 75, 400);
                ctx.stroke();
            }
        }
    };

    useEffect(() => {
        drawLadder();
    }, []);

    return <div>
        <Header content={headerContent} />
        <div className={styles.entire}>
            <div className={styles.characters}>
                {
                    context.bets.map((bet, index) => {
                        return <img key={index} alt={index + 1} src={`/images/${index + 1}.png`} width="55" className={styles.character}></img>;
                    })
                }
            </div>
            <canvas id="canvas" width={context.numOfBets * 75} height="415"></canvas>
            <div className={styles.bets}>
                {
                    context.bets.map((bet, index) => {
                        return <span key={index} className={styles.bet}>{bet}</span>;
                    })
                }
            </div>
        </div>
        <button onClick={() => navigate('/results')}>View all results</button>
    </div>;
};
export default Ladder2;