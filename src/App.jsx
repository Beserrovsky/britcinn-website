import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import "./css/tailwind.css"

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace/>} />
    </Routes>
  );
}

export default App;
