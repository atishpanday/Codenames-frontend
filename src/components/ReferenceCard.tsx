import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { CardType, RoundType } from '../types/dataTypes.ts';

import { getColor } from '../utils/getColor.ts';

type ReferenceCardProps = {
    cards: CardType[],
    round: RoundType,
    gameOver: boolean,
}

const ReferenceCard = ({ cards, round, gameOver }: ReferenceCardProps) => {
    const refCardStyle = {
        width: 240,
        padding: 20,
        backgroundColor: "#b5651d",
        boxShadow: `0 0 20px 5px ${getColor(round.turn)}`
    }
    return (
        <Paper style={refCardStyle}>
            <Grid container item spacing={1}>
                {cards.map((card, i) => (
                    <Grid key={i} item xs={2.4}>
                        <Box key={i} height={40} width={40} borderRadius={1} bgcolor={gameOver ? getColor(card.type) : "transparent"}></Box>
                    </Grid>
                ))}
            </Grid>
        </Paper >
    )
}

export default ReferenceCard;