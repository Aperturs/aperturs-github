
import { UserAccount } from "@/types/user";
import { Models, ID } from "appwrite"
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

type AccountStoreState = {
    account: UserAccount | null;
    setAccount: (account: UserAccount) => void;

}

const useAccountStore = create(persist<AccountStoreState>(
    (set, get) => ({
        account: null,
        setAccount: (account: UserAccount) => set({ account }),
    }),

    {
        name: 'account-storage',
    }
));
export { useAccountStore };