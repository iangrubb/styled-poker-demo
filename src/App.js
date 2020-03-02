import React, { Component } from 'react'

import styled, { ThemeProvider } from 'styled-components'

import * as themes from './styles/themes'

import {
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

  state = {
    theme: "styled"
  }
  
  determineTheme = theme => {

    switch(theme) {
      case "styled":
        return themes.styledTheme
      case "sepia":
        return themes.sepiaTheme
      case "night":
        return themes.nightTheme
      default:
        return {}
    }

  }

  changeTheme = theme => () => this.setState({ theme })

  render (){

    return (
    <ThemeProvider theme={{...this.determineTheme(this.state.theme), ...themes.genericTheming}}>
      <Container>
        <Icon top left >♠</Icon>
        <Icon top >♣</Icon>
        <Icon left >♥</Icon>
        <Icon >♦</Icon>

        <NavBar changeTheme={this.changeTheme} theme={this.state.theme}/>

        <Contents>
          <Switch>

            <Route exact path="/cards">
              <CardDeckView cards={unshuffledDeck} />
            </Route>

            <Route exact path="/flip">
              <FlippableCardView card={shuffle(deck)[0]}/>
            </Route>

            <Route exact path="/game">
              <GameView cards={shuffle(deck)} playerCount={6} />
            </Route>

            </Switch>
          </Contents>
        </Container>
      </ThemeProvider>
    )
  }
}


const Container = styled.div`

  width: 100vw;
  height: 100vh;

  background: ${props => props.theme.color.darkUi};

  ${props => props.theme.font.text}

  ${props => props.theme.centerChild}

`

const Contents = styled.div`

  background: ${props => props.theme.color.lightUi};

  width: calc(100% - ${props => props.theme.size.border * 2}vw);
  height: calc(100% - ${props => props.theme.size.border * 2}vw);

  overflow: scroll;

`
const squareSize = 2.8

const Icon = styled.div`

  position: absolute;

  top: ${props => props.top ? '0vw' : `calc(100vh - ${squareSize}vw)` };
  left: ${props => props.left ? '0vw' : `calc(100vw - ${squareSize}vw)`};

  width: ${squareSize}vw;
  height: ${squareSize}vw;

  font-size: ${squareSize /2}vw;

  ${props => props.theme.borderRadius}

  background: ${props => props.theme.color.darkUi};

  color: ${props => props.theme.color.lightText};
  font-weight: 700;

  ${props => props.theme.centerChild}

`

