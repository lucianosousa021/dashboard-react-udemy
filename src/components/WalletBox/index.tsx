import React from 'react';

import CountUp from 'react-countup';

import ArrowUp from '../../assets/arrow-up.svg'
import ArrowDown from '../../assets/arrow-down.svg'
import Dollar from '../../assets/dollar.svg'

import { Container } from './style'

interface WalletBoxProps{
    title: string,
    amount: number,
    footerLabel: string,
    icon: 'dollar' | 'arrowUp' | 'arrowDown',
    color: string
}

const WalletBox: React.FC<WalletBoxProps> = ({
    title,
    amount,
    footerLabel,
    icon,
    color
}) => {

    const iconSelected = (icon: string)=> {
        switch (icon) {
            case 'dollar':
                return Dollar

            case 'arrowUp':
                return ArrowUp

            case 'arrowDown':
                return ArrowDown
        }
    }

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp
                    start={0}
                    end={amount}
                    prefix={"R$ "}
                    separator="."
                    decimal=","
                    decimals={2}
                    duration={1}
                />
            </h1>
            <small>{footerLabel}</small>
            {icon && <img src={iconSelected(icon)} alt={title} />}
        </Container>
    )
}

export default WalletBox