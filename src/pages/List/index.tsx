import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container, Content, Filters } from './style'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'

interface RouteParams {
    match: {
        params: {
            type: string
        }
    }
}

interface Data{
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC<RouteParams> = ( { match } ) => {

    const [data, setData] = useState<Data[]>([])

    const { type } = match.params

    const title = useMemo(() => {
        return type === 'entry-balance' ? {
            text: 'Entradas',
            lineColor: '#F7931B'
        } : {
            text: 'Saídas',
            lineColor: '#E44C4E'
        }
    }, [type])

    const months = [
        {value: 1, label: 'Janeiro'},
        {value: 2, label: 'Fevereiro'},
        {value: 3, label: 'Março'},
        {value: 4, label: 'Abril'},
        {value: 5, label: 'Maio'},
        {value: 6, label: 'Junho'},
        {value: 7, label: 'Julho'},
        {value: 8, label: 'Agosto'},
        {value: 9, label: 'Setembro'},
        {value: 10, label: 'Outubro'},
        {value: 11, label: 'Novembro'},
        {value: 12, label: 'Dezembro'},
]

    const years = [
        {value: 2021, label: 2021},
        {value: 2020, label: 2020},
        {value: 2019, label: 2019},
        {value: 2018, label: 2018},
    ]

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses
    }, [])

    useEffect(() => {
        const response = listData.map(item => {
            return {
                description: item.description,
                amountFormatted: item.amount,
                frequency: item.frequency,
                dateFormatted: item.date,
                tagColor: item.frequency === 'recorrente' ? '#e44c4e' : '#4e41f0'
            }
        })
        setData(response)
    }, [])

    return (
        <Container>
            <ContentHeader title={title.text} lineColor={title.lineColor}>
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className="tag-filter"
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className="tag-filter"
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
            {data.map((item, index) => (
                <HistoryFinanceCard
                    tagColor={item.tagColor}
                    title={item.description}
                    subTitle={item.dateFormatted}
                    amount={item.amountFormatted}
                    key={index}
                 />
            ))}
            </Content>
        </Container>
    )
}

export default List