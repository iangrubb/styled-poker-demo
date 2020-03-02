import React, { Component } from 'react'

import styled from 'styled-components'

import { CardFrame } from '../styles/components'

export default class CardBack extends Component {
    render() {
        return (
            <Container className={this.props.className}>
                <Interior>
                    <Circle>
                        <Dash />
                        <Dash />
                    </Circle>
                </Interior>
            </Container>
        )
    }
}


// card white: white
// card blue: #7EC6EA


// card width: 6.5 vw
// card height: 9vw
// card border radius: 0.4vw


const Container = styled.div`


`

const Interior = styled.div`


`

const Circle = styled.div`

    
`

const Dash = styled.div`


`

