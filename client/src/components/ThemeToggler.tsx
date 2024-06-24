import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeToggler = () => {
  const theme = useTheme();

  const toggleTheme = () => {
    theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme}>
      {theme.resolvedTheme === "dark" ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-gray-800" />
      )}
    </button>
  );
};
