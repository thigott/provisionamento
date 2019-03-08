import React from 'react';
import { Switch, Route, Redirect} from 'react-router'
import Home from '../components/home/Home'
import UserCrud from '../components/users/UserCrud'
import AlteraCanal from '../components/users/AlteraCanal'
import PPOE from '../components/users/PPOE'
import OnOffONU from '../components/users/OnOffONU'
import ListaONU from '../components/users/ListaONUs'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/canal' component={AlteraCanal} />
        <Route path='/ppoe' component={PPOE} />
        <Route path='/onoff' component={OnOffONU} />
        <Route path='/listaonu' component={ListaONU} />
        <Redirect from='*' to='/' />
    </Switch>