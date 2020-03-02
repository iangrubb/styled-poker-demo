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


// card white: white
// card blue: #7EC6EA


// card width: 6.5 vw
// card height: 9vw
// card border radius: 0.4vw


const Container = styled(CardFrame)`

    background: white;
    
    display: flex;
    justify-content: center;
    align-items: center;

`

const Interior = styled.div`

    width: 5.5vw;
    height: 8vw;

    background: #7EC6EA;
    border-radius: 0.4vw;

    display: flex;
    justify-content: center;
    align-items: center;


`

const Circle = styled.div`

    width: 4.5vw;
    height: 4.5vw;

    background: white;

    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    
`

const Dash = styled.div`

    background: #7EC6EA;

    margin: 0 0.2vw;

    width: 0.4vw;
    height: 3.5vw;

    transform: skew(-15deg, 0);


`

