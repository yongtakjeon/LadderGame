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

            // 1. for the basic ladder
            for (let i = 0; i < context.numOfBets; i++) {
                ctx.beginPath();
                ctx.moveTo(38 + i * 75, 20);
                ctx.lineTo(38 + i * 75, 360);
                ctx.stroke();
            }

            // 2. for the drawing full ladder
            let ladder = [
                [1],
                [1],
                [1],
                [1],
                [1],
                [1],
                [1]
            ];

            // 2a) making basic ladder with 0, 1
            for (let i = 0; i < ladder.length; i++) {
                for (let j = 1; j < context.numOfBets; j++) {
                    ladder[i].push(0);
                    ladder[i].push(1);
                }
            }

            // 2b) making full ladder
            // if there is an empty line, loop again
            let hasEmptyLine;
            do {
                for (let i = 0; i < ladder.length; i++) {
                    for (let j = 1; j < ladder[0].length; j += 2) {

                        ladder[i][j] = Math.random() < 0.5 ? 0 : 1;

                        // there can't be two adjacent lines
                        if (j !== 1 && ladder[i][j - 2] === 1) {
                            ladder[i][j] = 0;
                        }
                    }
                }

                // check if there is an empty line
                hasEmptyLine = false;
                for (let j = 1; j < ladder[0].length; j += 2) {
                    let onlyZero = true;
                    for (let i = 0; i < ladder.length; i++) {
                        if (ladder[i][j] === 1) {
                            onlyZero = false;
                        }
                    }
                    if (onlyZero) {
                        hasEmptyLine = true;
                    }
                }
                console.table(ladder);
            } while (hasEmptyLine);

            // now, based on the 2d array, 'ladder', draw the full ladder
            let ladderForDrawing = [];
            for (let i = 0; i < ladder.length; i++) {
                let oneRow = [];
                for (let j = 1; j < ladder[0].length; j += 2) {
                    oneRow.push(ladder[i][j]);
                }
                ladderForDrawing.push(oneRow);
            }

            ctx.beginPath();
            for (let i = 0; i < ladderForDrawing.length; i++) {
                for (let j = 0; j < ladderForDrawing[0].length; j++) {
                    if (ladderForDrawing[i][j] === 1) {
                        ctx.moveTo(38 + j * 75, 70 + i * 40);
                        ctx.lineTo(38 + (j + 1) * 75, 70 + i * 40);
                    }
                }
            }
            ctx.stroke();

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
            <canvas id="canvas" width={context.numOfBets * 75} height="375"></canvas>
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