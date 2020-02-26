import React, { Component } from 'react'

import styled from 'styled-components'

export default class DisplayCard extends Component {
    render() {
        return (
            <Container x={this.props.x} y={this.props.y}>
                <Name>{this.props.name}</Name>
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

    background: #ffffff88;

    padding: 1vh 4vh;

    border: solid #DB7093aa 1vh;

    border-radius: 1vh;

    position: absolute;
    top: 50%;
    left: 50%;

    transform:
        translate(-50%, -50%)
        translateZ(10vh)
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
    font-style: italic;
    color: #DB7093;

`

const Row = styled.div`

    display: flex;
    align-items: center;

    margin: 0.8vh 0 0.4vh 0;

`

const ButtonFrame = styled.div`

    background: linear-gradient(20deg, rgb(219, 112, 147), rgb(218, 163, 87));

    margin: 0 0.4vh;

    border-radius: 2vh;

    width: 8vh;
    height: 3vh;

    padding: 0.1vh;

    display: flex;
    justify-content: center;
    align-items: center;



`

const Button = styled.button`

    background: #ffffffaa;
    color: #DB7093;

    
    font-family: "Open Sans";
    font-size: 1.4vh;
    font-weight: 700;

    width: 100%;
    height: 100%;

    border: 0.2vh solid #DB7093;

    border-radius: 2vh;

    cursor: pointer;

    transform: translateZ(0.3vh);

    transition: transform 0.1s ease;

    transition-style: preserve-3d;


    &:active {
        transform: translateZ(0vh);
    }

    &:focus {
        outline: 1px solid #11111100;
        font-weight: 700;
        background: #ffffffee;
    }


`