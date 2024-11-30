import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const USER_STORAGE = "user"

type UserType = {
    username: string
    email: string
    token: string
}

type GlobalStoreType = {
    user: UserType | null
    token: string | undefined
    saveUser: (user: UserType) => void
    logout: () => void
}

export const useGlobalStore = create<GlobalStoreType>()(
    persist(
        (set) => ({
            token: undefined,
            user: null,
            saveUser: (user: UserType) => {
                set({ user, token: user.token })
                localStorage.setItem(USER_STORAGE, JSON.stringify(user))
            },
            logout: () => {
                set({ user: null, token: undefined })
                localStorage.removeItem(USER_STORAGE)
            }
        }),

        {
            name: "global-store",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
