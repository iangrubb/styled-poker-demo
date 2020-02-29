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

    ${props => props.theme.centerChild}

`

const Surface = styled.div`

    background: linear-gradient(20deg, ${props => props.theme.color.darkGradient}aa, ${props => props.theme.color.lightGradient}aa);

    transform: scale(2) perspective(600px) rotateX(60deg) rotate(30deg);
    transform-style: preserve-3d;

    width: 20vw;
    height: 20vw;

    border-radius: 50%;
    
    border: ${props => props.theme.size.border / 2}vw solid ${props => props.theme.color.darkUi};

    ${props => props.theme.centerChild}

    cursor: pointer;

`

