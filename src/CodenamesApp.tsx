import React, { useEffect, useState } from 'react';

import WordBoard from './components/WordBoard.tsx';

import { CardType, GameType, RoundType } from './types/dataTypes.ts';
import { Box, Button, CircularProgress, Grid, Modal, Typography } from '@mui/material';
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
        numCardsLeft: 0,
        isFetchingClues: false,
    });

    const [game, setGame] = useState<GameType>({
        inProgress: false,
        winner: undefined,
        gameOver: false,
    })

    const [selectedCard, setSelectedCard] = useState<CardType>({
        index: 0,
        type: undefined,
        word: "",
        selected: false,
    })

    const handleSelection = (card: CardType) => {
        setCards((prev) => prev.map((c) => card.index === c.index ? { ...c, selected: true } : c));
        setSelectedCard({ ...card, selected: true });

        if (card.type === "assassin") {
            setGame({
                inProgress: false,
                gameOver: true,
                winner: round.turn === "red" ? "blue" : "red",
            });
            return setRound({
                turn: undefined,
                clue: "",
                numCardsLeft: 0,
                numIntendedWords: 0,
                isFetchingClues: false,
            });
        }

        if (round.numCardsLeft === 1 ||
            card.type === "bystander" ||
            ((card.type === "red" && round.turn === "blue") ||
                (card.type === "blue" && round.turn === "red"))) {
            setRound(prev => ({
                ...prev,
                turn: prev.turn === "red" ? "blue" : "red",
                numCardsLeft: 0,
                numIntendedWords: 0,
                clue: "",
            }));
        }
        else {
            setRound(prev => ({
                ...prev,
                numCardsLeft: prev.numCardsLeft - 1,
            }))
        }
    }

    useEffect(() => {
        console.log("card selected");
        if (selectedCard.type === "red" || selectedCard.type === "blue") {
            let count = 0;
            for (let i = 0; i < cards.length; i = i + 1) {
                if (cards[i].selected && cards[i].type === selectedCard.type) {
                    count = count + 1;
                }
            }

            if (count === cards.filter(c => c.type === selectedCard.type).length) {
                setGame({
                    inProgress: false,
                    winner: selectedCard.type,
                    gameOver: true
                });
                return setRound({
                    turn: selectedCard.type === "red" ? "blue" : "red",
                    clue: "",
                    numCardsLeft: 0,
                    numIntendedWords: 0,
                    isFetchingClues: false,
                })
            }
        }
    }, [selectedCard]);

    return (
        <Box height={"100vh"} p={1}>
            <Grid container spacing={4}>
                <Grid item xs={9}>
                    <WordBoard cards={cards} round={round} handleSelection={handleSelection} />
                </Grid>
                <Grid item xs={3} alignSelf={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Typography fontSize={24} textAlign={"center"}>{`TURN: ${round.turn ? String(round.turn).toUpperCase() : ""}`}</Typography>
                    <ReferenceCard cards={cards} round={round} gameOver={game.gameOver} />
                </Grid>
                <Grid item xs={9}>
                    <Box height={140} borderRadius={2} boxShadow={`0 0 20px 5px ${getColor(round.turn)}`} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        {round.isFetchingClues ?
                            <CircularProgress /> :
                            <Typography fontStyle={"italic"} fontSize={40}>
                                {round.clue ?
                                    `${String(round.clue).toUpperCase()} ${round.numIntendedWords}` :
                                    (round.turn ? `GENERATE HINT FOR ${String(round.turn).toUpperCase()}` : "HINTS WILL BE DISPLAYED HERE")}
                            </Typography>
                        }
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box height={140} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-around"}>
                        <Button style={{ textTransform: "none", fontSize: "24px" }} variant={"outlined"} fullWidth onClick={() => fetchWords(setCards, setRound)}>
                            New Game
                        </Button>
                        <Button style={{ textTransform: "none", fontSize: "24px" }} variant={"contained"} fullWidth disabled={round.numCardsLeft > 0} onClick={() => round.numCardsLeft === 0 && fetchClues(cards, round, setRound)}>
                            Generate Hint
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Modal open={!game.inProgress} onClick={() => { }} sx={{ display: "flex", flexDirection: "column" }}>
                <Box padding={4} margin={"auto"} width={800} height={400} display={"flex"} flexDirection={"column"} justifyContent={"center"} bgcolor={"background.paper"} borderRadius={2}>
                    <Typography fontSize={80} color={"orange"} align={"center"}>CODENAMES</Typography>
                    {game.winner && <Typography fontSize={60} color={`${game.winner}`} align={"center"}>{`${String(game.winner).toUpperCase()} TEAM WON!`}</Typography>}
                    <Button style={{ textTransform: "none", fontSize: "24px" }} variant={"contained"} onClick={() => {
                        setGame({ winner: undefined, gameOver: false, inProgress: true });
                        fetchWords(setCards, setRound);
                    }}>
                        New Game
                    </Button>
                </Box>
            </Modal>
        </Box >
    );
}

export default CodenamesApp;
