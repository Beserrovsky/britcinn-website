import {
  FireIcon
} from "@heroicons/react/24/solid";
import { IconAlien, IconDeviceDesktopAnalytics, IconDroplet, IconDropletFilled2, IconDropletOff } from "@tabler/icons";

let temperature = 12;
let avg_temperature = 28;

let diff_temp = temperature - avg_temperature;

let humidty = 12;
let avg_humidity = 14;
let diff_hum = humidty - avg_humidity;

let clients_online = 1;
let exp_clients = 2;
let diff_clients = exp_clients - clients_online;

export const statisticsCardsData = [
  {
    color: diff_temp == 0 ? "orange" : (diff_temp > 0 ? "red" : "blue"),
    icon: FireIcon,
    title: "Temperatura média",
    value: `${temperature}°C`,
    footer: {
      color: `text-${diff_temp > 0 ? "red" : "blue"}-500`,
      value: diff_temp != 0? `${Math.abs(diff_temp)}°C` : "",
      label: diff_temp == 0 ? "Bem na média histórica!" : (diff_temp > 0? "a mais que o padrão" : "a menos que o padrão"),
    },
  },
  {
    color: diff_hum == 0 ? "gray" : (diff_hum > 0 ? "blue" : "brown"),
    icon: diff_hum == 0 ? IconDroplet : (diff_hum > 0 ? IconDropletFilled2 : IconDropletOff),
    title: "Umidade média",
    value: `${humidty}%`,
    footer: {
      color: `text-${diff_hum > 0 ? "purple" : "brown"}-500`,
      value: diff_hum != 0? `${Math.abs(diff_hum)}%` : "",
      label: diff_hum == 0 ? "Bem na média histórica!" : (diff_hum > 0? "a mais que o padrão" : "a menos que o padrão"),
    },
  },
  {
    color: "green",
    icon: IconDeviceDesktopAnalytics,
    title: "Clients online",
    value: clients_online,
    footer: {
      color: `text-${diff_clients > 0 ? "red" : "grey"}-500`,
      value: `${diff_clients}`,
      label: "dispositivo(s) offline",
    },
  },
  {
    color: "green",
    icon: IconAlien,
    title: "Alien",
    value: `${Math.floor(Math.random() * 100)} Aliens`,
    footer: {
      label: "Isso não significa nada!",
    },
  },
];

export default statisticsCardsData;
