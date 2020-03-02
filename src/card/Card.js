import React, { Component } from 'react'

import styled, { css } from 'styled-components'
import { Transition } from 'react-transition-group'

import { CardFrame } from '../styles/components'

import CardBack from './CardBack'
import CardFace from './CardFace'



export default class Card extends Component {

    // Need to know the distance change to calculate rotation speed.

    state = {previousFlips: null, currentFlips: null, flipDuration: null}

    static getDerivedStateFromProps(props, state) {

        const flipDuration = Math.abs(props.flips - state.currentFlips) * props.flipVelocity

        return {
            previousFlips: state.currentFlips,
            currentFlips: props.flips,
            flipDuration: flipDuration
        }

    }

    render() {

        return (

            <CardBase
                className={this.props.className}
                onClick={this.props.clickHandler}
            >
                <CardFlip
                    angle={this.state.currentFlips * 180}
                    flipDuration={this.state.flipDuration}
                >
                    <FlippableCardFace suit={this.props.suit} rank={this.props.rank} />
                    <FlippableCardBack />
                </CardFlip>
            </CardBase>
                
        )

    }
}

Card.defaultProps = {
    flipVelocity: 0.4,
    flips: 0,
    pullBack: 6
}

const CardBase = styled(CardFrame)`

    transform-style: preserve-3d;

`


const CardFlip = styled(CardFrame)`

    position: relative;

    transform-style: preserve-3d;


`

const flippableStyle = css`

    transform-style: preserve-3d;

    
`

const FlippableCardFace = styled(CardFace)`

    ${flippableStyle}

    transform: rotateX(180deg);

`

const FlippableCardBack = styled(CardBack)`

    ${flippableStyle}

`