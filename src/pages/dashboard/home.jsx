import React from "react";
import {
  Typography
} from "@material-tailwind/react";
import {
  ClockIcon
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  lineChart,
} from "@/data";
import { useState } from "react";
import { useEffect } from "react";

import britcinn_svg from '../../assets/britcinn.svg';

const MAX_DHT_QTD = 10;

const default_data = {
  dht: {
    temp: 0,
    hum: 0
  }, 
  api: {
    avg_temp: 24, 
    avg_hum: 55,
    clients_online: 1,
    exp_clients: 1
  },  
}

const default_charts_data = [
  {
    color: "pink",
    title: "Temperatura",
    description: "Histórico de temperatura",
    footer: `Max. ${MAX_DHT_QTD} registros`,
    chart: lineChart("Temperatura", []),
  },
  {
    color: "blue",
    title: "Umidade",
    description: "Histórico de umidade",
    footer: `Max. ${MAX_DHT_QTD} registros`,
    chart: lineChart("Umidade", []),
  }
];  

export function Home({message, messages}) {

  const [statisticsData, setStatisticsData] = useState(default_data);
  const [lastDht, setLastDht] = useState([]);
  const [lastTemp, setLastTemp] = useState([]);
  const [lastHum, setLastHum] = useState([]);
  const [latestDht, setLatestDht] = useState(null);
  
  const [statisticsChartsData, setStatisticsChartsData] = useState(default_charts_data);

  useEffect(() => {
    let chart_data = statisticsChartsData;
    chart_data[0].chart = lineChart("Temperatura", lastTemp);
    chart_data[1].chart = lineChart("Umidade", lastHum);
    setStatisticsChartsData(chart_data);
  }, [latestDht]);

  useEffect(() => {
    if (message) {
      const updateDht = () => {        
        if (message.topic == 'britcinn/dht') {
          let temp = lastDht;
          let length = temp.unshift(message.message);
          if (length > MAX_DHT_QTD) temp.pop();
          setLastDht(temp);

          temp = lastTemp;
          length = temp.push(message.message.temp);
          if (length > MAX_DHT_QTD) temp.shift();
          setLastTemp(temp);

          temp = lastHum;
          length = temp.push(message.message.hum);
          if (length > MAX_DHT_QTD) temp.shift();
          setLastHum(temp);

          setLatestDht(message.message);

          if(lastDht.length != 0) {
            let temp = statisticsData;

            let sum_temperatures = 0, sum_humidity = 0;
            for (let index = 0; index < lastDht.length; index++) {
              sum_temperatures += lastDht[index].temp;
              sum_humidity += lastDht[index].hum;
            }

            temp.dht = {
              temp: Math.floor(sum_temperatures / lastDht.length),
              hum: Math.floor(sum_humidity / lastDht.length)
            }

            setStatisticsData(temp);
          }
        }

      }
      updateDht();
    }
  }, [message]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData(statisticsData).map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
        <img src={britcinn_svg} alt="" />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        
      </div>
    </div>
  );
}

export default Home;
