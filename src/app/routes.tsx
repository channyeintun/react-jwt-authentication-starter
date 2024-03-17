import { createBrowserRouter, RouterProvider, Navigate, RouteObject, redirect } from 'react-router-dom';
import { RouteGuard } from '@/components/RouteGuard';
import { MainLayout } from '@/components/layout/MainLayout';
import { Login } from '@/pages';
import useAuthStore from '@/store/auth';
import { apiUtils } from '@/services/utils';

type RouteType = RouteObject & { auth?: boolean };

export const RootRouter = () => {
    const { token } = useAuthStore();

    const isAuthenticated = !!token;

    const routes: RouteType[] = [
        {
            loader: async () => {
                if (!isAuthenticated) {
                    return redirect('/login');
                }
                apiUtils.setAPIToken(token);
                apiUtils.set401LogoutIntercetor(() => {
                    redirect('/login');
                });
                return null;
            },
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="home" />,
                },
                {
                    path: 'home',
                    element: <h1>Home page</h1>,
                },
            ],
            auth: true,
        },
        {
            loader: async () => {
                if (isAuthenticated) {
                    return redirect('/');
                }
                return null;
            },
            path: '/login',
            element: <Login />,
        },
        { path: '*', element: <h1>Page Not Found</h1> },
    ];

    const RoutesWithGuards = routes.map(addRouteGuard);

    const router = createBrowserRouter(RoutesWithGuards);

    return <RouterProvider router={router} />;
};

export function addRouteGuard(route: RouteType) {
    const { element, auth, ...rest } = route;
    if (auth) {
        return {
            element: <RouteGuard>{element}</RouteGuard>,
            ...rest,
        };
    }
    return route;
}
