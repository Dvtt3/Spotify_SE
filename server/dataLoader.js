const url = require('url');

exports.loadData = function(requestUrl, appInfo) {
  const { matchPathname, configureStore, routeConfiguration, config, fetchAppAssets } = appInfo;
  const { pathname, query } = url.parse(requestUrl);
  const matchedRoutes = matchPathname(pathname, routeConfiguration());

  let translations = {};
  const store = configureStore({});

  const dataLoadingCalls = () =>
    matchedRoutes.reduce((calls, match) => {
      const { route, params } = match;
      if (typeof route.loadData === 'function' && !route.auth) {
        calls.push(store.dispatch(route.loadData(params, query)));
      }
      return calls;
    }, []);

  // First fetch app-wide assets
  // Then make loadData calls
  // And return object containing preloaded state and translations
  // This order supports other asset (in the future) that should be fetched before data calls.
  return store
    .dispatch(fetchAppAssets(config.appCdnAssets))
    .then(fetchedAppAssets => {
      translations = fetchedAppAssets?.translations?.data || {};
      return Promise.all(dataLoadingCalls());
    })
    .then(() => {
      return { preloadedState: store.getState(), translations };
    })
    .catch(e => {
      console.error('server-side-data-load-failed' + e);

      // Call to loadData failed, let client handle the data loading errors.
      // (It might be recoverable error like lost connection.)
      // Return "empty" store.
      return store.getState();
    });
};