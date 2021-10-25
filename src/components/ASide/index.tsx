import React from 'react';

import logoimg from '../../assets/logo.svg'
import { Container, Header, LogoImg, MenuContainer, MenuItemLink, Title } from './style'

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md'

const ASide: React.FC = () => {

    return (
        <Container>
            <Header>
                <LogoImg src={logoimg} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/dasboard"><MdDashboard />Dashboard</MenuItemLink>
                <MenuItemLink href="/list/entry-balance"><MdArrowUpward />Entradas</MenuItemLink>
                <MenuItemLink href="/list/exit-balance"><MdArrowDownward />Saídas</MenuItemLink>
                <MenuItemLink href="#"><MdExitToApp />Sair</MenuItemLink>
            </MenuContainer>
        </Container>
    )
}

export default ASide