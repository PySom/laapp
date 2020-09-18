import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import store from './store/store'
import ConnectedApp from './hocs/App/ConnectedApp';
import './custom.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
window.store = store;
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
            <Route path='/' render={() => <ConnectedApp />} />
        </BrowserRouter>
    </Provider>,
    rootElement);
registerServiceWorker();

