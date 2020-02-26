import React, { Component } from 'react'

import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import CardDeckView from './views/CardDeckView'
import GameView from './views/GameView'
import FlippableCardView from './views/FlippableCardView'

import NavBar from './NavBar'


const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const suits = ["heart", "diamond", "spade", "club"]

const deck = suits.flatMap( s => ranks.map( r => {return { suit: s, rank: r }} ))

const unshuffledDeck = [...deck]

const shuffle = array => array.sort(() => Math.random() - 0.5 )

export default class App extends Component {
  
  render (){

    return (
      <Router>
        <Container >
          <Icon top left >♠</Icon>
          <Icon top >♣</Icon>
          <Icon left >♥</Icon>
          <Icon >♦</Icon>
          <Contents>
            <Switch>
              <Route exact path="/cards">
                <NavBar path="cards" />
                <CardDeckView cards={unshuffledDeck} />
              </Route>
              <Route exact path="/flip">
                <NavBar path="flip"/>
                <FlippableCardView card={shuffle(deck)[0]}/>
              </Route>
              <Route exact path="/game">
                <NavBar path="game"/>
                <GameView cards={shuffle(deck)} playerCount={6} />
              </Route>
            </Switch>
          </Contents>
        </Container>
      </Router>
    )
  }
}



const Container = styled.div`

  width: 100vw;
  height: 100vh;

  background: #DB7093;

  font-family: 'Open Sans', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;

`

const Contents = styled.div`

  background: #fff2ec;

  border-radius: 1vh;

  width: calc(100% - 2vh);
  height: calc(100% - 2vh);

`

const squareSize = 4

const Icon = styled.div`

  position: absolute;

  top: ${props => props.top ? '0vh' : `calc(100vh - ${squareSize}vh)` };
  left: ${props => props.left ? '0vh' : `calc(100vw - ${squareSize}vh)`};

  width: ${squareSize}vh;
  height: ${squareSize}vh;

  border-radius: 1vh;

  background: #DB7093;

  color: white;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

`

