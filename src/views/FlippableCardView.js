import React, { Component } from 'react'

import styled from 'styled-components'

import Card from '../card/Card'

export default class FlippableCardView extends Component {

    state = {flips: 0}

    flip = () => this.setState({flips: this.state.flips + 1})

    render() {

        return (
            <Container>
                <Surface onClick={this.flip}>
                    <Card {...this.props.card} flips={this.state.flips} />
                </Surface>
            </Container>
        )
    }
}

const Container = styled.div`

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

`

const Surface = styled.div`

    background: linear-gradient(20deg, rgba(219, 112, 147, 0.7), rgba(218, 163, 87, 0.7));

    transform: scale(2) perspective(600px) rotateX(60deg) rotate(-30deg);
    transform-style: preserve-3d;

    width: 30vh;
    height: 30vh;

    border-radius: 50%;
    
    border: solid 0.8vh rgb(219, 112, 147, 0.4);

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

`

