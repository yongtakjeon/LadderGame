import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { BetContext } from '../store/bet-context';
import { Typography, Button, Container } from '@mui/material';

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

    // MUI styles
    const selectNumStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const numButtonStyle = {
        fontSize: '2.5rem',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        margin: '0 15px',
    };
    const startButtonStyle = {
        marginTop: '70px',
        fontSize: '3rem',
    };

    return <>
        <Header content={headerContent} />
        <Typography
            variant='h2'
            align='center'
            mt="110px"
            mb="2rem"
            fontWeight="bold"
            color='primary.dark'>
            Ladder Game
        </Typography>
        <Container sx={selectNumStyle}>
            <Button
                onClick={decreaseNum}
                color='warning'
                sx={numButtonStyle}>
                -
            </Button>
            <Typography sx={{ fontSize: '4rem' }}>{context.numOfBets}</Typography>
            <Button
                onClick={increaseNum}
                color='warning'
                sx={numButtonStyle}>
                +
            </Button>
        </Container>
        <Container sx={{ textAlign: 'center' }}>
            <Link to='/betSetting' style={{ textDecoration: 'none' }}>
                <Button
                    variant="contained"
                    size="large"
                    color='secondary'
                    sx={startButtonStyle}>
                    Start
                </Button>
            </Link>
        </Container>
    </>;

};

export default Main;