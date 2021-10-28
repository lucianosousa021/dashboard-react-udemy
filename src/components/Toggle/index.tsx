import React, { useState } from 'react'

import { Container, ToggleLabel, ToggleSelector } from './style'



const Toggle: React.FC = () => {

    const [darkMode, setDarkMode] = useState(true)

    return (
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <ToggleSelector
                checked={darkMode}
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => setDarkMode(!darkMode)}
            />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>

    )
}

export default Toggle