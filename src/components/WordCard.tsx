import React from "react";
import { Box, Typography } from "@mui/material";
import { CardType, RoundType } from "../types/dataTypes.ts";
import { getColor } from "../utils/getColor.ts";

type WordCardProps = {
  card: CardType;
  round: RoundType;
  handleSelection: (card: CardType) => void;
};

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
  };

  return (
    <Box
      sx={{
        ...wordCardStyle,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: round.numCardsLeft > 0 ? "scale(1.05)" : "none",
          boxShadow:
            round.numCardsLeft > 0
              ? "0 4px 8px rgba(0,0,0,0.2)"
              : "2px 2px lightgray",
        },
      }}
      onClick={() => round.numCardsLeft > 0 && handleSelection(card)}
    >
      <Typography
        sx={{
          color: card.selected && card.type !== "bystander" ? "white" : "black",
          fontSize: 24,
          fontStyle: "italic",
          fontWeight: 500,
          letterSpacing: 1,
          textShadow: card.selected ? "1px 1px rgba(0,0,0,0.2)" : "none",
        }}
      >
        {card.word.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default WordCard;
