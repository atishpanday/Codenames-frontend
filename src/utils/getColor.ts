import { CardColorType } from "../types/dataTypes";

export const getColor = (type: CardColorType) => {
    switch (type) {
        case 'red':
            return '#cc0000';
        case 'blue':
            return '#1E90FF';
        case 'bystander':
            return '#fffdd0';
        case 'assassin':
            return '#36454F';
        default:
            return '#ffffff';
    }
}