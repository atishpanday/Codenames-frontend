import axios from "axios";
import { CardType, RoundType } from "../types/dataTypes.ts";
import { shuffleArray } from "../utils/shuffleArray.ts";
import { SetStateAction } from "react";
import { backendUrl } from "../env_var.ts";

const fetchWords = async (
  setCards: (data: SetStateAction<CardType[]>) => void,
  setRound: (round: SetStateAction<RoundType>) => void
) => {
  const turn = Math.random() > 0.5 ? "red" : "blue";
  try {
    const response = await axios.get(`${backendUrl}?first=${turn}`);
    const data = response.data;
    setCards(shuffleArray(data));
    setRound({
      turn: turn,
      clue: "",
      numCardsLeft: 0,
      numIntendedWords: 0,
      isFetchingClues: false,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchWords;
