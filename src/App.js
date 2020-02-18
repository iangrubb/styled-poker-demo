import React, { Component } from 'react'

import styled from 'styled-components'



import CardDeck from './views/CardDeck'
import Game from './views/Game'



const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const suits = ["heart", "diamond", "spade", "club"]

const deck = suits.flatMap( s => ranks.map( r => {return {suit: s, rank: r}} ))


// {deck.map( (card, i) => <Card key={i} {...card} />)}




export default class App extends Component {

  state = {playerCount: 5, x: 25, y: 25, rotation: -45, angle: 0}
  
  render (){

    return (
      <Container>
        
        <Game cards={deck} playerCount={6} />

        {/* <CardDeck cards={deck} /> */}

      </Container>
    )
  }
}



const Container = styled.div`

  width: 100vw;
  height: 100vh;

  font-family: 'Open Sans', sans-serif;


`



