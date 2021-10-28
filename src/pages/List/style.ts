import styled from 'styled-components'

export const Container = styled.div``
export const Content = styled.main`
    display: flex;
    flex-direction: column;
`

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .tag-filter{
        font-size: 18px;
        font-weight: bold;
        background: none;
        color: ${props => props.theme.colors.white};
        margin: 0 10px;
        transition: opacity 0.3s;
        opacity: 0.5;

        &:hover{
            opacity: 0.7;
        }

        &:nth-child(1):after{
            content: '';
            display: block;
            margin: 0 auto;
            width: 55px;
            border-bottom: 10px solid ${props => props.theme.colors.warning}
        }
        &:nth-child(2):after{
            content: '';
            display: block;
            margin: 0 auto;
            width: 55px;
            border-bottom: 10px solid ${props => props.theme.colors.success}
        }
    }

    .tag-actived{
        opacity: 1;
    }
`