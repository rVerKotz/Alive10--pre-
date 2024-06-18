import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import Home from './components/Home';
import Disease from './components/Disease';
import ContactForm from './components/Contact';
import './App.css'

interface WindowSizeContextType {
  width: number;
  height: number;
}

export const WindowSize = createContext<WindowSizeContextType>({
  width: window.innerWidth,
  height: window.innerHeight
});

function App() {
  const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return() => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowSize.Provider value={windowDimensions}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/disease" element={<Disease/>} />
          <Route path="/feedback" element={<ContactForm/>} />
        </Routes>
      </Router>
    </WindowSize.Provider>
  );
};

export default App;
