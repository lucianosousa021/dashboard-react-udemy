import React, { useMemo, useState } from 'react';

import { Container, Content } from './style'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';


import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import monthsList from '../../utils/months'
import MessageBox from '../../components/MessageBox';
import PieChartComponent from '../../components/PieChartComponent';
import HistoryBox from '../../components/HistoryBox';


import Happy from '../../assets/happy.svg'
import Sad from '../../assets/sad.svg'
import Grinning from '../../assets/grinning.svg'

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

const Dashboard: React.FC<RouteParams> = ({ match }) => {

    const [selectedMonth, setSelectedMonth] = useState<string>(String(new Date().getMonth() +1))
    const [selectedYear, setSelectedYear] = useState<string>(String(new Date().getFullYear()))

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        ([...expenses, ...gains]).forEach(item => {
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

    }, [])

    const months = useMemo(() => {
        return monthsList.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })

    }, [])


    const totalGains = useMemo(() => {
        let total: number = 0

        gains.forEach(item => {
            const date = new Date(item.date)
            const month = String(date.getMonth() + 1)
            const year = String(date.getFullYear())

            if ( month === selectedMonth && year === selectedYear ) {
                try{
                    total += Number(item.amount)
                } catch{
                    throw new Error('Invalid Amount !')
                }
            }
        })

        return total
    }, [selectedMonth, selectedYear])


    const totalExpenses = useMemo(() => {
        let total: number = 0

        expenses.forEach(item => {
            const date = new Date(item.date)
            const month = String(date.getMonth() + 1)
            const year = String(date.getFullYear())

            if ( month === selectedMonth && year === selectedYear ) {
                try{
                    total += Number(item.amount)
                } catch{
                    throw new Error('Invalid Amount !')
                }
            }
        })

        return total
    }, [selectedMonth, selectedYear])


    const totalBalance = useMemo(() => {
        const balance = totalGains - totalExpenses

        return balance
    }, [totalGains, totalExpenses])


    const message = useMemo(() => {
        if (totalBalance < 0){
            return {
                title: 'Que triste!',
                description: 'Neste mês você gastou mais do que deveria.',
                footerText: 'Verifique seus gastos e tente reduzír despesas desnecessárias.',
                icon: Sad
            }
        } else if (totalBalance === 0){
            return {
                title: 'Ufa!',
                description: 'Neste mês você gastou exatamente o que ganhou.',
                footerText: 'Tenha cuidado, no próximo mês tente poupar o seu dinheiro.',
                icon: Grinning
            }
        } else{
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim. Considere investir seu saldo.',
                icon: Happy
            }
        }
    }, [totalBalance])


    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains  + totalExpenses

        const gainsPercent = (totalGains / total) * 100
        const expensesPercent = (totalExpenses / total) * 100

        const data = [
            {
                name: 'Entradas',
                value: gainsPercent,
                percent: Number(gainsPercent.toFixed(1)),
                color: '#e44c4e'
            },
            {
                name: 'Saídas',
                value: expensesPercent,
                percent: Number(expensesPercent.toFixed(1)),
                color: '#f7931b'
            },
        ]

        return data

    },[totalGains, totalExpenses])


    const historyData = useMemo(() => {
        return monthsList.map((_, month) => {
            let amountEntry = 0
            gains.forEach(gain => {
                const date = new Date(gain.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()

                if(gainMonth === month && gainYear === Number(selectedYear)){
                    try{
                        amountEntry += Number(gain.amount)
                    } catch{
                        throw new Error('amount entry is invalid.')
                    }
                }
            })


            let amountOutput = 0
            expenses.forEach(expense => {
                const date = new Date(expense.date)
                const expenseMonth = date.getMonth()
                const expenseYear = date.getFullYear()

                if(expenseMonth === month && expenseYear === Number(selectedYear)){
                    try{
                        amountOutput += Number(expense.amount)
                    } catch{
                        throw new Error('amount entry is invalid.')
                    }
                }
            })

            return {
                monthNumber: month,
                month: monthsList[month].substr(0,3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()

            return (Number(selectedYear) === currentYear && item.monthNumber <= currentMonth) ||
                   (Number(selectedYear) < currentYear)
        })
    },[, selectedYear])

    return (
        <Container>
            <ContentHeader title="Dasboard" lineColor="#4E41F0">
                <SelectInput options={months} onChange={e => setSelectedMonth(e.target.value)} defaultValue={selectedMonth} />
                <SelectInput options={years} onChange={e => setSelectedYear(e.target.value)} defaultValue={selectedYear}/>
            </ContentHeader>

            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="Atualziado com base nas entradas e saídas"
                    icon="dollar"
                    color="#4e41f0"
                />
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="Atualziado com base nas entradas"
                    icon='arrowUp'
                    color="#f7931b"
                />
                <WalletBox
                    title="Saídas"
                    amount={totalExpenses}
                    footerLabel="Atualziado com base nas saídas"
                    icon='arrowDown'
                    color="#e44c4e"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartComponent data={relationExpensesVersusGains} />

                <HistoryBox
                    data={historyData}
                    lineColorAmoutEntry="#f7931b"
                    lineColorAmoutOutput="#e44c4e"
                />
            </Content>
        </Container>
    )
}

export default Dashboard