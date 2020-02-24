import React, { Component } from 'react'

import styled from 'styled-components'

import CardDeckView from './views/CardDeckView'
import GameView from './views/GameView'
import FlippableCardView from './views/FlippableCardView'


const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const suits = ["heart", "diamond", "spade", "club"]

const deck = suits.flatMap( s => ranks.map( r => {return { suit: s, rank: r }} ))


export default class App extends Component {
  
  render (){

    return (
      <Container >

        {/* <CardDeckView cards={deck} /> */}

        {/* <FlippableCardView /> */}
        
        <GameView cards={deck} playerCount={6} />

      </Container>
    )
  }
}



const Container = styled.div`

  width: 100vw;
  height: 100vh;

  font-family: 'Open Sans', sans-serif;

`




