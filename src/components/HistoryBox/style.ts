import styled from 'styled-components'

interface LabelProps{
    color: string
}

export const Container = styled.div`
    width: 100%;
    height: 400px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    margin: 10px 0;
    padding: 30px 20px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2{
        margin-left: 18px;
    }

    > div{
        height: 300px !important ;
    }

`

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
`

export const LabelContainer = styled.ul`
    margin-right: 18px;
    display: flex;
`

export const Label = styled.li<LabelProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;

    > div{
        background-color: ${props => props.color};
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;

    }

    > span{
        margin-left: 5px;
    }

    & + &{
        margin-left: 10px;
    }
`