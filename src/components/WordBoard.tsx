import React from 'react';
import { Grid } from "@mui/material";
import { CardType, RoundType } from '../types/dataTypes.ts';
import WordCard from './WordCard.tsx';

type WordBoardProps = {
    cards: CardType[],
    round: RoundType,
    handleSelection: (card: CardType) => void,
}

const WordBoard = ({ cards, round, handleSelection }: WordBoardProps) => {

    return (
        <Grid container item spacing={2}>
            {cards.map((card, i) => {
                return (
                    <Grid key={i} item xs={2.4}>
                        <WordCard key={i} card={card} round={round} handleSelection={handleSelection} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default WordBoard;