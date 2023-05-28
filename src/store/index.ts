import {create} from 'zustand'
interface GlobalStoreType {
    themeMode: string
}

const getLocalMode = () => {
    return window.localStorage['spacex_demo_mode'] || 'dark'
}

const setLocalMode = (mode: string) => {
    window.localStorage['spacex_demo_mode'] = mode
}
export const useGlobalStore = create((set) => ({
    themeMode: getLocalMode(),
    setThemeMode: () => set((state: GlobalStoreType) => {
        const newTheme = state.themeMode ==='dark'?'light':'dark'
        setLocalMode(newTheme)
        return {themeMode:newTheme}
    }),
}))
