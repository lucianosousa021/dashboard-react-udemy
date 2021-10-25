import React from 'react';

import { Grid } from './style'

import MainHeader from '../MainHeader'
import Content from '../Content'
import ASide from '../ASide'


const Layout: React.FC = ( { children } ) => {

    return (
        <Grid>
            <MainHeader />
            <ASide />
            <Content>
                { children }
            </Content>
        </Grid>
    )
}

export default Layout