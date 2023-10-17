import styles from "./page.module.css";
import {
  Chart,
  ThemeProvider,
} from "@sashathor/css-modules-ui-lib-with-theming";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 style={{ margin: "20px 0" }}>Custom Theme</h1>
      <ThemeProvider theme={styles.customTheme}>
        <Chart>Exported Chart</Chart>
      </ThemeProvider>
      <h1 style={{ margin: "20px 0" }}>Default Theme</h1>
      <Chart />
    </main>
  );
}
