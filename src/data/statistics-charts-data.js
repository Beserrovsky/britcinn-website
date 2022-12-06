import { chartsConfig } from "@/configs";

export const lineChart = (name, data) => {
  return ( 
    {
      type: "line",
      height: 220,
      series: [
        {
          name: name,
          data: data,
        },
      ],
      options: {
        ...chartsConfig,
        colors: ["#fff"],
        stroke: {
          lineCap: "round",
        },
        markers: {
          size: 5,
        },
        xaxis: {
          ...chartsConfig.xaxis,
          categories: [],
        },
      },
    });
}
