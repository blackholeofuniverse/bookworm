import { create } from "zustand"

export const useAuthStore = create((set, get) => {
    user: { name: "john" },
    sayHello: () => console.log("hello from auth store")
})                  