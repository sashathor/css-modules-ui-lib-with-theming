import { css } from "@emotion/css";
import {
  Button,
  Chart,
  ThemeProvider,
} from "@sashathor/css-modules-ui-lib-with-theming";
import React from "react";
import "./App.css";
import themes from "./themes.module.css";

function App() {
  const [theme, setTheme] = React.useState(themes.light);

  return (
    <div className="App">
      <div style={{ marginBottom: 20 }}>
        <ThemeProvider theme={theme}>
          <div style={{ marginBottom: 20 }}>
            <Button>Button</Button>
          </div>
          <Chart />
        </ThemeProvider>
        <button
          style={{ marginTop: 20 }}
          onClick={() =>
            setTheme(theme === themes.light ? themes.dark : themes.light)
          }
        >
          switch theme
        </button>
      </div>
      <hr />
      <h1>Elements outside the ThemeProvider</h1>
      <h2>Default theme</h2>
      <Button>Button</Button>
      <br />
      <br />
      <Chart />
      <br />
      <h2>Style override via `className` prop</h2>
      <Chart className={themes.customChart} />
      <br />
      <h2>Style override via `style` prop</h2>
      <Chart style={{ backgroundColor: "#00ff00" }} />
      <br />
      <h2>Style override via Emotion's `css` method</h2>
      <Chart
        className={css`
          background-color: orange;
        `}
      />
      <br />
    </div>
  );
}

export default App;
