import React from 'react';

import { Container, Header, LabelContainer, Label } from './style'

import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';

import formatCurrency from '../../utils/formatCurrency'

interface HistoryBoxProps{
    data: {
        month: string,
        amountEntry: number,
        amountOutput: number,
    }[],
    lineColorAmoutEntry: string,
    lineColorAmoutOutput: string,
}

const HistoryBox: React.FC<HistoryBoxProps> = ({
    data,
    lineColorAmoutEntry,
    lineColorAmoutOutput
}) => (

        <Container>
            <Header>
                <h2>Histórico de Saldo</h2>

                <LabelContainer>
                    <Label color={lineColorAmoutEntry}>
                        <div></div>
                        <span>Entradas</span>
                    </Label>
                    <Label color={lineColorAmoutOutput}>
                        <div></div>
                        <span>Saídas</span>
                    </Label>
                </LabelContainer>
            </Header>

            <ResponsiveContainer>
                <LineChart data={data} margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                    <XAxis dataKey="month" stroke="#cecece" />
                    <Tooltip
                        formatter={(value: number) => formatCurrency(Number(value))}
                    />

                    <Line
                        type="monotone"
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineColorAmoutEntry}
                        strokeWidth="5"
                        dot={{r: 5}}
                        activeDot={{r: 8}}
                    />

                    <Line
                        type="monotone"
                        dataKey="amountOutput"
                        name="Saídas"
                        stroke={lineColorAmoutOutput}
                        strokeWidth="5"
                        dot={{r: 5}}
                        activeDot={{r: 8}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Container>
)

export default HistoryBox