import { createContext, useContext, useState, type ReactNode } from 'react'

interface DisplayNameContextValue {
    displayName: string
    setDisplayName: (name: string) => void
}

const DisplayNameContext = createContext<DisplayNameContextValue | undefined>(undefined)

export function DisplayNameProvider({ children }: { children: ReactNode }) {
    const [displayName, setDisplayName] = useState('')

    return (
        <DisplayNameContext.Provider value={{ displayName, setDisplayName }}>
            {children}
        </DisplayNameContext.Provider>
    )
}

export function useDisplayName() {
    const ctx = useContext(DisplayNameContext)
    if (!ctx) {
        throw new Error('useDisplayName must be used within DisplayNameProvider')
    }
    return ctx
}

