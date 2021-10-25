import React from 'react';

import Dashboard from '../pages/Dashboard'
import List from '../pages/List'

import { Switch, Route } from 'react-router-dom'
import Layout from '../components/Layout';

const AppRoutes: React.FC = () => {
    return(
        <Layout>
            <Switch>
                <Route exact path="/dasboard" component={Dashboard} />
                <Route exact path="/list/:type" component={List} />
            </Switch>
        </Layout>
    )
}

export default AppRoutes