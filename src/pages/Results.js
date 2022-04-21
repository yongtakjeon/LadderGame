import { Avatar, Button, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Results = () => {
    const headerContent = 'Capture and save the results.';
    const bets = useSelector(state => state.bets);
    const resultsBetIdx = useSelector(state => state.resultsBetIdx);
    const navigate = useNavigate();

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
        marginBottom: '50px',
    };

    return <>
        <Header content={headerContent} />
        <Container sx={{ marginTop: '35px', marginBottom: '55px' }}>
            {
                resultsBetIdx.map((resultBetIdx, index) => {
                    return <Container key={index} sx={resultsStyles}>
                        <Typography variant='h6' color='success.main' sx={numberingStyles}>{index + 1})</Typography>
                        <Avatar alt={index + 1} src={`/images/${index + 1}.png`} sx={characterStyles}></Avatar>
                        <Typography variant='h6' sx={resultStyle}>{bets[resultBetIdx]}</Typography>
                    </Container>;
                })
            }
        </Container>
        <Button variant="contained" size='large' sx={replayButtonStyles} onClick={() => { navigate('/'); }}>↻ Replay</Button>
    </>;
};
export default Results;