import styled from 'styled-components'

interface TagProps{
    color: string
}

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};
    list-style: none;
    border-radius: 5px;
    margin: 10px 0px;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;

    &:hover{
        opacity: 0.7;
        transform: translateX(10px)
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;

        span{
            font-weight: bold;
        }
    }
`

export const Tag = styled.div<TagProps>`
    width: 10px;
    height: 60%;
    position: absolute;

    background-color: ${props => props.color};
    left: 0;
`