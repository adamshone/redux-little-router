// @flow
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useBasename from 'history/lib/useBasename';
import useQueries from 'history/lib/useQueries';

import installRouter from './store-enhancer';
import routerMiddleware from './middleware';

type BrowserRouterArgs = {
  routes: Object,
  basename: string,
  getLocation: () => Location,
  passRouterStateToReducer?: bool
};

/* istanbul ignore next: unstubbable! */
const realLocation = () => window.location;

export default ({
  routes,
  basename,
  getLocation = realLocation,
  passRouterStateToReducer = false
}: BrowserRouterArgs) => {
  const history = useBasename(useQueries(createBrowserHistory))({
    basename
  });

  const location = getLocation();
  const { search, hash } = location;
  let { pathname } = location;

  // TM hack to handle # as the basename
  if (pathname === '/' && basename.indexOf('#') === 0) {
    pathname = hash.substring(1);
  }

  const location = history
    .createLocation({ pathname, search });

  return {
    routerEnhancer: installRouter({
      routes,
      history,
      location,
      passRouterStateToReducer
    }),
    routerMiddleware: routerMiddleware({ history })
  };
};
