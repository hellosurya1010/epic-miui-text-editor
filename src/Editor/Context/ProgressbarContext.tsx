import { ReactNode, createContext, useContext, useState } from "react";

type Progressbar = {
    show: boolean,
    color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
}

type ProgressbarContextType = {
    progressbar: Progressbar,
    setProgressbar: React.Dispatch<React.SetStateAction<Progressbar>>
}

const ProgressbarContext = createContext<ProgressbarContextType | undefined>(undefined);

export const useProgressbarContext = (): ProgressbarContextType => {
    const context = useContext(ProgressbarContext);
    if (!context) {
        throw new Error('useCountContext must be used within a CountProvider');
    }
    return context;
};

export function ProgressbarProvider({ children }: { children: ReactNode }) {
    const [progressbar, setProgressbar] = useState<Progressbar>({ show: false, color: 'info' });
    const value: ProgressbarContextType = { progressbar, setProgressbar };
    return (<ProgressbarContext.Provider value={value}>
        {children}
    </ProgressbarContext.Provider>)
}