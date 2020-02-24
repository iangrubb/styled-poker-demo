
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

    renderAceCard = () => <Ace color={this.color}>{this.symbol}</Ace>

    renderFaceCard = () => (
        <>
            <BigLetter column={1} row={1} color={this.color}>
                {this.props.rank}
            </BigLetter>
            <BigSuit color={this.color} row={10} column={2}>
                {this.symbol}
            </BigSuit>
            <BigSuit color={this.color} row={6} column={4} invert={true}>
                {this.symbol}
            </BigSuit>
            <BigLetter column={3} row={10} color={this.color} invert={true}>{this.props.rank}</BigLetter>
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

                <Rank color={this.color} row={1} column={5}>
                    {this.props.rank}
                </Rank>
                <SmallSuit color={this.color} row={2} column={5}>
                    {this.symbol}
                </SmallSuit>

                {this.determineConditionalRender(this.type)}                        

                <Rank color={this.color} row={15} column={1} invert={true}>
                    {this.props.rank}
                </Rank>
                <SmallSuit color={this.color} row={14} column={1} invert={true}>
                    {this.symbol}
                </SmallSuit>

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

const Container = styled(CardFrame)`

    background: white;

    display: grid;
    grid-template-rows: 1fr repeat(13, 4.5%) 1fr;
    grid-template-columns: 1fr repeat(3, 18%) 1fr;

`

const Symbol = styled.div`

    grid-row: ${props => props.row};
    grid-column: ${props => props.column};

    display: flex;
    justify-content: center;
    align-items: center;

    transform: rotate(${props => props.invert ? '180deg' : '0'});

    color: ${props => props.color};

`

const BigSuit = styled(Symbol)`

    font-size: 2vh;


`

const SmallSuit = styled(Symbol)`

    font-size: 1vh;
    
`

const Rank = styled(Symbol)`

    font-size: 1.6vh;

`

const Ace = styled(Symbol)`

    grid-row: 4/13;
    grid-column: 2/5;

    background: ${props => props.color};
    color: white;

    font-size: 4vh;

    border-radius: 50%;

`

const BigLetter = styled(Symbol)`

    grid-column: ${props => props.column + 1};
    grid-row: ${props => `${props.row + 1}/${props.row + 5}`}; 

    font-size: 4vh;

`