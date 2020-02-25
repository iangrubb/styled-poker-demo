import React, { Component } from 'react'

import styled from 'styled-components'

import Card from '../card/Card'

import Display from '../Display'

import { playerAngle, playerActions, dealerActions } from '../gameLogic'



export default class GameView extends Component {

    state = {
        deck: Array.from(Array(this.props.cards.length),(x,i)=>i),
        discard: [],
        table: [],
        hands: Array.from(Array(this.props.playerCount), x => []),
        nextPlayer: 0,
        cardData: this.props.cards.map( (c, idx) => {
            return {
                ...c,

                // Movable Card Props
                rotation: 0,
                z: idx + 1,
                x: 0,
                y: 36,
                shiftX: 0,
                shiftY: 0,

                // Imported Card Props
                flips: 0,
                pullBack: 4
            }
        })
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
                            <Display
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

                        return <MovableCard key={idx} {...n} flip-duration={0.4} />
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

    transform-style: preserve-3d;

    transform:
        translate(-50%, -50%)
        translateZ(${props => props.z}px)
        translate(${props => props.x}vh,${props => props.y}vh)
        rotate(${props => props.rotation}deg)
        translate(${props => props.shiftX}vh, ${props => props.shiftY}vh)   
    ;
    
    transition: transform 0.4s;

`

