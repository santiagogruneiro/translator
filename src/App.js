import './App.css';
import {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Translate from './components/js/Translate';;
import Menu from './components/js/Menu';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div
      className={darkMode ? "container-fluid p-0 m-0 bg-dark text-light" :
        "container-fluid p-0 m-0 bg-light text-dark"}>
      <header className='app-header'>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
      </header>
      <Translate darkMode={darkMode}/>
    </div>
  );
}

export default App;
