export const themeChanger = (theme: string) => {
  const rootElement = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (newTheme: string) => {
    const isDarkTheme =
      newTheme === 'dark' || (newTheme === 'system' && darkQuery.matches);
    rootElement.classList.toggle('dark', isDarkTheme);
  };

  const handleSystemThemeChange = () => {
    if (theme === 'system') {
      applyTheme(theme);
    }
  };

  applyTheme(theme);

  darkQuery.addEventListener('change', () => handleSystemThemeChange());
};
