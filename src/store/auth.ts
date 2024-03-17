import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
    id: number;
    username: string;
    role: string;
};

type AuthStore = {
    user?: User;
    token?: string;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
};

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: undefined,
            token: undefined,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

export default useAuthStore;
