import React, { Component } from 'react'

import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import CardBack from './CardBack'
import CardFace from './CardFace'


export default class Card extends Component {

    // Is told whether to flip face up or down, then adjusts its angle accordingly.

    // Cards should always flip inwards, so they need to know their rotation and their left/right position.

    // Needs to know previous angle, so that it knows what to add or subtract

    determineAngle = (faceUp, x, rotation) => {

        if (faceUp) {

            const left = x < 0
            const inverted = rotation < 0

            if ( (inverted && left) || (!inverted && !left) ) {
                console.log("0")
                return 0
            } else {
                console.log("360")
                return 360
            }

        } else {
            return 180
        }

    }

    render() {

        return (

        <Transition in={this.props.faceUp} timeout={200}>

            {transitionState => {

                console.log(transitionState)

                const transitionShift = transitionState === "entering" || transitionState === "exiting" ? 12 : 0

                return (

                    <CardBase
                        onClick={this.props.clickHandler}
                        x={this.props.x} 
                        y={this.props.y}
                        rotation={this.props.rotation}
                        shiftX={this.props.shiftX}
                        shiftY={this.props.shiftY}
                    >
                        <CardContents
                            angle={this.determineAngle(this.props.faceUp, this.props.x, this.props.rotation)}
                            z={this.props.z + transitionShift}
                        >
                            <Face suit={this.props.suit} rank={this.props.rank} className="front"/>
                            <Back className="back"/>
                        </CardContents>
                    </CardBase>
                )

            }}

        

        </Transition>

        )
    }
}

Card.defaultProps = {
    x: 0,
    y: 0,
    z: 1,
    rotation: 0,
    faceUp: false,
    shiftX: 0,
    shiftY: 0
}

const CardBase = styled.div`

    transform-style: preserve-3d;

    position: absolute;
    top: 50%;
    left: 50%;

    width: 10vh;
    height: 14vh;

    transform:
        translate(-50%, -50%)
        translate(${props => props.x}vh,${props => props.y}vh)  
        rotate(${props => props.rotation}deg)
        translate(${props => props.shiftX}vh, ${props => props.shiftY}vh)
    ;
    
    transition: transform 0.4s linear;

    perspective: 800px;

    background-color: transparent;

`


const CardContents = styled.div`

    position: relative;

    height: 100%;
    width: 100%;

    transform-style: preserve-3d;

    transform: translateZ(${props => props.z + 2}vh) rotateX(${props => props.angle}deg);
    transition: transform 0.4s linear;

    box-shadow: 0 0 2px #555;

    border-radius: 0.6vh;
    
`

const Face = styled(CardFace)`

    position: absolute;

    backface-visibility: hidden;
    transform-style: preserve-3d;

`

const Back = styled(CardBack)`

    position: absolute;

    backface-visibility: hidden;
    transform-style: preserve-3d;

`






