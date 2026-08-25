import { IRoute } from 'types/navigation';

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (routes: IRoute[]): IRoute => {
  if (!isWindowAvailable()) return routes[0];
  const pathname = window.location.pathname;
  const foundRoute = routes.find((route) => {
    const fullPath = route.layout + route.path;
    if (route.path === '/default' && (pathname === '/admin/default' || pathname === '/admin' || pathname === '/admin/')) {
      return true;
    }
    return route.path !== '/default' && pathname.startsWith(fullPath);
  });

  return foundRoute || routes[0];
};

export const getActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes);
  return route?.name || 'Ringkasan Dashboard';
};

export const getActiveNavbar = (routes: IRoute[]): boolean => {
  const route = findCurrentRoute(routes);
  return route?.secondary || false;
};

export const getActiveNavbarText = (routes: IRoute[]): string | boolean => {
  return getActiveRoute(routes) || false;
};
