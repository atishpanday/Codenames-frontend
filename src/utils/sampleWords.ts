import { CardType } from "../types/dataTypes.ts";
import { shuffleArray } from "./shuffleArray.ts";

export const sampleWords = [
    "buffalo", "atlantis", "ice cream", "police", "foot", "contract", "charge", "parachute", "space", "forest", "pit", "death", "mass", "snow", "poison", "bug", "torch", "hollywood", "horseshoe", "cook", "card", "mine", "thumb", "sub", "piano",
];

export const sampleRed = [
    "buffalo", "atlantis", "ice cream", "police", "foot", "contract", "charge", "parachute",
];

export const sampleBlue = [
    "space", "forest", "pit", "death", "mass", "snow", "poison", "bug", "torch",
];

export const sampleBystanders = [
    "hollywood", "horseshoe", "cook", "card", "mine", "thumb", "sub",
];

export const sampleAssassin = "piano";

export const sampleCards = (): CardType[] => {
    let sampleCards: CardType[] = []

    for (let i = 0; i < sampleWords.length; i = i + 1) {
        sampleCards.push({
            index: i,
            word: sampleWords[i],
            type: undefined,
            selected: false
        })
    }

    for (let i = 0; i < sampleCards.length; i = i + 1) {
        if (i < 8) {
            sampleCards[i].type = 'red';
        }

        else if (i < 17) {
            sampleCards[i].type = 'blue';
        }

        else if (i < 24) {
            sampleCards[i].type = 'bystander';
        }

        else {
            sampleCards[i].type = 'assassin';
        }
    }

    return shuffleArray(sampleCards);
}