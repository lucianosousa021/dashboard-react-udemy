import styled from 'styled-components'


export const Container = styled.div`
    grid-area: AS;
    background-color: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};
`

export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 70px;
`

export const LogoImg = styled.img`
    width: 40px;
    height: 40px;
`

export const Title = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-left: 10px;
`

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`

export const MenuItemLink = styled.a`
    margin: 10px 0;
    text-decoration: none;
    color: ${props => props.theme.colors.info};
    transition: opacity 300ms;
    display: flex;
    align-items: center;

    &:hover{
        opacity: 0.7;
    }

    svg{
        margin-right: 10px;
    }
`