import React, { createContext, useContext, useState } from "react";

type ThemeContextProps = {
  themeObj?: Theme;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

type ThemeProviderProps = {
  children?: React.ReactNode;
  theme?: string;
};

type ThemeProps = "bgColor" | "textColor";

type ThemeObjDictProps = {
  name: ThemeProps;
  cssVarName: string;
};

const themeObjDict: ThemeObjDictProps[] = [
  { name: "bgColor", cssVarName: "--theme-bg-color" },
  { name: "textColor", cssVarName: "--theme-text-color" },
];

type Theme = {
  bgColor?: string;
  textColor?: string;
};

const parseComputedStyle = (themeContainer: HTMLElement) => {
  const computedStyle = getComputedStyle(themeContainer);
  const themeObj: Theme = {};

  themeObjDict.forEach((item) => {
    const cssVarValue = computedStyle.getPropertyValue(item.cssVarName);
    if (cssVarValue) {
      themeObj[item.name] = cssVarValue;
    }
  });
  return themeObj;
};

export const useTheme = (): { themeObj?: Theme } => {
  const context = useContext(ThemeContext);

  if (!context) {
    return { themeObj: parseComputedStyle(document.body) };
  }

  return context;
};

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const [themeObj, setThemeObj] = useState<Theme | undefined>();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    setThemeObj(parseComputedStyle(ref.current));
  }, [ref, theme]);

  return (
    <div ref={ref} className={theme}>
      <ThemeContext.Provider value={{ themeObj }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
