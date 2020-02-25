import React, { Component } from 'react'

import styled from 'styled-components'

export default class DisplayCard extends Component {
    render() {
        return (
            <Container x={this.props.x} y={this.props.y}>
                <Name>Name</Name>
                <Row>
                {this.props.buttons.map((b, idx) => (
                    <ButtonFrame key={idx}>
                        <Button onClick={b.clickHandler}>
                            {b.text}
                        </Button>
                    </ButtonFrame>
                ))}
                </Row>
            </Container>
        )
    }
}


const Container = styled.div`

    background: #99999966;

    padding: 1vh 4vh;

    border: solid #444444cc 1vh;

    border-radius: 1vh;

    position: absolute;
    top: 50%;
    left: 50%;

    transform:
        translate(-50%, -50%)
        translateZ(12vh)
        translateX(${props => props.x}vh)
        translateY(${props => props.y}vh)
        rotateX(-60deg)
    ;

    transform-style: preserve-3d;

    display: flex;
    flex-direction: column;
    align-items: center;

`

const Name = styled.h4`

    margin: 2px;

`

const Row = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

`

const ButtonFrame = styled.div`

    transform-style: preserve-3d;

    border-radius: 1vh;
    margin: 0 0.4vh;
    padding: 0 0.1vh;

    background: black;

`

const Button = styled.button`

    background: #444444;
    color: white;
    border: 0.2vh solid black;
    border-radius: 1vh;

    transform: translateZ(0.6vh) rotateX(2deg);

    transition: transform 0.1s;

    cursor: pointer;

    &:active {
        transform: translateZ(0.2vh) rotateX(2deg);
    }

    &:focus {
        outline: none;
    }

`