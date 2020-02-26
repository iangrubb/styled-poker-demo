import React, { Component } from 'react'

import styled from 'styled-components'

import CardFace from '../card/CardFace'
import CardBack from '../card/CardBack'


export default class CardDeckView extends Component {
    render() {
        return (
            <Container>
                <Row fit><CardBack /></Row>
                <Row>{this.props.cards.filter(c=>c.suit === "heart").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "spade").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "diamond").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>
                <Row>{this.props.cards.filter(c=>c.suit === "club").map(c => <CardFace position="static" key={c.id} {...c} />)}</Row>    
            </Container>
        )
    }
}

const Container = styled.div`

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const Row = styled.div`


    width: ${props => props.fit ? '8%' : '90%'};

    margin: 1vh 0;
    padding: 1vh;

    background: linear-gradient(20deg, rgba(219, 112, 147, 0.7), rgba(218, 163, 87, 0.7));

    border-radius: 1vh;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    border: solid 0.8vh rgb(219, 112, 147, 0.4);

`


