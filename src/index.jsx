import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import initStore, {history} from './utils/store';
import {ConnectedRouter} from 'connected-react-router';
import {PersistGate} from 'redux-persist/integration/react';
import Router from './components/Router/Router';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MosRuBlock from "./components/MosRu/MosRuBlock";
import Redactor from "./components/Redactor/Redactor";


const {store, persistor} = initStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Header />
                <div className="main container">
                    <Router />
                    <MosRuBlock />
                </div>
                <Footer />
                <Redactor />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);