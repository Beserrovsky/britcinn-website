import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import "./css/tailwind.css"

import * as mqtt from 'mqtt/dist/mqtt.min';
import { useState } from "react";
import { useEffect } from "react";


const host = 'ws://broker.emqx.io:8083/mqtt'
// const host = 'ws://broker.hivemq.com:8080'
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
function App() {

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
        client.subscribe('BRITCINN_db');
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
          temp.push({
            topic,
            message: JSON.parse(message.toString())
          })
          setMessages(temp);
        }
      });
    }
  }, [client, setMessages]);

  useEffect(() => {
    if (messages) {
      console.log(messages);
    }
  }, [messages]);

  useEffect(() => {
    mqttConnect(host, options);
  }, []);
  
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard connectionStatus={connectionStatus} messages={messages}/>} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace/>} />
    </Routes>
  );
}

export default App;
