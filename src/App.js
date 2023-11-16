import React from 'react';
import PropTypes from 'prop-types';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import Routes from './routing/Routes';
import routeConfiguration from './routing/routeConfiguration';

import './App.css';

export const ClientApp = props => {
  const { store} = props;
  console.log("sono in client");
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes routes={routeConfiguration()}/>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };



