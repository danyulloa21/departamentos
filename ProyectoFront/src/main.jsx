import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (import.meta.env.DEV) {
    console.log('Development mode')
} else if (import.meta.env.PROD) {
    console.log('Production mode')
}


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App />
  
)
