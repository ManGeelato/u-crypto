import React, { useEffect, useState, createContext } from "react";

const getDisplayTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPreferences = window.localStorage.getItem("color-theme");
    if (typeof storedPreferences === "string") {
      return storedPreferences;
    }

    const userMediaPreferences = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (userMediaPreferences.matches) {
      return "dark";
    }
  }
  return "light";
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getDisplayTheme);

  const setThemeOnClick = (theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    setThemeOnClick(initialTheme);
  }

  useEffect(() => {
    setThemeOnClick(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
