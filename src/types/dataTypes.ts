export type CardType = {
    index: number,
    type: string | undefined,
    word: string,
    selected: boolean,
};

// export type CardColorType = 'red' | 'blue' | 'bystander' | 'assassin' | undefined;

export type RoundType = {
    turn: string | undefined,
    clue: string,
    numIntendedWords: number,
    numCardsLeft: number,
    isFetchingClues: boolean,
};

export type GameType = {
    inProgress: boolean,
    winner: string | undefined,
    gameOver: boolean,
};