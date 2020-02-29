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

        <Transition in={this.state.currentFlips % 2 === 0} timeout={this.state.flipDuration * 500}>

            {transitionState => {

                const starting = transitionState === "exiting" || transitionState === "entering"

                const flipAnimation = 'cubic-bezier(0.21, 0, 0.26, 0.68)'

                const zShift = starting ? 5 : 1

                const yShift = starting ? this.props.pullBack * (this.state.currentFlips - this.state.previousFlips) : 0

                const awayAnimation = 'cubic-bezier(0.23, 0.71, 0.49, 0.78)'

                const returnAnimation = 'cubic-bezier(0.7, 0.3, 0.7, 0.3)'

                const translateAnimation = starting ? awayAnimation : returnAnimation

                return (
                    <CardBase
                        className={this.props.className}
                        onClick={this.props.clickHandler}
                    >
                        <CardTranslate
                            y={yShift}
                            z={zShift}
                            translateDuration={this.state.flipDuration/2}
                            translateAnimation={translateAnimation}
                        >
                            <CardFlip
                                angle={this.state.currentFlips * 180}
                                flipDuration={this.state.flipDuration}
                                flipAnimation={flipAnimation}
                            >
                                <FlippableCardFace suit={this.props.suit} rank={this.props.rank} />
                                <FlippableCardBack />
                            </CardFlip>
                        </CardTranslate>
                    </CardBase>
                )
            }}

        </Transition>)
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

const CardTranslate = styled(CardFrame)`

    transform-style: preserve-3d;

    transform: translateY(${props => props.y}vw)  translateZ(${props => props.z}vw);

    transition: transform ${props => props.translateDuration}s ${props=> props.translateAnimation};


`

const CardFlip = styled(CardFrame)`

    position: relative;

    transform-style: preserve-3d;

    transform: rotateX(${props => props.angle }deg);

    transition: transform ${props => props.flipDuration}s ${props => props.flipAnimation};

    box-shadow: 0 0 0.05vw #11111188;

`

const flippableStyle = css`

    transform-style: preserve-3d;
    position: absolute;
    backface-visibility: hidden;
    
`

const FlippableCardFace = styled(CardFace)`

    ${flippableStyle}

    transform: rotateX(180deg);

`

const FlippableCardBack = styled(CardBack)`

    ${flippableStyle}

`