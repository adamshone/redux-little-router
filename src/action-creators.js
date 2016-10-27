// @flow
import { LOCATION_CHANGED } from './action-types';
import type { Location } from 'history';

type LocationDidChangeArgs = {
  location: Location,
  matchRoute: Function
};
export const locationDidChange = ({
  location,
  matchRoute
}: LocationDidChangeArgs) => {
  // Extract the pathname so that we don't match against the basename.
  // This avoids requiring basename-hardcoded routes.
  const { hash } = location;
  let { pathname } = location;

  // TM Hack to support the back button when the basename is set to #
  if (pathname === '/' && hash.indexOf('#') === 0) {
    pathname = hash.substring(1);
    location.pathname = pathname;
    location.basename = '#';
    location.hash = '';
  }

  return {
    type: LOCATION_CHANGED,
    payload: {
      ...location,
      ...matchRoute(pathname)
    }
  };
};

export const initializeCurrentLocation = (location: Location) => ({
  type: LOCATION_CHANGED,
  payload: location
});
