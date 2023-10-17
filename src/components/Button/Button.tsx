import React from "react";
import defaultTheme from "../../themes/light-theme.css";
import { useTheme } from "../ThemeProvider";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const { themeObj } = useTheme();
  const classes = React.useMemo(
    () => [defaultTheme[":root"], styles.rootButton, className],
    [className]
  );

  if (!themeObj) {
    return null;
  }

  return (
    <button className={classes.join(" ")} {...props}>
      {children}
    </button>
  );
};
