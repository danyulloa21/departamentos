import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

function Dashboard() {
  const location = useLocation();
  const nav = useNavigate();
  const [user, setUser] = useState(location.state);

  

  const handleLogout = () => {
    // Realiza cualquier lógica necesaria para el logout, como eliminar tokens o datos de sesión.
    // Luego, redirige al usuario de vuelta a la página de inicio de sesión.

    // Ejemplo: Limpiar datos de sesión y redirigir al usuario a la página de inicio de sesión.
    setUser(null); // Limpia los datos de usuario
    nav('/');
  };

  return (
    <>
      {/* <div>
        <h1>Dashboard</h1>
        {user && <h2>Bienvenido {user.accountName}</h2>}
        <button onClick={handleLogout}>Logout</button>
      </div> */}
      <ResponsiveAppBar onLogOut={handleLogout} userInfo={user}/>
    </>
  );
}

export default Dashboard;
