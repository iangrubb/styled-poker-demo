
export const playerAngle = (position, total) => ((2 * position * Math.PI) / (total + 1)) + (Math.PI / 2)


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


const updateCardData = component => (ids, updates) => {

    const oldCards = component.state.cardData

    const newCards = oldCards.map( (c, idx) => ids.includes(idx) ? {...c, ...updates[ids.indexOf(idx)]} : c )

    component.setState({cardData: newCards})

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

const addCardsToHand = component => (cardIds, playerId, turn, replaceCount) => {

    const players = component.state.hands.length

    const updates = cardIds.map( (cardId, idx) => {

        const currentCard = component.state.cardData[cardId]

        // Corrected Rotation

        const targetRotation = ((playerAngle(playerId + 1, players) * (180 / Math.PI)) + 90) % 180

        const previousRotation = currentCard.rotation

        const rotation = correctedRotation(previousRotation, targetRotation)


        // Base table location


        const x = 34 * Math.cos(playerAngle(playerId + 1, players))

        const y = 32 * Math.sin(playerAngle(playerId + 1, players))


        // Card orientation check

        const leftFacing = Math.floor( rotation / 180 ) % 2 === 0

        const leftSide = x < 0

        const invert = ( leftFacing && leftSide ) || ( !leftFacing && !leftSide )


        // Flips calculation

        const currentFlips = currentCard.flips

        const flips = turn ? ( currentFlips + (invert ? 1 : -1) ) : currentFlips


        // Stack height

        const faceDown = flips % 2 === 0

        const oldCardCount = component.state.hands[playerId].length

        const stackIndex = oldCardCount - replaceCount + idx

        const stackHeight = oldCardCount - replaceCount + cardIds.length

        const newCardCount = cardIds.length

        const z = stackIndex * 2


        // Shift calculation

        const shiftX = 2 * (invert ? 1 : -1) * (faceDown ? stackIndex : stackHeight - stackIndex - 1 )

        const shiftY = 3 * (invert ? 1 : -1) * (faceDown ? stackIndex : - 1 - (stackHeight - stackIndex - 1))

        // Pull Back calculation

        const pullBack = faceDown ? 0 : (idx * 3) + 4

        return { x, y, z, rotation, flips, shiftX, shiftY, pullBack }

    })

    component.setState({hands: component.state.hands.map((h, idx) => idx === playerId ? [...component.state.hands[idx], ...cardIds] : h)})

    updateCardData(component)(cardIds, updates)

}

const addCardsToDiscard = component => cardIds => {

    const updates = cardIds.map( (cardId, idx) => {

        const x = 0

        const y = 20

        const z = component.state.discard.length + idx + 1

        const targetRotation = 90

        const rotation = correctedRotation(component.state.cardData[cardId].rotation, targetRotation)

        const shiftX = 0

        const shiftY = 0

        return { x, y, z, rotation, shiftX, shiftY }

    })

    component.setState({discard: [...component.state.discard, ...cardIds]})

    updateCardData(component)(cardIds, updates)

}

const addCardToTable = component => cardId => {

    const x = -10

    const y = 0

    const z = component.state.table.length

    const flips = 1

    const shiftX = z * 5

    const shiftY = z * 1.2

    const rotation = 0

    const update = { x, y, z, rotation, flips, shiftX, shiftY }

    component.setState({table: [...component.state.table, cardId]})

    updateCardData(component)([cardId], [update])

}





// Exposed Functions

const dealToPlayer = component => playerId => () => {
    const cardId = getDeckTop(component)
    addCardsToHand(component)([cardId], playerId, false, 0)
    component.setState({nextPlayer: (component.state.nextPlayer + 1) % component.props.playerCount})
}

const burnCard = component => () => {
    const cardId = getDeckTop(component)
    addCardsToDiscard(component)([cardId])
}

const showCard = component => () => {
    const cardId = getDeckTop(component)
    addCardToTable(component)(cardId)
}

const discardHand = component => playerId => () => {

    const hand = getHand(component)(playerId)

    addCardsToDiscard(component)(hand)
    
}

const revealHand = component => playerId => () => {

    const hand = getHand(component)(playerId).reverse()

    addCardsToHand(component)(hand, playerId, true, hand.length)
    
}


export const playerActions = component => id => ([
    {text: "Reveal", clickHandler: revealHand(component)(id)},
    {text: "Fold", clickHandler: discardHand(component)(id)}

])


export const dealerActions = component => ([
    {text: "Deal", clickHandler: dealToPlayer(component)(component.state.nextPlayer)},
    {text: "Show", clickHandler: showCard(component)},
    {text: "Burn", clickHandler: burnCard(component)}

])