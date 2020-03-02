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
    justify-content: center;
    align-items: center;

`

const Surface = styled.div`

    background: linear-gradient(20deg, #E5829Baa, #EABE77aa);

    width: 20vw;
    height: 20vw;

    border-radius: 50%;
    
    border: 0.2vw solid #E5829B;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transform: scale(2);
    transform-style: preserve-3d;

`

