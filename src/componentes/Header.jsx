import React, { useState } from 'react';

export default function Header() {
  const [usuario, setUsuario] = useState(null);

  const handleAuth = () => {
    if (usuario) {
      setUsuario(null);
    } else {
      setUsuario('Nikol');
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">IndiePlay - Catálogo</h1>
      <button className="login-btn" onClick={handleAuth}>
        {usuario ? `Hola, ${usuario} (Cerrar Sesión)` : 'Iniciar Sesión'}
      </button>
    </header>
  );
}