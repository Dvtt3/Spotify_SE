import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ClientApp, renderApp } from './App';
import routeConfiguration from './routing/routeConfiguration';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import { matchPathname } from './util/routes';

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

const render = (store, shouldHydrate) => {
  console.log("Entro in render");
  // If the server already loaded the auth information, render the app
  // immediately. Otherwise wait for the flag to be loaded and render
  // when auth information is present.


 /* const state = store.getState();
  const cdnAssetsVersion = state.hostedAssets.version;
  const authInfoLoaded = state.Auth.authInfoLoaded;
  const info = authInfoLoaded ? Promise.resolve({}) : store.dispatch(authInfo());
  info
    .then(() => {
      store.dispatch(fetchCurrentUser());
      // Ensure that Loadable Components is ready
      // and fetch hosted assets in parallel before initializing the ClientApp
      return Promise.all([
        loadableReady(),
        store.dispatch(fetchAppAssets(config.appCdnAssets, cdnAssetsVersion)),
      ]);
    })
    .then(([_, fetchedAssets]) => {
      const translations = fetchedAssets?.translations?.data || {};
      if (shouldHydrate) {
        ReactDOM.hydrate(
          <ClientApp store={store} hostedTranslations={translations} />,
          document.getElementById('root')
        );
      } else {
        ReactDOM.render(
          <ClientApp store={store} hostedTranslations={translations} />,
          document.getElementById('root')
        );
      }
    })
    .catch(e => {
      log.error(e, 'browser-side-render-failed');
    });*/
    ReactDOM.render(
      <ClientApp store={store}/>,
      document.getElementById('root')
    );
};
if (typeof window !== 'undefined') {

  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || '{}';
  const initialState = JSON.parse(preloadedState);

  const store = configureStore(initialState);

  render(store, !!window.__PRELOADED_STATE__);

}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);


// Export the function for server side rendering.
export default renderApp;

// exporting matchPathname and configureStore for server side rendering.
// matchPathname helps to figure out which route is called and if it has preloading needs
// configureStore is used for creating initial store state for Redux after preloading
export { matchPathname, configureStore, routeConfiguration };