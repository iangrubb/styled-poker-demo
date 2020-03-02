import React, { Component } from 'react'

import styled from 'styled-components'

import CardFace from '../card/CardFace'
import CardBack from '../card/CardBack'


export default class CardDeckView extends Component {
    render() {
        return (
            <Container>
                <CardGrid>
                    <PositionedCardBack />
                    {this.props.cards.map((c, idx) => <PositionedCardFace key={idx} {...c} row={Math.floor(idx / 13) + 1} column={(idx % 13) + 2} />)}
                </CardGrid> 
            </Container>
        )
    }
}

const Container = styled.div`

    height: 100%;

    ${props => props.theme.centerChild}

`

const CardGrid = styled.div`

    background: linear-gradient(20deg, ${props => props.theme.color.darkGradient}aa, ${props => props.theme.color.lightGradient}aa);

    margin: 4vw 0 0 0;
    padding: 1vw;


    border: ${props => props.theme.size.border / 2}vw solid ${props => props.theme.color.darkUi};
    ${props => props.theme.borderRadius}

    display: grid;
    grid-template-rows: repeat(8, fit-content);
    grid-template-columns: repeat(14, fit-content);

    grid-column-gap: 0.2vw;
    grid-row-gap: 0.2vw;

`

const PositionedCardBack = styled(CardBack)`

    grid-column: 1;
    grid-row: 5/7;

    justify-self: center;
    align-self: center;

`

const PositionedCardFace = styled(CardFace)`

    grid-column: ${props => props.column};
    grid-row: ${props => props.row * 2}/${props => (props.row + 1) * 2};

    justify-self: center;
    align-self: center;

`



