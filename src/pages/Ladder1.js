import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';
import styles from './Ladder1.module.css';

const Ladder1 = () => {
    const headerContent = "Write down your bets.";
    const context = useContext(BetContext);
    const navigate = useNavigate();

    let betNums = [];
    for (let i = 0; i < context.numOfBets; i++) {
        betNums.push(i + 1);
    }


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

    const gameStartHandler = () => {
        // 1. save the value of each <input> tag to 'bets' context

        // 2. make the ladder
    };

    useEffect(() => {
        drawLadder();
    }, []);

    return <div>
        <Header content={headerContent} />
        <div className={styles.entire}>
            <div className={styles.characters}>
                {
                    betNums.map((betNum) => {
                        return <img alt={betNum} src={`/images/${betNum}.png`} width="55" className={styles.character}></img>;
                    })
                }
            </div>
            <canvas id="canvas" width={context.numOfBets * 75} height="415"></canvas>
            <div className={styles.inputs}>
                {
                    betNums.map((betNum) => {
                        return <input size="5" className={styles.input}></input>;
                    })
                }
            </div>
        </div>

        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={gameStartHandler}>Ladder Game Start</button>
    </div>;
};
export default Ladder1;