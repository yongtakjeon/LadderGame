import { Avatar, Button, Container, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';

const Results = () => {
    const context = useContext(BetContext);
    const navigate = useNavigate();

    const headerContent = 'Capture and save the results.';

    for (let i = 0; i < context.bets.length; i++) {
        console.log('Character ' + i + ' - ' + context.bets[context.resultsBetIdx[i]]);
    }

    // MUI styles
    const resultsStyles = {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 275,
    };
    const numberingStyles = {
        display: 'inline',
    };
    const characterStyles = {
        width: 55,
        height: 70,
        marginLeft: '15px',
        marginRight: '40px',
    };
    const resultStyle = {
        flexGrow: 1,
    };
    const replayButtonStyles = {
        display: 'block',
        margin: '0 auto',
        fontSize: '1.25rem',
    };

    return <>
        <Header content={headerContent} />
        <Container sx={{ marginTop: '35px', marginBottom: '55px' }}>
            {
                context.resultsBetIdx.map((resultBetIdx, index) => {
                    return <Container key={index} sx={resultsStyles}>
                        <Typography variant='h6' color='success.main' sx={numberingStyles}>{index + 1})</Typography>
                        <Avatar alt={index + 1} src={`/images/${index + 1}.png`} sx={characterStyles}></Avatar>
                        <Typography variant='h6' sx={resultStyle}>{context.bets[resultBetIdx]}</Typography>
                    </Container>;
                })
            }
        </Container>
        <Button variant="contained" size='large' sx={replayButtonStyles} onClick={() => { navigate('/'); }}>↻ Replay</Button>
    </>;
};
export default Results;