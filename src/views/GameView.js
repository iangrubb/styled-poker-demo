import React, { Component } from 'react'

import styled from 'styled-components'

import Card from '../card/Card'

import DisplayCard from '../DisplayCard'

import { playerAngle, playerActions, dealerActions } from '../gameLogic'



export default class GameView extends Component {

    state = {
        deck: Array.from(Array(this.props.cards.length),(x,i)=>i),
        discard: [],
        table: [],
        hands: Array.from(Array(this.props.playerCount), x => []),
        cardData: this.props.cards.map( (c, idx) => {
            return {
                ...c,
                rotation: 90,
                z: idx,
                x: 0,
                y: 30,
                shiftX: 0,
                shiftY: 0,
                flips: 0
            }
        }),
        dealTo: 1
    }

    // Add and render items

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


    burnCard = () => {
        // const cardId = this.getDeckTop()
        // this.addToDiscard(cardId)
    }

    showCard = () => {
        // const cardId = this.getDeckTop()
        // this.addToTable(cardId)
    }

    discardHand = playerId => () => {

        // const hand = this.getHand(playerId)

        // hand.forEach( cardId => {
        //     setTimeout(()=>this.addToDiscard(cardId), 50)
        // })

        // add each to discard
    }



    // Misc

    revealHand = playerId => () => {

        // const hand = this.getHand(playerId).reverse()


        // this.setState({hands: this.state.hands.map((h, idx) => idx === playerId ? [] : h)}, 
        //     ()=>{

        //         hand.forEach((card, idx) => {
        //             setTimeout(()=>this.addToHand(card, playerId, true), 10 * idx)
        //         })
        //     }
        // )
        
    }

    dealNext = () => {

        // const id = this.state.dealCounter

        // this.setState({dealCounter: (this.state.dealCounter % this.props.playerCount) + 1})

        // this.dealToPlayer(id)()

    }


    
    render() {

        return (
            <Container>
                <GameBoard >

                    {Array.from(Array(this.props.playerCount + 1),(x,i)=>i).map( n => {

                        const x = 52 * Math.cos(playerAngle(n, this.props.playerCount))
                        const y = 48 * Math.sin(playerAngle(n, this.props.playerCount))

                        const actions = n === 0 ? dealerActions(this) : playerActions(this)(n - 1)

                        return (
                            <DisplayCard
                                key={n}
                                x={x} 
                                y={y}
                                buttons={actions}
                            />
                        )
                    })}
    
                    {this.state.cardData.map( (n, idx) => {

                        // const coordinates = (id, deck, discard, table, hands) => 
                        // z={} rotation={} x={} y={} shiftX={} shiftY={} flips={}


                        return <MovableCard key={idx} {...n} />
                    })}
                    
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

    background: rgb(46, 98, 73);
    border-radius: 100%;
    
    transform-style: preserve-3d;

    transform: perspective(800px) translateY(-50px) rotateX(40deg);

`

const MovableCard = styled(Card)`

    position: absolute;
    top: 50%;
    left: 50%;


    transform:
        translate(-50%, -50%)
        translateZ(${props => props.z}px)
        translate(${props => props.x}vh,${props => props.y}vh)  
        rotate(${props => props.rotation}deg)
        /* translate(${props => props.shiftX}vh, ${props => props.shiftY}vh) */
    ;
    
    transition: transform 0.4s linear;

`

