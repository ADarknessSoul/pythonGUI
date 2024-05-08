import React from 'react'
import ReactDOM from 'react-dom/client'
//import 'bootstrap-css';
import { PythonGUI } from './Components/PythonGUI.jsx';
import './normalize.css';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PythonGUI />
  </React.StrictMode>,
)
