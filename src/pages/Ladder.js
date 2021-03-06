import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from './Ladder.module.css';

const Ladder = () => {
    const headerContent = 'After selecting each Marvel character for each person, click on the character to see the results.';
    const numOfBets = useSelector(state => state.numOfBets);
    const bets = useSelector(state => state.bets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let ladder = [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1]
    ];
    let paths = []; // the paths of each character
    let resultsBetIdx = [];
    let selectedCharacterIdx = -1;
    let checkedCharNums = [];

    const drawLadder = () => {
        let canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';

            // 1. for the basic ladder
            for (let i = 0; i < numOfBets; i++) {
                ctx.beginPath();
                ctx.moveTo(38 + i * 75, 20);
                ctx.lineTo(38 + i * 75, 360);
                ctx.stroke();
            }

            // 2. for the drawing full ladder
            // 2a) making basic ladder with 0, 1
            for (let i = 0; i < ladder.length; i++) {
                for (let j = 1; j < numOfBets; j++) {
                    ladder[i].push(0);
                    ladder[i].push(1);
                }
            }

            // 2b) making full ladder (adding horizontal ladder)
            // There are 2 rules for making horizontal ladder:
            // Rule 1 - There can't be two adjacent horizontal ladder
            // Rule 2 - There must be at least one horizontal ladder in one vertical ladder

            // if there is an empty line, loop again
            let hasEmptyLine;
            do {
                for (let i = 0; i < ladder.length; i++) {
                    for (let j = 1; j < ladder[0].length; j += 2) {

                        ladder[i][j] = Math.random() < 0.5 ? 0 : 1;

                        // there can't be two adjacent horizontal lines
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
            // 'ladderForDrawing' is 2d array which is sets of only horizontal part of the ladder.
            // By creating 'ladderForDrawing', it is easier to work with Canvas API drawing horizontal part of the ladder.
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

    const getResults = () => {
        // 1. go down the ladder and save the each path
        // The algorithm of going down the ladder:
        // 1) Check the left side if it is '1' -> If it is '1', go to the left side and go down 1 step
        // 2) Check the right side if it is '1' -> If it is '1', go to the right side and go down 1 step
        // 3) If both left and right side are '0', just go down 1 step
        // 4) Loop the above steps until it reaches the end of the ladder

        // The number of the paths would be the same with the number of bets.
        for (let i = 0; i < numOfBets; i++) {
            let x = 0;
            let y = i * 2;
            let thePath = [{ horizontal: 38 + 37.5 * y, vertical: 20 }];
            thePath.push({ horizontal: 38 + 37.5 * y, vertical: 70 });
            while (x !== 7) {
                if (y !== 0 && ladder[x][y - 1] === 1) {
                    y -= 2;
                    thePath.push({ horizontal: 38 + 37.5 * y, vertical: 70 + 40 * x });
                    x += 1;
                    thePath.push({ horizontal: 38 + 37.5 * y, vertical: 70 + 40 * x });
                }
                else if (y !== ladder[0].length - 1 && ladder[x][y + 1] === 1) {
                    y += 2;
                    thePath.push({ horizontal: 38 + 37.5 * y, vertical: 70 + 40 * x });
                    x += 1;
                    thePath.push({ horizontal: 38 + 37.5 * y, vertical: 70 + 40 * x });
                }
                else {
                    x += 1;
                    thePath.push({ horizontal: 38 + 37.5 * y, vertical: 70 + 40 * x });
                }
            }
            thePath.push({ horizontal: 38 + 37.5 * y, vertical: 360 });
            paths.push(thePath);
        }

        // 2. save the results
        // The first element of 'resultsBetIdx' is the index of 'bets' for the first character,
        // and the second, and the third...
        for (let i = 0; i < paths.length; i++) {
            resultsBetIdx.push((paths[i][paths[i].length - 1].horizontal - 38) / 75);
        }
    };

    const characterClickHandler = (characterNum) => {
        // if currently selected character is clicked again, do nothing. 
        if (characterNum === selectedCharacterIdx) {
            return;
        }

        let canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            // if selecting the character is not the first time, clear previous selected path
            if (selectedCharacterIdx !== -1) {
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'black';
                ctx.beginPath();
                ctx.moveTo(paths[selectedCharacterIdx][0].horizontal, paths[selectedCharacterIdx][0].vertical);
                for (let i = 1; i < paths[selectedCharacterIdx].length; i++) {
                    ctx.lineTo(paths[selectedCharacterIdx][i].horizontal, paths[selectedCharacterIdx][i].vertical);
                }
                ctx.stroke();
            }
            selectedCharacterIdx = characterNum;

            // go down the ladder
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(paths[characterNum][0].horizontal, paths[characterNum][0].vertical);

            if (checkedCharNums.includes(characterNum)) {
                // if this character's result is already checked before -> no animation
                for (let i = 1; i < paths[characterNum].length; i++) {
                    ctx.lineTo(paths[characterNum][i].horizontal, paths[characterNum][i].vertical);
                }
                ctx.stroke();
            }
            else {
                // if this character's result is about to check for the first time -> animation
                checkedCharNums.push(characterNum);
                let i = 0;
                let j = 0;
                const animationGoDown = () => {
                    if (i < paths[characterNum].length - 1) {
                        // draw vertical ladder
                        if (paths[characterNum][i].vertical < paths[characterNum][i + 1].vertical) {
                            const drawVerticalLine = () => {
                                j += 5; // animation speed
                                if (selectedCharacterIdx === characterNum) { // draw the line if another character is not clicked
                                    // if '[i].vertical + j' became greater than '[i + 1].vertical', just set it to '[i + 1].vertical'.
                                    // Otherwise, set it to '[i].vertical + j'
                                    if (paths[characterNum][i].vertical + j > paths[characterNum][i + 1].vertical) {
                                        ctx.lineTo(paths[characterNum][i].horizontal, paths[characterNum][i + 1].vertical);
                                    }
                                    else {
                                        ctx.lineTo(paths[characterNum][i].horizontal, paths[characterNum][i].vertical + j);
                                    }
                                    ctx.stroke();
                                }

                                let rafId = requestAnimationFrame(drawVerticalLine);

                                // highlight the bet which was just checked
                                if (paths[characterNum][i].vertical + j >= 360) {
                                    document.getElementById(`bet${resultsBetIdx[characterNum]}`).style.color = 'red';
                                }

                                // if '[i].vertical + j' became greater than '[i + 1].vertical', drawing vertical line has to be stopped.
                                if (paths[characterNum][i].vertical + j >= paths[characterNum][i + 1].vertical) {
                                    j = 0;
                                    i++;
                                    cancelAnimationFrame(rafId);
                                    animationGoDown();
                                }

                                // if another character is clicked while it goes down the ladder, just cancel this animation
                                if (selectedCharacterIdx !== characterNum) {
                                    cancelAnimationFrame(rafId);
                                    // highlight the bet which was checked
                                    document.getElementById(`bet${resultsBetIdx[characterNum]}`).style.color = 'red';
                                }
                            }
                            drawVerticalLine();
                        }
                        // draw right horizontal ladder
                        else if (paths[characterNum][i].horizontal < paths[characterNum][i + 1].horizontal) {
                            const drawRightHorizontalLine = () => {
                                j += 5; // animation speed
                                if (selectedCharacterIdx === characterNum) { // draw the line if another character is not clicked
                                    // if '[i].horizontal + j' became greater than '[i + 1].horizontal', just set it to '[i + 1].horizontal'.
                                    // Otherwise, set it to '[i].horizontal + j'
                                    if (paths[characterNum][i].horizontal + j > paths[characterNum][i + 1].horizontal) {
                                        ctx.lineTo(paths[characterNum][i + 1].horizontal, paths[characterNum][i].vertical);
                                    }
                                    else {
                                        ctx.lineTo(paths[characterNum][i].horizontal + j, paths[characterNum][i].vertical);
                                    }
                                    ctx.stroke();
                                }

                                let rafId = requestAnimationFrame(drawRightHorizontalLine);

                                // if '[i].horizontal + j' became greater than '[i + 1].horizontal', drawing right horizontal line has to be stopped.
                                if (paths[characterNum][i].horizontal + j >= paths[characterNum][i + 1].horizontal) {
                                    j = 0;
                                    i++;
                                    cancelAnimationFrame(rafId);
                                    animationGoDown();
                                }

                                // if another character is clicked while it goes down the ladder, just cancel this animation
                                if (selectedCharacterIdx !== characterNum) {
                                    cancelAnimationFrame(rafId);
                                    // highlight the bet which was checked
                                    document.getElementById(`bet${resultsBetIdx[characterNum]}`).style.color = 'red';
                                }
                            }
                            drawRightHorizontalLine();
                        }
                        // draw left horizontal ladder
                        else if (paths[characterNum][i].horizontal > paths[characterNum][i + 1].horizontal) {
                            const drawLeftHorizontalLine = () => {
                                j += 5; // animation speed
                                if (selectedCharacterIdx === characterNum) { // draw the line if another character is not clicked
                                    // if '[i].horizontal - j' became less than '[i + 1].horizontal', just set it to '[i + 1].horizontal'.
                                    // Otherwise, set it to '[i].horizontal - j'
                                    if (paths[characterNum][i].horizontal - j < paths[characterNum][i + 1].horizontal) {
                                        ctx.lineTo(paths[characterNum][i + 1].horizontal, paths[characterNum][i].vertical);
                                    }
                                    else {
                                        ctx.lineTo(paths[characterNum][i].horizontal - j, paths[characterNum][i].vertical);
                                    }
                                    ctx.stroke();
                                }

                                let rafId = requestAnimationFrame(drawLeftHorizontalLine);

                                // if '[i].horizontal - j' became less than '[i + 1].horizontal', drawing left horizontal line has to be stopped.
                                if (paths[characterNum][i].horizontal - j <= paths[characterNum][i + 1].horizontal) {
                                    j = 0;
                                    i++;
                                    cancelAnimationFrame(rafId);
                                    animationGoDown();
                                }

                                // if another character is clicked while it goes down the ladder, just cancel this animation
                                if (selectedCharacterIdx !== characterNum) {
                                    cancelAnimationFrame(rafId);
                                    // highlight the bet which was checked
                                    document.getElementById(`bet${resultsBetIdx[characterNum]}`).style.color = 'red';
                                }
                            }
                            drawLeftHorizontalLine();
                        }
                    }
                }
                animationGoDown();
            }

            // highlight the character which was just checked
            document.getElementById(`char${characterNum}`).style.opacity = '0.5';
        }
    };

    const resultsButtonHandler = () => {
        dispatch({ type: 'setResultsBetIdx', resultsBetIdx: resultsBetIdx });
        navigate('/results');
    };

    useEffect(() => {
        drawLadder();
        getResults();
    }, []);

    // MUI Styles
    const betStyles = {
        display: 'inline-block',
        width: '70px',
        margin: '0 2.5px',
    };
    const resultButtonStyles = {
        display: 'block',
        margin: '0 auto'
    };

    return <>
        <Header content={headerContent} />
        <div className={styles.entire}>
            <div className={styles.characters}>
                {
                    bets.map((bet, index) => {
                        return <img key={index} id={`char${index}`} alt={index + 1} src={`/images/${index + 1}.png`} width="55" className={styles.character}
                            onClick={() => characterClickHandler(index)} />;
                    })
                }
            </div>
            <canvas id="canvas" width={numOfBets * 75} height="375"></canvas>
            <div className={styles.bets}>
                {
                    bets.map((bet, index) => {
                        return <Typography key={index} id={`bet${index}`} sx={betStyles}>{bet}</Typography>;
                    })
                }
            </div>
        </div>
        <Button color='success' variant="contained" size="large" sx={resultButtonStyles} onClick={resultsButtonHandler}>View all results</Button>
    </>;
};
export default Ladder;