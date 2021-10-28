const formCurrency = (current: number): string => {
    return current.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    })
}

export default formCurrency