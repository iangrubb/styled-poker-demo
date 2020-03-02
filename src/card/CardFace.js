
import React, { Component } from 'react'

import styled from 'styled-components'

import { CardFrame } from '../styles/components'

import { deriveColor, deriveSymbol, derivePips, deriveType } from './cardFaceHelpers'



export default class CardFace extends Component {


    // Derived information from props

    color = deriveColor(this.props.suit)

    symbol = deriveSymbol(this.props.suit)

    pips = derivePips(this.props.rank)

    type = deriveType(this.props.rank)


    // Conditional render methods

    determineConditionalRender = type => {
        switch(type) {
            case "ace":
                return this.renderAceCard()
            case "face":
                return this.renderFaceCard()
            case "number":
                return this.renderNumberCard()
            default:
                return null
        }
    }

    renderAceCard = () => <Circle color={this.color}><Ace>{this.symbol}</Ace></Circle>

    renderFaceCard = () => (
        <>
            <BigLetter column={2} row={2} color={this.color}>
                {this.props.rank}
            </BigLetter>
            <BigSuit color={this.color} row={10} column={2}>
                {this.symbol}
            </BigSuit>
            <BigSuit color={this.color} row={6} column={4} invert={true}>
                {this.symbol}
            </BigSuit>
            <BigLetter column={4} row={11} color={this.color} invert={true}>{this.props.rank}</BigLetter>
        </>
    )

    renderNumberCard = () => (
        <>
        {this.pips.map( (p, i) =>
            <BigSuit
                key={i}
                color={this.color}
                row={1 + p.row}
                column={1 + p.column}
                invert={p.invert}
            >
                {this.symbol}
            </BigSuit>)
        }
        </>
    )

    render() {
        return (
            <Container className={this.props.className}>
                
                <Rank color={this.color} row={1} column={1}>
                    {this.props.rank}
                </Rank>
                <SmallSuit color={this.color} row={2} column={1}>
                    {this.symbol}
                </SmallSuit>

                {this.determineConditionalRender(this.type)}                        

                <Rank color={this.color} row={15} column={5} invert={true}>
                    {this.props.rank}
                </Rank>
                <SmallSuit color={this.color} row={14} column={5} invert={true}>
                    {this.symbol}
                </SmallSuit>

            </Container>
        )
    }
}



// Card black: #430949
// Card red: #E0477A

const Container = styled(CardFrame)`

    background: white;

    display: grid;
    grid-template-rows: 1fr repeat(13, 4.5%) 1fr;
    grid-template-columns: 1fr repeat(3, 18%) 1fr;

`

const Symbol = styled.div`

    grid-row: ${props => props.row};
    grid-column: ${props => props.column};

    color: ${props => props.color === "red" ? '#E0477A' : '#430949'};

    display: flex;
    justify-content: center;
    align-items: center;

    transform: rotate(${props => props.invert ? 180 : 0}deg);



`

const BigSuit = styled(Symbol)`

    font-size: 1.4vw;

`

const SmallSuit = styled(Symbol)`

    font-size: 0.6vw;
    
`

const Rank = styled(Symbol)`

    font-size: 1vw;

`

const Circle = styled(Symbol)`

    grid-row: 4/13;
    grid-column: 2/5;

    justify-self: stretch;
    align-self: stretch;
    text-align: center;

    background: ${props => props.color === "red" ? "#E0477A" : "#430949" };

    border-radius: 50%;

`

const Ace = styled(Symbol)`

    color: white;

    font-size: 2.4vw;

`

const BigLetter = styled(Symbol)`

    grid-column: ${props => props.column};
    grid-row: ${props => `${props.row}/${props.row + 4}`}; 

    font-size: 2.4vw;

`