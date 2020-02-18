import React, { Component } from 'react'

import styled from 'styled-components'

import CardFace from '../card/CardFace'
import CardBack from '../card/CardBack'


export default class CardDeck extends Component {
    render() {
        return (
            <Container>
                <CardBack />
                <Row>{this.props.cards.filter(c=>c.suit === "heart").map((c, idx) => <CardFace position="static" key={idx} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "spade").map((c, idx) => <CardFace position="static" key={idx} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "diamond").map((c, idx) => <CardFace position="static" key={idx} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "club").map((c, idx) => <CardFace position="static" key={idx} {...c} />)}</Row>    
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

`

const Row = styled.div`

    width: 96%;

    margin: 1vh 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

`


