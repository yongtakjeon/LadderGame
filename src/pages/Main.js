import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Typography, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';

const Main = () => {
    const headerContent = "Set the number of participant. Up to 12 people can play.";
    const dispatch = useDispatch();
    const [numOfBets, setNumOfBets] = useState(6);
    const navigate = useNavigate();

    const decreaseNum = () => {
        if (numOfBets > 2) {
            setNumOfBets(numOfBets - 1);
        }
    };

    const increaseNum = () => {
        if (numOfBets < 12) {
            setNumOfBets(numOfBets + 1);
        }
    };

    const startButtonHandler = () => {
        dispatch({ type: 'setNumOfBets', numOfBets: numOfBets });
        navigate('/betSetting');
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
            <Typography sx={{ fontSize: '4rem' }}>{numOfBets}</Typography>
            <Button
                onClick={increaseNum}
                color='warning'
                sx={numButtonStyle}>
                +
            </Button>
        </Container>
        <Container sx={{ textAlign: 'center' }}>
            <Button
                variant="contained"
                size="large"
                color='secondary'
                sx={startButtonStyle}
                onClick={startButtonHandler}>
                Start
            </Button>
        </Container>
    </>;

};

export default Main;