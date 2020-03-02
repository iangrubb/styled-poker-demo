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

                <legend>Demos</legend>

                <StyledLink current={path === "/cards"} to="/cards">Card Deck</StyledLink>
                <StyledLink current={path === "/flip"} to="/flip">Flippable Card</StyledLink>
                <StyledLink current={path === "/game"} to="/game">Poker Game</StyledLink>

              </Group>
          

              <Group>

                <legend>Themes</legend>

                <ThemeButton current={theme === "styled"} onClick={changeTheme("styled")}>Styled</ThemeButton>
                <ThemeButton current={theme === "sepia"} onClick={changeTheme("sepia")}>Sepia</ThemeButton>
                <ThemeButton current={theme === "night"} onClick={changeTheme("night")}>Night</ThemeButton>

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

  border: ${props => props.theme.size.border / 8}vw solid ${props => props.theme.color.lightText};
  ${props => props.theme.borderRadius}

  & legend {
    color: ${props => props.theme.color.lightText};
    font-weight: 700;

    margin: 0 0 0 0.2vw;
    padding: 0 0.2vw;
  }

`


const groupItemStyle = css`
  margin: 0 0 0.4vw 0;

  width: fit-content;

  box-shadow: 0 ${props => props.current ? 0.4 : 0.2}vh 0 ${props => props.theme.color.lightText};
  color: ${props => props.theme.color.lightText};

  text-decoration: none;
  font-size: 1vw;
  font-weight: ${props => props.current ? "700" : "400"};
  font-style: ${props => props.current ? "normal" : "italic"};

  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.color.darkText};
    box-shadow: 0 ${props => props.current ? 0.4 : 0.2}vh ${props => props.theme.color.darkText};
  }
`

const StyledLink = styled(Link)`

  ${groupItemStyle}

`


const ThemeButton = styled.a`

  ${groupItemStyle}

  cursor: pointer;

`


const Title = styled.div`

  color: ${props => props.theme.color.lightText};
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
  ${props => props.theme.font.text}
  color: ${props => props.theme.color.lightText};

  ${props => props.theme.borderRadius}

`

const Container = styled.div`

  position: absolute;

  ${props => props.theme.font.display}

  top: 0;
  left: 6vw;

  height: 5vw;
  width: 10vw;

  z-index: 2;

  background: linear-gradient(20deg, ${props => props.theme.color.darkGradient}, ${props => props.theme.color.lightGradient});

  padding: 1vw 2vw;

  border: ${props => props.theme.size.border}vw solid ${props => props.theme.color.darkUi};

  ${props => props.theme.borderRadius}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  transition: height 0.2s ease;

  &:hover {
    height: 28vw;
  }

  &:hover ${Group} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &:hover ${Title} {
    font-size: 2vw;
    margin: 0 0 0.2vw 0;
  }


`


