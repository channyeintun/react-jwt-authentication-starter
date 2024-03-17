import { Navigate, useLocation } from 'react-router-dom';

import useAuthStore from '@/store/auth';

type RouteGuardProps = {
    children: React.ReactNode;
};

export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const location = useLocation();

    const { token } = useAuthStore();

    const isAuthenticated = !!token;

    if (isAuthenticated) {
        return children;
    }
    return (
        <Navigate
            to="/login"
            state={{
                from: location,
            }}
            replace
        />
    );
};
