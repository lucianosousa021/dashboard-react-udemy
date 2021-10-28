import styled from 'styled-components'

interface ContainerProps{
    color: string
}

export const Container = styled.div<ContainerProps>`
    width: 32%;
    height: 150px;
    margin: 10px 0;
    border-radius: 7px;
    padding: 10px 20px;
    position: relative;
    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};
    overflow: hidden;

    img{
        height: 110%;
        position: absolute;
        top: -10px;
        right: -30px;
        filter: opacity(30%);
    }

    > span{
        font-size: 18px;
        font-weight: 500;
    }

    small{
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }
`

