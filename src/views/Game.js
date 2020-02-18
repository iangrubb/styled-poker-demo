import React, { Component } from 'react'

import styled from 'styled-components'

import Card from '../card/Card'


export default class Game extends Component {

    
    randoizedCards = this.props.cards
    .sort(() => Math.random() - 0.5 )
    .map( (c, idx) => { return {...c, id: idx + 1, x: 0, y: 38, z: idx / 10, faceUp: false, rotation: 0} })

    // Player count

    state = {
        cards: this.randoizedCards,
        deck: this.randoizedCards.map(c=> c.id),
        discard: [],
        table: [],
        hands: Array.from(Array(this.props.playerCount + 1),(x,i)=>i + 1).map( n => []),
        dealCounter: 1
    }

    playerAngle = n => ((2 * n * Math.PI) / (this.props.playerCount + 1)) + (Math.PI / 2)

    updateCard = (id, update) => {

        const found = this.state.cards.find( c => c.id === id)

        const before = this.state.cards.filter( c => c.id < found.id)

        const after = this.state.cards.filter( c => c.id > found.id)

        this.setState({cards: [...before, {...found, ...update}, ...after]})

    }

    correctRotation = (cardId, targetRotation) => {

        // Logic here is meant to ensure minimum card rotation

        const prevRotation = this.state.cards[cardId - 1].rotation

        let corrected

        if (targetRotation > prevRotation) {
            if (targetRotation - prevRotation < 180 - targetRotation + prevRotation) {
                corrected = targetRotation
            } else {
                corrected = targetRotation - 180
            }
        } else {
            if (prevRotation - targetRotation < 180 - prevRotation + targetRotation) {
                corrected = targetRotation
            } else {
                corrected = targetRotation + 180
            }
        }

        return corrected

    }
    



    // Remove items

    getDeckTop = () => {
        const cardId = this.state.deck[this.state.deck.length - 1]
        this.setState({deck: this.state.deck.filter(n => n !== cardId)})
        return cardId
    }

    getHand = playerId => {
        const hand = this.state.hands[playerId]
        this.setState({hands: this.state.hands.map((h, idx) => idx === playerId ? [] : h)})
        return hand
    }


    // Add and render items

    addToHand = (cardId, playerId, faceUp) => {


        // Corrected Rotation

        const targetRotation = ((this.playerAngle(playerId) * (180 / Math.PI)) + 90) % 180

        const rotation = this.correctRotation(cardId, targetRotation)


        // Base table position
   
        const x = 34 * Math.cos(this.playerAngle(playerId))

        const y = 32 * Math.sin(this.playerAngle(playerId))

        const z = (this.state.hands[playerId].length / 4)


        // Pile adjustment

        const inverted = rotation < 0

        const leftSide = x < 0

        const normal = (inverted && leftSide) || (!inverted && !leftSide)


        const shiftX = faceUp ?
            (2 * (normal ? -1 : 1) ) - (this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2) :
            this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2
            


        const shiftY = faceUp ?
            (this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2) + 6 * (normal ? 1 : -1) :
            this.state.hands[playerId].length * (inverted ? -1 : 1) * (leftSide ? 1 : -1) * 2
            


        // Card orientation


        const update = { x, y, z, rotation, faceUp, shiftX, shiftY }

        this.setState({hands: this.state.hands.map((h, idx) => idx === playerId ? [...this.state.hands[idx], cardId] : h)})

        this.updateCard(cardId, update)
    }

    addToDiscard = cardId => {

        const x = 0

        const y = 20

        const z = this.state.discard.length / 10

        const targetRotation = 90

        const rotation = this.correctRotation(cardId, targetRotation)

        const shiftX = 0

        const shiftY = 0

        const update = { x, y, z, rotation, shiftX, shiftY }

        this.setState({discard: [...this.state.discard, cardId]})

        this.updateCard(cardId, update)
    }

    addToTable = cardId => {

        const x = -10

        const y = 0

        const z = this.state.table.length / 4

        const faceUp = true

        const shiftX = this.state.table.length * 5

        const shiftY = this.state.table.length * 1

        const targetRotation = 0

        const rotation = this.correctRotation(cardId, targetRotation)

        const update = { x, y, z, rotation, faceUp, shiftX, shiftY }

        this.setState({table: [...this.state.table, cardId]})

        this.updateCard(cardId, update)

    }


    // Combined Behavior

    dealToPlayer = playerId => () => {

        const cardId = this.getDeckTop()

        this.addToHand(cardId, playerId, false)

    }

    burnCard = () => {
        const cardId = this.getDeckTop()
        this.addToDiscard(cardId)
    }

    showCard = () => {
        const cardId = this.getDeckTop()
        this.addToTable(cardId)
    }

    discardHand = playerId => () => {

        const hand = this.getHand(playerId)

        hand.forEach( cardId => {
            setTimeout(()=>this.addToDiscard(cardId), 50)
        })

        // add each to discard
    }



    // Misc

    revealHand = playerId => () => {

        const hand = this.getHand(playerId).reverse()


        this.setState({hands: this.state.hands.map((h, idx) => idx === playerId ? [] : h)}, 
            ()=>{

                hand.forEach((card, idx) => {
                    setTimeout(()=>this.addToHand(card, playerId, true), 10 * idx)
                })
            }
        )
        

        
    }

    dealNext = () => {

        const id = this.state.dealCounter

        this.setState({dealCounter: (this.state.dealCounter % this.props.playerCount) + 1})

        this.dealToPlayer(id)()

    }


    
    render() {

        return (
            <Container>

                <GameBoard >

                    

                    {Array.from(Array(this.props.playerCount + 1),(x,i)=>i).map( n => {

                        const x = 52 * Math.cos(this.playerAngle(n))
                        const y = 48 * Math.sin(this.playerAngle(n))
                        return (
                            <Player key={n} x={x} y={y}>
                                {n === 0 ?
                                <>
                                    <Name>Dealer</Name>
                                    <button onClick={this.dealNext}>deal</button>
                                    <button onClick={this.burnCard}>burn</button>
                                    <button onClick={this.showCard}>reveal</button>
                                </>
                                :
                                <>
                                    <Name>{`Player${n}`}</Name>
                                    <button onClick={this.revealHand(n)}>show</button>
                                    <button onClick={this.discardHand(n)}>fold</button>
                                </>}
                            </Player>
                        )
                    })}
                    

                    {this.state.cards.map( n => <Card key={n.id} {...n} />)}

                </GameBoard>
                                
            </Container>
        )
    }
}


const Container = styled.div`

    width: 100%;
    height: 100%;

    display: grid;

    grid-template-rows: 1fr 96vh 1fr;
    grid-template-columns: 1fr 96vh 1fr;

`


const GameBoard = styled.div`

  position: relative;

  grid-row: 2;
  grid-column: 2;

  width: 96vh;
  height: 100%;

  background: rgb(46, 98, 73);
  border-radius: 100%;
  
  transform-style: preserve-3d;

  transition: transform 4s;

  transform: perspective(800px) translateY(-50px) rotateX(40deg);


  


`

// transform: perspective(800px) translateY(-50px) rotateX(40deg);

const Player = styled.div`

    width: 20vh;
    height: 10vh;
    background: #99999966;

    border: solid #444444cc 1vh;

    border-radius: 1vh;

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%) translateZ(12vh) translateX(${props => props.x}vh) translateY(${props => props.y}vh) rotateX(-60deg);

    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;

`

const Name = styled.h4`

    margin: 2px;

`

