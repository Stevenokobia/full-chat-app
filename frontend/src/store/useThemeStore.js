import { create } from "zustand";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "coffee";
  return localStorage.getItem("chat-theme") || "coffee";
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }

    set({ theme });
  },
}));