import React from 'react';

import { Global } from './styles/Global'

import {ThemeProvider} from 'styled-components'

import dark from './styles/theme/dark'
import light from './styles/theme/light'

import Routes from './routes'


const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <Global />
            <Routes />
        </ThemeProvider>
    )
}

export default App