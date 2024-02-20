import React, { useEffect, useState } from 'react';

import WordBoard from './components/WordBoard.tsx';

import { CardColorType, CardType, RoundType } from './types/dataTypes.ts';
import { Box, Button, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import ReferenceCard from './components/ReferenceCard.tsx';
import { getColor } from './utils/getColor.ts';
import fetchWords from './api/fetchWords.ts';
import fetchClues from './api/fetchClues.ts';

const CodenamesApp = () => {

    const [cards, setCards] = useState<CardType[]>(
        Array.from({ length: 25 }, () => ({
            index: 0,
            type: undefined,
            word: "",
            selected: false,
        }))
    );

    const [round, setRound] = useState<RoundType>({
        turn: undefined,
        clue: "",
        numIntendedWords: 0,
        numCardsSelected: 0,
    });

    const [isFetchingClues, setIsFetchingClues] = useState<boolean>(false);

    const [gameOver, setGameOver] = useState<boolean>(false);

    const [winnner, setWinner] = useState<CardColorType | undefined>();

    const handleSelection = (card: CardType) => {
        for (let i = 0; i < cards.length; i = i + 1) {
            if (card.word === cards[i].word) {
                setCards((prev) => prev.map((card, ind) => ind === i ? { ...card, selected: true } : card));
            }
        }

        if (card.type === "assassin") {
            setGameOver(true);
            setWinner(round.turn === "red" ? "blue" : "red");
            setRound({
                turn: undefined,
                clue: "",
                numCardsSelected: 0,
                numIntendedWords: 0,
            });
        }

        if (card.type !== round.turn) {
            return setRound(prev => ({
                ...prev,
                turn: prev.turn === "red" ? "blue" : "red",
                clue: "",
                numCardsSelected: 0,
                numIntendedWords: 0,
            }))
        }

        setRound(prev => ({
            ...prev,
            numCardsSelected: prev.numCardsSelected + 1
        }));
    }

    useEffect(() => {
        if (round.numCardsSelected === round.numIntendedWords) {
            if (round.turn === "red") {
                setRound(prev => ({ ...prev, turn: "blue" }))
            }
            else if (round.turn === "blue") {
                setRound(prev => ({ ...prev, turn: "red" }))
            }
        }
    }, [round.numCardsSelected])

    return (
        <Box height={"100vh"} p={1}>
            <Grid container spacing={4}>
                <Grid item xs={9}>
                    <WordBoard cards={cards} round={round} handleSelection={handleSelection} />
                </Grid>
                <Grid item xs={3} alignSelf={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Typography fontSize={24} textAlign={"center"}>{`TURN: ${round.turn ? String(round.turn).toUpperCase() : ""}`}</Typography>
                    <ReferenceCard cards={cards} round={round} gameOver={gameOver} />
                </Grid>
                <Grid item xs={9}>
                    <Box height={140} borderRadius={2} boxShadow={`0 0 20px 5px ${getColor(round.turn)}`} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        {isFetchingClues ?
                            <CircularProgress /> :
                            <Typography fontStyle={"italic"} fontSize={40}>
                                {`${round.clue ? String(round.clue).toUpperCase() : ""} ${round.numIntendedWords > 0 ? round.numIntendedWords : ""}`}
                            </Typography>
                        }
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box height={140} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-around"}>
                        <Button style={{ textTransform: "none", fontSize: "24px" }} variant={"outlined"} fullWidth onClick={() => fetchWords(round, setCards, setRound)}>
                            New Game
                        </Button>
                        <Button style={{ textTransform: "none", fontSize: "24px" }} variant={"contained"} fullWidth onClick={() => fetchClues(cards, round, setRound, setIsFetchingClues)}>
                            Generate Hint
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={gameOver} onClose={() => { }} message={`${String(winnner).toUpperCase()} TEAM WON!`} autoHideDuration={2000} />
        </Box >
    );
}

export default CodenamesApp;
