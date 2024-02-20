import axios from "axios";
import { CardType, RoundType } from "../types/dataTypes.ts";
import { SetStateAction } from "react";

const fetchClues = async (
    cards: CardType[],
    round: RoundType,
    setRound: (round: SetStateAction<RoundType>) => void,
    setIsFetchingClues: (f: SetStateAction<boolean>) => void) => {
    setIsFetchingClues(true);
    try {
        const response = await axios.post("http://127.0.0.1:5000/get-clue?turn=" + round.turn, cards);
        const data = response.data;
        setRound({
            turn: round.turn,
            clue: data.clue,
            numIntendedWords: data.num_intended_words,
            numCardsSelected: 0,
        });
        setIsFetchingClues(false);
    } catch (error) {
        console.log("Error fetching clue");
    }
}

export default fetchClues;