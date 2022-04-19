import { Button, Container } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';
import styles from './BetSetting.module.css';

const BetSetting = () => {
    const context = useContext(BetContext);
    const navigate = useNavigate();
    const headerContent = "Write down your bets.";

    // for displaying characters and <input> tags
    let betNums = [];
    for (let i = 0; i < context.numOfBets; i++) {
        betNums.push(i + 1);
    }

    const drawLadder = () => {
        let canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';

            for (let i = 0; i < context.numOfBets; i++) {
                ctx.beginPath();
                ctx.moveTo(38 + i * 75, 20);
                ctx.lineTo(38 + i * 75, 360);
                ctx.stroke();
            }
        }
    };

    const gameStartHandler = () => {
        // check if there is an empty bet
        let bets = [];
        let isAllEntered = true;

        for (let i = 0; i < context.numOfBets; i++) {
            bets.push(document.getElementById(i + 1).value);
        }

        for (let i = 0; i < context.numOfBets; i++) {
            if (bets[i] === '') {
                isAllEntered = false;
            }
        }

        // if all the bets are entered
        if (isAllEntered === true) {
            // save the bets in Context, and navigate to 'ladder2' page
            context.setBets(bets);
            navigate('/ladder');
        }
        // if there is an empty bet
        else {
            alert('Enter all the bets!');
        }
    };

    useEffect(() => {
        drawLadder();
    }, []);

    return <>
        <Header content={headerContent} />
        <div className={styles.entire}>
            <div className={styles.characters}>
                {
                    betNums.map((betNum, index) => {
                        return <img key={index} alt={betNum} src={`/images/${betNum}.png`} width="55" className={styles.character}></img>;
                    })
                }
            </div>
            <canvas id="canvas" width={context.numOfBets * 75} height="375"></canvas>
            <div className={styles.inputs}>
                {
                    betNums.map((betNum, index) => {
                        return <input key={index} id={betNum} size="5" maxlength="7" className={styles.input}></input>;
                    })
                }
            </div>
        </div>

        <Container sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
            <Button variant="outlined" size="large" sx={{ mr: '20px' }} onClick={() => navigate(-1)}>Go Back</Button>
            <Button variant="contained" size="large" color='secondary' onClick={gameStartHandler}>Ladder Game Start</Button>
        </Container>
    </>;
};
export default BetSetting;