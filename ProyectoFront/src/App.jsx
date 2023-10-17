import ResponsiveAppBar from './components/ResponsiveAppBar'
import Dashboard from './pages/Dashboard'
import Login from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={Login}/>
    <Route path='/dashboard' Component={Dashboard}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
