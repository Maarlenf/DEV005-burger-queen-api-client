import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/home/App'
// import Mentira from '.components/home/Mentira'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />,
    {/* <Mentira /> */}
  </React.StrictMode>,
)
