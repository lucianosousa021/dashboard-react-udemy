import React, { useMemo } from 'react';

import { Container, Profile, Welcome, Username } from './style'

import emojis from '../../utils/emojis'

import Toggle from '../Toggle/index'

const MainHeader: React.FC = () => {

    const emoji = useMemo(() => {
        const indece = Math.floor(Math.random() * emojis.length)
        return emojis[indece]
    }, [])

    return (
        <Container>
            <Toggle />

            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <Username>Luciano Sousa</Username>
            </Profile>
        </Container>
    )
}

export default MainHeader