/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Provider } from 'react-redux';


import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from '@redux-store';
import { injectAction } from '../utils/redux-utils';
export const store = legacy_createStore(
    AppReducer,
    compose(applyMiddleware(thunk)),
);

injectAction(store.dispatch);

export default function MyProvider(props) {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}
