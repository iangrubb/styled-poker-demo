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
                    <Card suit="heart" rank="5" flips={this.state.flips} />
                </Surface>
            </Container>
        )
    }
}

const Container = styled.div`

    background: #ccc;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

`

const Surface = styled.div`

    background: #888;

    transform: perspective(600px) rotateX(60deg) rotate(-30deg);
    transform-style: preserve-3d;

    width: 30vh;
    height: 30vh;

    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

`

