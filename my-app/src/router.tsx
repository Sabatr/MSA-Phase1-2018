import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
import Breed from './components/Breed';
import { Header } from './components/Header';
import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/Breed" component={Breed} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}