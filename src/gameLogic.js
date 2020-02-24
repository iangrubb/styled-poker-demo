

export const playerAngle = (position, total) => ((2 * position * Math.PI) / (total + 1)) + (Math.PI / 2)


const shuffle = array => array.sort(() => Math.random() - 0.5 )


const correctedRotation = (previousRotation, targetRotation) => {

    // Logic here is meant to ensure minimum card rotation

    if (targetRotation > previousRotation) {
        if (targetRotation - previousRotation < 180 - targetRotation + previousRotation) {
            return targetRotation
        } else {
            return targetRotation - 180
        }
    } else {
        if (previousRotation - targetRotation < 180 - previousRotation + targetRotation) {
            return targetRotation
        } else {
            return targetRotation + 180
        }
    }
}


const updateCardData = component => (id, update) => {

    const found = component.state.cardData[id]

    const before = component.state.cardData.filter( (c, idx) => idx < id )

    const after = component.state.cardData.filter( (c, idx) => idx > id )

    component.setState({cardData: [...before, {...found, ...update}, ...after]})

}



// Remove items from game state

const getDeckTop = component => {
    const cardId = component.state.deck[component.state.deck.length - 1]
    component.setState({deck: component.state.deck.filter(n => n !== cardId)})
    return cardId
}

const getHand = component => playerId => {
    const hand = component.state.hands[playerId]
    component.setState({hands: component.state.hands.map((h, idx) => idx === playerId ? [] : h)})
    return hand
}



// Add items to game state

const addToHand = component => (cardId, playerId, turn) => {

    console.log(this)


    // // Corrected Rotation

    // const targetRotation = ((playerAngle(playerId) * (180 / Math.PI)) + 90) % 180

    // const previousRotation = component.state.cardData[cardId].rotation

    // const rotation = correctedRotation(previousRotation, targetRotation)


    // // Base table position

    // const x = 34 * Math.cos(playerAngle(playerId))

    // const y = 32 * Math.sin(playerAngle(playerId))

    // const z = component.state.hands[playerId].length / 4


    // // Card orientation check


    // // Flips calculation


    // // Shift calculation

    // const inverted = rotation < 0

    // const leftSide = x < 0

    // const normal = (inverted && leftSide) || (!inverted && !leftSide)




    // // Check number of flips for this

    // const shiftX = turn ?
    //     (2 * (normal ? -1 : 1) ) - (this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2) :
    //     this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2
        


    // const shiftY = turn ?
    //     (this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2) + 6 * (normal ? 1 : -1) :
    //     this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2
        


    // const flips = 0


    // const update = { x, y, z, rotation, flips, shiftX, shiftY }

    // this.setState({hands: this.state.hands.map((h, idx) => idx === playerId ? [...this.state.hands[idx], cardId] : h)})

    // this.updateCard(cardId, update)
}












// Exposed Functions

const dealToPlayer = component => playerId => () => {

    const cardId = getDeckTop(component)

    addToHand(component)(cardId, playerId, true)

}


export const playerActions = component => id => ([

    {text: "Deal", clickHandler: dealToPlayer(component)(id)}

])


export const dealerActions = component => ([

    {text: "dealer test", clickHandler: () => console.log(component)}

])