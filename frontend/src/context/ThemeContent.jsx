import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] =
        useState(false);

    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                "darkMode"
            );

        if (savedTheme === "true") {

            setDarkMode(true);

            document.body.classList.add(
                "dark-mode"
            );

        }

    }, []);

    const toggleDarkMode = () => {

        const newMode =
            !darkMode;

        setDarkMode(
            newMode
        );

        localStorage.setItem(
            "darkMode",
            newMode
        );

        if (newMode) {

            document.body.classList.add(
                "dark-mode"
            );

        } else {

            document.body.classList.remove(
                "dark-mode"
            );

        }

    };

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                toggleDarkMode
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

}

export function useTheme() {

    return useContext(
        ThemeContext
    );

}