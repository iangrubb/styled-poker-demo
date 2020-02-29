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

    background: ${props => props.theme.color.cardWhite};

    ${props => props.theme.centerChild}

`

const Interior = styled.div`

    background: ${props => props.theme.color.cardBlue};

    width: 5.4vw;
    height: 7.9vw;

    border-radius: 0.4vw;

    ${props => props.theme.centerChild}

`

const Circle = styled.div`

    width: 3.6vw;
    height: 3.6vw;
    border-radius: 50%;

    background: ${props => props.theme.color.cardWhite};

    ${props => props.theme.centerChild}
    
`

const Dash = styled.div`

    background: ${props => props.theme.color.cardBlue};

    width: 0.35vw;
    height: 2.4vw;

    margin: 0 0.15vw;

    transform: skew(-15deg, 0);

`

