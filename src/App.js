import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import Routes from './routing/Routes';
import routeConfiguration from './routing/routeConfiguration';
import configureStore from './store';

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


export const ServerApp = props => {
  const { url, context, helmetContext, store, hostedTranslations = {} } = props;
  HelmetProvider.canUseDOM = false;
  return (
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url} context={context}>
            <Routes routes={routeConfiguration()} />
          </StaticRouter>
        </HelmetProvider>
      </Provider>
  );
};

ServerApp.propTypes = { url: string.isRequired, context: any.isRequired, store: any.isRequired };

export const renderApp = (
  url,
  serverContext,
  preloadedState,
  hostedTranslations,
  collectChunks
) => {
  // Don't pass an SDK instance since we're only rendering the
  // component tree with the preloaded store state and components
  // shouldn't do any SDK calls in the (server) rendering lifecycle.
  const store = configureStore(preloadedState);

  const helmetContext = {};

  // When rendering the app on server, we wrap the app with webExtractor.collectChunks
  // This is needed to figure out correct chunks/scripts to be included to server-rendered page.
  // https://loadable-components.com/docs/server-side-rendering/#3-setup-chunkextractor-server-side
  const WithChunks = collectChunks(
    <ServerApp
      url={url}
      context={serverContext}
      helmetContext={helmetContext}
      store={store}
      hostedTranslations={hostedTranslations}
    />
  );
  const body = ReactDOMServer.renderToString(WithChunks);
  const { helmet: head } = helmetContext;
  return { head, body };
};