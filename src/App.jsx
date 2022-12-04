import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import "./css/tailwind.css"

import * as mqtt from 'mqtt/dist/mqtt.min';
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState('Desconectado');
  const [payload, setPayload] = useState(null);

  const mqttConnect = (host) => {
    setConnectStatus('Conectando...');
    setClient(mqtt.connect(host));
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Conectado');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });

      client.subscribe('britcinn-dht');
    }
  }, [client]);

  useEffect(() => {
    mqttConnect("wss://broker.hivemq.com:8000");
  }, []);
  
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard connectStatus={connectStatus} payload={payload}/>} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace/>} />
    </Routes>
  );
}

export default App;
