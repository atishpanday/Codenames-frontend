export type CardType = {
    index: number,
    type: CardColorType,
    word: string,
    selected: boolean,
}

export type CardColorType = 'red' | 'blue' | 'bystander' | 'assassin' | undefined;

export type RoundType = {
    turn: 'red' | 'blue' | undefined,
    clue: string,
    numIntendedWords: number,
    numCardsSelected: number,
}