import React from 'react';
import { Box, Typography } from '@mui/material';
import { CardType, RoundType } from '../types/dataTypes.ts';
import { getColor } from '../utils/getColor.ts';

type WordCardProps = {
    card: CardType,
    round: RoundType,
    handleSelection: (card: CardType) => void,
}

const WordCard = ({ card, round, handleSelection }: WordCardProps) => {

    const wordCardStyle = {
        height: 100,
        width: 200,
        borderRadius: 5,
        backgroundColor: !card.selected ? "#f1c27d" : getColor(card.type),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "2px 2px lightgray",
        cursor: round.numCardsLeft === 0 ? "not-allowed" : "pointer",
    }

    return (
        <Box style={wordCardStyle} onClick={() => round.numCardsLeft > 0 && handleSelection(card)}>
            <Typography color={card.selected && card.type !== 'bystander' ? 'white' : 'black'} fontSize={"large"} fontStyle={"italic"}>
                {card.word.toUpperCase()}
            </Typography>
        </Box>
    )
}

export default WordCard;