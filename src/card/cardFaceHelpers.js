

export const deriveColor = suit => suit === "heart" || suit === "diamond" ? "#E0477A" : "#261F26"

export const deriveSymbol = suit => {
    switch(suit) {
        case "heart":
            return "♥"
        case "diamond":
            return "♦"
        case "spade":
            return "♠"
        case "club":
            return "♣"
        default:
            return "error"
    }
}

export const derivePips = rank => {
    switch(rank) {
        case "2":
            return [{row: 1, column: 2},{row: 13, column: 2, invert: true}]
        case "3":
            return [{row: 1, column: 2}, {row: 7, column: 2}, {row: 13, column: 2, invert: true}]
        case "4":
            return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 13, column: 1, invert: true}, {row: 13, column: 3, invert: true}]
        case "5":
            return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 2}, {row: 13, column: 1, invert: true}, {row: 13, column: 3, invert: true}]
        case "6":
            return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 1}, {row: 7, column: 3} ,{row: 13, column: 1, invert: true},
                    {row: 13, column: 3, invert: true}]
        case "7":
            return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 1}, {row: 7, column: 3} ,{row: 13, column: 1, invert: true},
                    {row: 13, column: 3, invert: true}, {row: 4, column: 2}]
        case "8":
            return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 1}, {row: 7, column: 3} ,{row: 13, column: 1, invert: true},
                    {row: 13, column: 3, invert: true}, {row: 4, column: 2}, {row: 10, column: 2, invert: true}]
        case "9":
            return [{row: 1, column: 1}, {row: 5, column: 1}, {row: 9, column: 1, invert: true}, {row: 13, column: 1, invert: true}, {row: 1, column: 3},
                    {row: 5, column: 3}, {row: 9, column: 3, invert: true}, {row: 13, column: 3, invert: true}, {row: 7, column: 2}]
        case "10":
            return [{row: 1, column: 1}, {row: 5, column: 1}, {row: 9, column: 1, invert: true}, {row: 13, column: 1, invert: true}, {row: 1, column: 3},
                    {row: 5, column: 3}, {row: 9, column: 3, invert: true}, {row: 13, column: 3, invert: true}, {row: 3, column: 2}, {row: 11, column: 2, invert: true}]
        default:
            return null
    }
}

export const deriveType = rank => {
    if (rank === "A") {
        return "ace"
    } else if (["J", "Q", "K"].includes(rank)) {
        return "face"
    } else {
        return "number"
    }
}