import React, { Component } from 'react'

import styled, { css } from 'styled-components'

import { Link, withRouter } from 'react-router-dom'


// import { withRouter } from "react-router";



class NavBar extends Component {


    render() {

      const path = this.props.location.pathname

      return (
          <Container>
              <Title>Styled</Title>
              <Icon>{'< ♧ ♤ 💅 ♡ ♢ >'}</Icon>
              <Title>Poker</Title>

              <Group>

                <legend>Demos</legend>

                <StyledLink current={path === "/cards"} to="/cards">Card Deck</StyledLink>
                <StyledLink current={path === "/flip"} to="/flip">Flippable Card</StyledLink>
                <StyledLink current={path === "/game"} to="/game">Poker Game</StyledLink>

              </Group>
          
          </Container>
      )
    }
}

export default withRouter(NavBar)


const Group = styled.fieldset`

  display: none;

  width: 90%;
  align-self: center;

  margin: 0.2vw 0;

  border: 0.1vw solid white;
  border-radius: 0.4vw;

  & legend {
    color: white;
    font-weight: 700;

    margin: 0 0 0 0.2vw;
    padding: 0 0.2vw;
  }

`


const StyledLink = styled(Link)`

  margin: 0 0 0.4vw 0;

  width: fit-content;

  

  text-decoration: none;
  font-size: 1vw;

  font-weight: 400;
  font-style: italic;
  box-shadow: 0 0.2vh 0 white;

  color: white;

  transition: all 0.2s ease;

  &:hover {
    color: #4F314F;
    box-shadow: 0 ${props => props.current ? 0.4 : 0.2}vh #4F314F;
  }

`


const Title = styled.div`

  color: white;
  font-style: italic;
  font-size: 1.4vw;

  margin: 0.2vw 0;

  transition: all 0.2s ease;

  position: relative;

`

const Icon = styled.div`

  font-style: normal;
  font-weight: 700;
  font-size: 1.2vw;
  font-family: "Open Sans";
  color: white;

`

const Container = styled.div`

  position: absolute;

  font-family: "Space Mono";

  top: 0;
  left: 6vw;

  height: 5vw;
  width: 10vw;

  z-index: 2;

  background: linear-gradient(20deg, #E5829B, #EABE77);

  padding: 1vw 2vw;

  border: 0.4vw solid #E5829B;

  border-radius: 0.4vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  transition: height 0.2s ease;

  &:hover {

  }

  &:hover ${Title} {

  }

  &:hover ${Group} {

  }


`


