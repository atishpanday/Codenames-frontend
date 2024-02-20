import axios from "axios";
import { CardType, RoundType } from "../types/dataTypes.ts";
import { shuffleArray } from "../utils/shuffleArray.ts";
import { SetStateAction } from "react";

const fetchWords = async (round: RoundType, setCards: (data: SetStateAction<CardType[]>) => void, setRound: (round: SetStateAction<RoundType>) => void) => {
    const turn = Math.random() > 0.5 ? "red" : "blue"
    try {
        const response = await axios.get("http://127.0.0.1:5000/", {
            params: {
                first: turn,
            },
        });
        const data = response.data;
        console.log(data)
        setCards(shuffleArray(data))
        setRound((prev) => ({ ...prev, turn: turn }))
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchWords;