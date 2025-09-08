// context/OpenContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface OpenContextProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const OpenContext = createContext<OpenContextProps | undefined>(undefined);

export const OpenProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(true);

    return (
        <OpenContext.Provider value={{ open, setOpen }}>
            {children}
        </OpenContext.Provider>
    );
};

export const useOpen = (): OpenContextProps => {
    const context = useContext(OpenContext);
    if (!context) {
        throw new Error("useOpen must be used within an OpenProvider");
    }
    return context;
};
