import React from 'react';

import { Container } from './style'
import ContentHeader from '../../components/ContentHeader'

import SelectInput from '../../components/SelectInput';


const Dashboard: React.FC = () => {

    const options = [
        {value: 'Rodrigo', label: 'Rodrigo'},
        {value: 'Maria', label: 'Maria'},
        {value: 'Ana', label: 'Ana'},
]

    return (
        <Container>
            <ContentHeader title="Dasboard" lineColor="#f79b31">
                <SelectInput options={options} />
            </ContentHeader>
        </Container>
    )
}

export default Dashboard