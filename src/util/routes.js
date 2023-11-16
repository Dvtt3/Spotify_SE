import { matchPath } from 'react-router-dom';

export const matchPathname = (pathname, routeConfiguration) => {
  const matchedRoutes = routeConfiguration.reduce((matches, route) => {
    const { path, exact = true } = route;
    const match = matchPath(pathname, { path, exact });
    if (match) {
      matches.push({
        route,
        params: match.params || {},
      });
    }
    return matches;
  }, []);

  const matchedExactRoute = matchedRoutes.find(r => {
    return r.exact === true || r.exact == null;
  });

  // We return matched 'exact' path route only if such exists
  // and all matches if no exact flag exists.
  return matchedExactRoute ? [matchedExactRoute] : matchedRoutes;
};

export const canonicalRoutePath = (routes, location, pathOnly = false) => {
    const { pathname, search, hash } = location;
  
    const matches = matchPathname(pathname, routes);
    const isListingRoute = matches.length === 1 && matches[0].route.name === 'ListingPage';
  
    if (isListingRoute) {
      // Remove the dynamic slug from the listing page canonical URL
  
      // Remove possible trailing slash
      const cleanedPathName = pathname.replace(/\/$/, '');
      const parts = cleanedPathName.split('/');
  
      if (parts.length !== 4) {
        throw new Error('Expected ListingPage route to have 4 parts');
      }
      const canonicalListingPathname = `/${parts[1]}/${parts[3]}`;
      return pathOnly ? canonicalListingPathname : `${canonicalListingPathname}${search}${hash}`;
    }
  
    return pathOnly ? pathname : `${pathname}${search}${hash}`;
  };