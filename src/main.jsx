import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { Start, TopologySelected, TopologyExplore, LKPD, Reflection, Quiz } from './pages'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/start" element={<Start />} />
        <Route path="/topology" element={<TopologySelected />} />
        <Route path="/topology/explore" element={<TopologyExplore />} />
        <Route path="/lkpd" element={<LKPD />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)