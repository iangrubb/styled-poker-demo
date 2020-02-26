import React, { Component } from 'react'

import styled from 'styled-components'

import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <Container>
                <Title>Styled</Title>
                <Icon>{'< ♧ ♤ 💅 ♡ ♢ >'}</Icon>
                <Title>Poker</Title>
                <StyledLink current={this.props.path === "cards"} to="/cards">Card Deck</StyledLink>
                <StyledLink current={this.props.path === "flip"} to="/flip">Flippable Card</StyledLink>
                <StyledLink current={this.props.path === "game"} to="/game">Poker Game</StyledLink>
            </Container>
        )
    }
}


const StyledLink = styled(Link)`

  display: ${props => props.current ? "block" : "none"};

  color: white;
  
  margin: 0 1vh;

  text-decoration: none;

  font-style: ${props => props.current ? "italic" : "normal"};
  font-weight: ${props => props.current ? "700" : "400"};

  margin: 0 0 1vh 0;

  box-shadow: 0 0.2vh 0 white;

  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0.4vh 0 white;
  }

`

//rgb(29, 31, 38)

const Title = styled.div`

  display: none;

  font-size: 3.4vh;
  font-style: italic;
  color: white;

  margin: 0.6vh 0;

  transition: all 0.2s ease;

`


const Icon = styled.div`

  font-style: normal;
  font-weight: 700;
  font-size: 3vh;
  font-family: "Open Sans";
  color: white;

  border-radius: 1vh;




`

const Container = styled.div`



  position: absolute;

  

  font-family: 'Space Mono';

  top: 0;
  left: 8vh;

  z-index: 2;

  background: linear-gradient(20deg, rgb(219, 112, 147), rgb(218, 163, 87));

  padding: 1vh 2vh;

  border: solid rgb(219, 112, 147) 1vh;


  border-radius: 1vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  transition: all 0.2s ease;

  height: 10vh;
  width: 24vh;

  &:hover {
    height: 30vh;
  }

  &:hover ${StyledLink} {
    display: block;
  }

  &:hover ${Title} {
    display: block;
  }

`


