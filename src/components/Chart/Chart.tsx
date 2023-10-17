import { Chart as ChartJs } from "chart.js/auto";
import React from "react";
import defaultTheme from "../../themes/light-theme.css";
import { useTheme } from "../ThemeProvider";
import styles from "./Chart.module.css";

export interface ChartProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Chart = ({ className, ...props }: ChartProps) => {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const [chart, setChart] = React.useState<ChartJs | null>(null);
  const { themeObj } = useTheme();
  const classes = React.useMemo(
    () => [defaultTheme[":root"], styles.rootChart, className],
    [className]
  );

  const destroyChart = () => {
    if (chart) {
      chart.destroy();
    }
    if (ref.current) {
      ref.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      destroyChart();
    };
  }, []);

  React.useEffect(() => {
    if (!(ref.current && themeObj && !Boolean(chart))) {
      return;
    }

    setChart(
      new ChartJs(ref.current, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
              backgroundColor: themeObj.textColor,
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: themeObj.textColor,
              },
              beginAtZero: true,
            },
            y: {
              ticks: {
                color: themeObj.textColor,
              },
              beginAtZero: true,
            },
          },
        },
      })
    );
  }, [ref, chart, themeObj]);

  React.useEffect(() => {
    if (!(chart && themeObj)) {
      return;
    }

    const dataset = chart.data.datasets[0];
    if (chart.options.scales?.x?.ticks?.color) {
      chart.options.scales.x.ticks.color = themeObj.textColor;
    }
    if (chart.options.scales?.y?.ticks?.color) {
      chart.options.scales.y.ticks.color = themeObj.textColor;
    }
    dataset.backgroundColor = themeObj.textColor;
    chart.update();
  }, [ref, chart, themeObj]);

  if (!themeObj) {
    return null;
  }

  return (
    <div className={classes.join(" ")} {...props}>
      {JSON.stringify(themeObj, null, 2)}
      <canvas ref={ref} />
    </div>
  );
};
