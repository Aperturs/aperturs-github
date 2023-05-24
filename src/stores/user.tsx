
import { Models } from "appwrite"
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type UserState = {
    user: Models.User<Models.Preferences> | null;
    setUser: (user: Models.User<Models.Preferences>) => void;
}
const useUserStore = create(persist<UserState>(
    (set, get) => ({
        user: null,
        setUser: (user: Models.User<Models.Preferences>) => set({ user }),

    }),
    {
        name: 'user-storage',
    }
));
export { useUserStore };