import React, { Component } from 'react'

import styled from 'styled-components'

import { CardFrame } from '../styles/components'

export default class CardBack extends Component {
    render() {
        return (
            <Container className={this.props.className}>
                <Interior>
                    <Circle>
                        <Dash />
                        <Dash />
                    </Circle>
                </Interior>
            </Container>
        )
    }
}

const Container = styled(CardFrame)`

    background: #E1EAEF;

    display: flex;
    justify-content: center;
    align-items: center;

`

const Interior = styled.div`

    background: rgb(78, 177, 225);

    width: 8vh;
    height: 12vh;

    border-radius: 0.6vh;

    display: flex;
    justify-content: center;
    align-items: center;


`

const Circle = styled.div`

    width: 6vh;
    height: 6vh;
    border-radius: 50%;

    background: #E1EAEF;

    display: flex;
    justify-content: center;
    align-items: center;
    
`

const Dash = styled.div`

    background: rgb(78, 177, 225);

    width: 0.6vh;
    height: 4vh;

    margin: 0 0.3vh;

    transform: skew(-15deg, 0);

`

