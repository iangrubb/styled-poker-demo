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

                        const x = 42 * Math.cos(playerAngle(n, this.props.playerCount))
                        const y = 38 * Math.sin(playerAngle(n, this.props.playerCount)) + 10

                        const actions = n === 0 ? dealerActions(this) : playerActions(this)(n - 1)

                        return (
                            <Display
                                key={n}
                                x={x} 
                                y={y}
                                name={n === 0 ? "Dealer" : `Player ${n}`}
                                buttons={actions}
                            />
                        )
                    })}
    
                    {this.state.cardData.map((n, idx) =><MovableCard key={idx} {...n} flip-duration={0.4} />)}
                    
                </GameBoard>                   
            </Container>
        )
    }
}


const Container = styled.div`

    width: 100%;
    height: 100%;

    ${props => props.theme.centerChild}

    overflow: hidden;

`

const GameBoard = styled.div`

    position: relative;

    width: 98vh;
    height: 98vh;

    background: linear-gradient(20deg, ${props => props.theme.color.darkGradient}aa, ${props => props.theme.color.lightGradient}aa);

    border: ${props => props.theme.size.border / 2}vw solid ${props => props.theme.color.darkUi};
    
    border-radius: 100%;
    
    transform-style: preserve-3d;

    transform: perspective(800px) translateY(-4vw) rotateX(35deg);

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
        translate(${props => props.shiftX}vw, ${props => props.shiftY}vw)   
    ;
    
    transition: transform 0.4s;

`

