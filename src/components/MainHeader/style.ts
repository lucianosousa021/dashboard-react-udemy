import styled from 'styled-components'

export const Container = styled.div`
    grid-area: MH;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    align-items: center;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
`

export const Welcome = styled.h3``

export const Username = styled.span``