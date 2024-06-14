import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/MainPage';
import { Results } from './pages/Results';
import { useState } from 'react';

function App() {
  const [results, setResults] = useState([]);
  const [role, setRole] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage setResults={setResults} role={role} setRole={setRole} />} />
        <Route path="/result" element={<Results results={results} role={role}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
