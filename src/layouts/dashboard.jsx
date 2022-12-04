import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { cloneElement } from "react";
import { useState } from "react";
import { useEffect } from "react";

import * as mqtt from 'mqtt/dist/mqtt.min';

const host = 'ws://broker.emqx.io:8083/mqtt'

const MAX_MSG_QTD = 10

const clientId = 'mqttjs_' + Math.random().toString(16).substring(2, 8)
const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;


  const [client, setClient] = useState(null);
  const [connectionStatus, setConnecttionStatus] = useState('Desconectado');
  const [messages, setMessages] = useState([]);

  const mqttConnect = (host) => {
    setConnecttionStatus('Conectando...');
    setClient(mqtt.connect(host));
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnecttionStatus('Conectado');
        client.subscribe('britcinn/dht');
      });
      client.on('error', (err) => {
        console.error('Erro de conexão: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnecttionStatus('Reconectando...');
      });

      client.on('message', (topic, message) => {
        if (message.toString()) {
          let temp = messages;
          let length = temp.unshift({
            topic,
            message: JSON.parse(message.toString())
          })
          if (length > MAX_MSG_QTD) temp.pop();
          // console.log(temp);
          setMessages(temp);
        }
      });

    }
  }, [client]);

  useEffect(() => {
    mqttConnect(host, options);
  }, []);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <h1>{messages.length}</h1>
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/cpu-chip.svg" : "/img/cpu-chip-dark.svg"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar connectionStatus={connectionStatus} />
        <Configurator />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={cloneElement(element, { messages: messages })} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
