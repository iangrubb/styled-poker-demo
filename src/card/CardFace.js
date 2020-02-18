import React, { Component } from 'react'

import styled from 'styled-components'

import { CardSide } from '../styles/components'



export default class CardFace extends Component {


    // Derived information from props

    color = this.props.suit === "heart" || this.props.suit === "diamond" ? "red" : "black"

    symbol = (suit => {
        switch(suit) {
            case "heart":
                return "♥"
            case "diamond":
                return "♦"
            case "spade":
                return "♠"
            case "club":
                return "♣"
            default:
                return "error"
        }
    })(this.props.suit)

    pips = (rank => {
        switch(rank) {
            case "2":
                return [{row: 1, column: 2},{row: 13, column: 2, rotate: true}]
            case "3":
                return [{row: 1, column: 2}, {row: 7, column: 2}, {row: 13, column: 2, rotate: true}]
            case "4":
                return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 13, column: 1, rotate: true}, {row: 13, column: 3, rotate: true}]
            case "5":
                return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 2}, {row: 13, column: 1, rotate: true}, {row: 13, column: 3, rotate: true}]
            case "6":
                return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 1}, {row: 7, column: 3} ,{row: 13, column: 1, rotate: true},
                        {row: 13, column: 3, rotate: true}]
            case "7":
                return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 1}, {row: 7, column: 3} ,{row: 13, column: 1, rotate: true},
                        {row: 13, column: 3, rotate: true}, {row: 4, column: 2}]
            case "8":
                return [{row: 1, column: 1}, {row: 1, column: 3}, {row: 7, column: 1}, {row: 7, column: 3} ,{row: 13, column: 1, rotate: true},
                        {row: 13, column: 3, rotate: true}, {row: 4, column: 2}, {row: 10, column: 2, rotate: true}]
            case "9":
                return [{row: 1, column: 1}, {row: 5, column: 1}, {row: 9, column: 1, rotate: true}, {row: 13, column: 1, rotate: true}, {row: 1, column: 3},
                        {row: 5, column: 3}, {row: 9, column: 3, rotate: true}, {row: 13, column: 3, rotate: true}, {row: 7, column: 2}]
            case "10":
                return [{row: 1, column: 1}, {row: 5, column: 1}, {row: 9, column: 1, rotate: true}, {row: 13, column: 1, rotate: true}, {row: 1, column: 3},
                        {row: 5, column: 3}, {row: 9, column: 3, rotate: true}, {row: 13, column: 3, rotate: true}, {row: 3, column: 2}, {row: 11, column: 2, rotate: true}]
            default:
                return null
        }
    })(this.props.rank)



    // Render methods for numbered cards and face cards

    numberCardRender = rank => (
        <>
        {this.pips.map( (p, i) =>
            <BigSuit
                key={i}
                color={this.color}
                row={1 + p.row}
                column={1 + p.column}
                rotate={p.rotate}
            >
                {this.symbol}
            </BigSuit>)
        }
        </>
    )

    faceCardRender = rank => {

        if (rank === "A") {
            return <Ace color={this.color}>{this.symbol}</Ace>
        } else {
            return (
            <>
                <BigLetter column={1} row={1} color={this.color}>{this.props.rank}</BigLetter>
                <BigSuit color={this.color} row={10} column={2}>
                    {this.symbol}
                </BigSuit>
                <BigSuit color={this.color} row={6} column={4} rotate={true}>
                    {this.symbol}
                </BigSuit>
                <BigLetter column={3} row={10} color={this.color} rotate={true}>{this.props.rank}</BigLetter>
            </>
            )
        }
    }


    render() {
        return (
            <Container className={this.props.className}>

                    <Number color={this.color} row={1} column={1}>{this.props.rank}</Number>
                    <SmallSuit color={this.color} row={3} column={1}>{this.symbol}</SmallSuit>

                    <Number color={this.color} row={1} column={5}>{this.props.rank}</Number>
                    <SmallSuit color={this.color} row={3} column={5}>{this.symbol}</SmallSuit>

                    {this.pips ? this.numberCardRender(this.props.rank):this.faceCardRender(this.props.rank)}                        

                    <Number color={this.color} row={15} column={1} rotate={true}>{this.props.rank}</Number>
                    <SmallSuit color={this.color} row={13} column={1} rotate={true}>{this.symbol}</SmallSuit>

                    <Number color={this.color} row={15} column={5} rotate={true}>{this.props.rank}</Number>
                    <SmallSuit color={this.color} row={13} column={5} rotate={true}>{this.symbol}</SmallSuit>

            </Container>
        )
    }
}


const Container = styled(CardSide)`

    background: white;

    display: grid;
    grid-template-rows: 1fr repeat(13, 4.5%) 1fr;
    grid-template-columns: 1fr repeat(3, 18%) 1fr;


`



const Symbol = styled.div`

    color: ${props => props.color};

    display: flex;
    justify-content: center;
    align-items: center;

    grid-row: ${props => props.row};
    grid-column: ${props => props.column};

    transform: rotate(${props => props.rotate ? '180deg' : '0'});

`

const BigSuit = styled(Symbol)`

    font-size: 2.2vh;

`

const SmallSuit = styled(Symbol)`

    font-size: 1vh;
    
`

const Number = styled(Symbol)`

    font-size: 1.8vh;

`

const BigLetter = styled(Symbol)`

    grid-column: ${props => props.column + 1};
    grid-row: ${props => `${props.row + 1}/${props.row + 5}`};

    transform: rotate(${props => props.rotate ? '180deg' : '0'}) translateX(1vh);

    font-size: 4vh;
    font-wight: 700;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const Ace = styled.div`

    background: ${props => props.color};

    color: white;
    font-size: 4vh;

    grid-row: 8;
    grid-column: 3;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 7vh;
    height: 7vh;

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;

`



