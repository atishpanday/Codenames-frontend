import axios from "axios";
import { CardType, RoundType } from "../types/dataTypes.ts";
import { SetStateAction } from "react";

const fetchClues = async (
    cards: CardType[],
    round: RoundType,
    setRound: (round: SetStateAction<RoundType>) => void) => {
    setRound(prev => ({ ...prev, isFetchingClues: true }));
    try {
        const response = await axios.post("http://127.0.0.1:5000/get-clue?turn=" + round.turn, cards);
        const data = response.data;
        console.log(data);
        setRound({
            turn: round.turn,
            clue: data.clue,
            numIntendedWords: data.num_intended_words,
            numCardsLeft: data.num_intended_words,
            isFetchingClues: false,
        });
    } catch (error) {
        console.log("Error fetching clue");
    }
}

export default fetchClues;