import React, { Component } from 'react'

import styled from 'styled-components'

import CardFace from '../card/CardFace'
import CardBack from '../card/CardBack'


export default class CardDeckView extends Component {
    render() {
        return (
            <Container>
                <CardBack />
                <Row>{this.props.cards.filter(c=>c.suit === "heart").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "spade").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "diamond").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "club").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>    
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
    justify-content: center;
    align-items: center;

`

const Row = styled.div`

    margin: 2vh 0;
    width: 96%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

`


