import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.js";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDark, setIsDark] = useLocalStorageState(false, 'isDark');

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDark]);

    function toggleDarkMode() {
        setIsDark(isDark => !isDark);
    }

    return <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
        {children}
    </DarkModeContext.Provider>
}

function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (context === undefined) throw new Error('DarkModeContext was used outside of DarkModeProvider');

    return context;
}

export { DarkModeProvider, useDarkMode };
