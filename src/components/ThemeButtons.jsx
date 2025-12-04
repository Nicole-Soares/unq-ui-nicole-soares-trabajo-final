import { useTheme } from "../hooks/useTheme";

export default function ThemeButtons() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>🌙</button>
      ) : (
        <button onClick={() => setTheme("light")}>☀️</button>
      )}
    </div>
  );
}
