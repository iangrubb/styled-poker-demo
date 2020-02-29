import React, { Component } from 'react'

import styled, { css } from 'styled-components'

import { Link, withRouter } from 'react-router-dom'


// import { withRouter } from "react-router";



class NavBar extends Component {


    render() {

      const { theme , changeTheme } = this.props

      const path = this.props.location.pathname

      return (
          <Container>
              <Title>Styled</Title>
              <Icon>{'< ♧ ♤ 💅 ♡ ♢ >'}</Icon>
              <Title>Poker</Title>

              <Group>

                <Heading>Demos</Heading>

                <StyledLink current={path === "/cards"} to="/cards">Card Deck</StyledLink>
                <StyledLink current={path === "/flip"} to="/flip">Flippable Card</StyledLink>
                <StyledLink current={path === "/game"} to="/game">Poker Game</StyledLink>

              </Group>
          

              <Group>

                <Heading>Themes</Heading>

                <ThemeButton current={theme === "styled"} onClick={changeTheme("styled")}>Styled</ThemeButton>
                <ThemeButton current={theme === "grayscale"} onClick={changeTheme("grayscale")}>Grayscale</ThemeButton>
                <ThemeButton current={theme === "third"} onClick={changeTheme("third")}>Third</ThemeButton>

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

  margin: 0.4vw 0;

  border: ${props => props.theme.size.border / 8}vw solid ${props => props.theme.color.lightText};
  ${props => props.theme.borderRadius}

`

const Heading = styled.legend`

  color: ${props => props.theme.color.lightText};
  font-weight: 700;

  margin: 0 0 0 0.2vw;
  padding: 0 0.4vw;

`


const groupItemStyle = css`
  margin: 0 0 1vh 0;

  width: fit-content;

  box-shadow: 0 ${props => props.current ? 0.4 : 0.2}vh 0 ${props => props.theme.color.lightText};
  color: ${props => props.theme.color.lightText};

  text-decoration: none;
  font-weight: ${props => props.current ? "700" : "400"};
  font-style: ${props => props.current ? "normal" : "italic"};

  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.color.darkText};
    box-shadow: 0 ${props => props.current ? 0.4 : 0.2}vh ${props => props.theme.color.darkText};
  }
`

const ThemeButton = styled.a`

  ${groupItemStyle}

`

const StyledLink = styled(Link)`

  ${groupItemStyle}

`


const Title = styled.div`

  font-style: italic;
  color: ${props => props.theme.color.lightText};

  font-size: 2.4vh;
  margin: 0.2vh 0;

  transition: all 0.2s ease;

  position: relative;

`


const Icon = styled.div`

  font-style: normal;
  font-weight: 700;
  font-size: 2.4vh;
  ${props => props.theme.font.text}
  color: ${props => props.theme.color.lightText};

  ${props => props.theme.borderRadius}

`

const Container = styled.div`

  position: absolute;

  ${props => props.theme.font.display}

  top: 0;
  left: 8vh;

  z-index: 2;

  background: linear-gradient(20deg, ${props => props.theme.color.darkGradient}, ${props => props.theme.color.lightGradient});

  padding: 1vh 2vh;

  border: ${props => props.theme.size.border}vw solid ${props => props.theme.color.darkUi};

  ${props => props.theme.borderRadius}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: none;

  transition: all 0.2s ease;

  height: 10vh;
  width: 24vh;

  &:hover {
    height: 54vh;
  }

  &:hover ${Group} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &:hover ${Icon} {
    font-size: 2.8vh;
  }

  &:hover ${Title} {
    font-size: 3.4vh;
    margin: 0 0 0.4vh 0;
  }


`


