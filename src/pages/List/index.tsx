import React, { useMemo, useState, useEffect } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container, Content, Filters } from './style'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import monthsList from '../../utils/months'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'


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

    const [selectedMonth, setSelectedMonth] = useState<string>(String(new Date().getMonth() +1))
    const [selectedYear, setSelectedYear] = useState<string>(String(new Date().getFullYear()))
    const [selectedFrequency, setSelectedFrequency] = useState<string[]>(['recorrente', 'eventual'])

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


    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses
    }, [type])


    const years = useMemo(() => {
        let uniqueYears: number[] = []

        listData.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()

            if (!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        })

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })

    }, [listData])


    const months = useMemo(() => {
        return monthsList.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })

    }, [])

    useEffect(() => {
        console.log(selectedMonth)
        console.log(selectedYear)
        const filteredData = listData.filter(item => {
            const date = new Date(item.date)
            const month = String(date.getMonth() + 1)
            const year = String(date.getFullYear())

            return month === selectedMonth && year === selectedYear && selectedFrequency.includes(item.frequency)
        })

        const formattedData = filteredData.map(item => {
            return {
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount))    ,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#e44c4e' : '#4e41f0'
            }
        })
        setData(formattedData)
    }, [listData, selectedMonth, selectedYear, selectedFrequency])

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency)

        if (alreadySelected >= 0){
            const filtered = selectedFrequency.filter(item => item !== frequency)
            setSelectedFrequency(filtered)
        }else{
            setSelectedFrequency((prev) => [...prev, frequency])
        }
    }

    return (
        <Container>
            <ContentHeader title={title.text} lineColor={title.lineColor}>
                <SelectInput options={months} onChange={e => setSelectedMonth(e.target.value)} defaultValue={selectedMonth} />
                <SelectInput options={years} onChange={e => setSelectedYear(e.target.value)} defaultValue={selectedYear}/>
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`tag-filter ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
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