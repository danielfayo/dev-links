import { configureStore } from '@reduxjs/toolkit'
import linkReduer from './features/linksSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        links: linkReduer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatc = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;