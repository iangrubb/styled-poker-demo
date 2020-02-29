import React, { Component } from 'react'

import styled from 'styled-components'

export default class DisplayCard extends Component {
    render() {
        return (
            <Container x={this.props.x} y={this.props.y}>
                <Name>{this.props.name}</Name>
                <Row>
                    {this.props.buttons.map((b, idx) => (
                        <Button key={idx} onClick={b.clickHandler}>
                            {b.text}
                        </Button>
                    ))}
                </Row>
            </Container>
        )
    }
}


const Container = styled.div`

    background: ${props => props.theme.color.lightUi}cc;

    padding: 0.4vw 1vw;

    border: ${props => props.theme.size.border / 2}vw solid ${props => props.theme.color.darkUi};

    ${props => props.theme.borderRadius}

    position: absolute;
    top: 50%;
    left: 50%;

    transform:
        translate(-50%, -50%)
        translateZ(10vw)
        translateX(${props => props.x}vh)
        translateY(${props => props.y}vh)
        rotateX(-50deg)
    ;

    transform-style: preserve-3d;


    display: flex;
    flex-direction: column;
    align-items: center;

`

const Name = styled.h4`

    margin: 0;

    font-family: "Open Sans";
    color: ${props => props.theme.color.darkUi};

`

const Row = styled.div`

    display: flex;
    align-items: center;

    margin: 0.4vw 0 0.2vw 0;

`

const Button = styled.button`

    background: #ffffffcc;
    color: ${props => props.theme.color.darkUi};

    font-family: "Open Sans";
    font-size: 0.8vw;

    width: 100%;
    height: 100%;

    margin: 0 0.2vw;

    border: 0.15vw solid ${props => props.theme.color.darkUi};

    border-radius: 1vw;

    cursor: pointer;

    transform: translateZ(0.1vw);

    transition: transform 0.1s ease;

    transition-style: preserve-3d;

    &:active {
        transform: translateZ(0.05vw);
    }

    &:focus {
        outline: 1px solid #11111100;
    }


`