

import { UserDoc } from '@/types/user';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

type UserStoreState = {
    user: UserDoc | null;
    setUser: (user: UserDoc) => void;

}

const useUserStore = create(persist<UserStoreState>(
    (set, get) => ({
        user: null,
        setUser: (user: UserDoc) => set({ user }),
    }),

    {
        name: 'user-storage',
    }
));
export { useUserStore };