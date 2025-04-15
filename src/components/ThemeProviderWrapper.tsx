import React, { useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/helpers/themes';
import { GlobalStyle } from '@/helpers/globalStyles';

export const ThemeToggleContext = React.createContext<{
    isDarkMode: boolean;
    toggleTheme: () => void;
}>({
    isDarkMode: false,
    toggleTheme: () => {},
});

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        } else {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            localStorage.setItem('theme', !prev ? 'dark' : 'light');
            return !prev;
        });
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalStyle />
            <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
                {children}
            </ThemeToggleContext.Provider>
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;