import { createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import MovieDetails from '@/pages/MovieDetails';
import NotFound from '@/pages/NotFound';

const rootRoute = createRootRoute({
    component: () => <Outlet />,
});

const HomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const AboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
});

export const MovieDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/$movieId',
    component: MovieDetails,
});

const NotFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFound,
});

const routeTree = rootRoute.addChildren([
    HomeRoute,
    AboutRoute,
    MovieDetailsRoute,
    NotFoundRoute,
]);

export default routeTree;