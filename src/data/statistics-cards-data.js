import {
  FireIcon
} from "@heroicons/react/24/solid";
import { IconAlien, IconDeviceDesktopAnalytics, IconDroplet, IconDropletFilled2, IconDropletOff } from "@tabler/icons";

export const statisticsCardsData = (data) => {
  
  let diff_temp = data.dht.temp - data.api.avg_temp;
  let diff_hum = data.dht.hum - data.api.avg_hum;
  let diff_clients = data.api.exp_clients - data.api.clients_online;

  return  [
  {
    color: diff_temp == 0 ? "orange" : (diff_temp > 0 ? "red" : "blue"),
    icon: FireIcon,
    title: "Temperatura média",
    value: `${data.dht.temp}°C`,
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
    value: `${data.dht.hum}%`,
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
    value: data.api.clients_online,
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
]};

export default statisticsCardsData;
