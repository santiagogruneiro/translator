import './App.css';
import { useEffect } from 'react';
import { handlerTranslator } from './services/handlerTranslator'
import 'bootstrap/dist/css/bootstrap.css';
import Translate from './components/js/Translate';
import axios from 'axios';

function App() {

  useEffect(() => {
    // axios.get('http://localhost:5000/api/counter')
    // .then(r=>console.log(r))
    // .catch(error=>console.log(error))
  }, [])

  return (
    <div className="container-fluid p-0 m-0 ">
      <Translate/>
    </div>
  );
}

export default App;
