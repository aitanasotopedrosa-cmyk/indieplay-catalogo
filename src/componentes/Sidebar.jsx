import React from 'react';

export default function Sidebar({ seccionActiva, setSeccionActiva }) {
  const opciones = ['Explorar', 'Géneros', 'Mis Favoritos'];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {opciones.map((opcion) => (
            <li
              key={opcion}
              className={seccionActiva === opcion ? 'active' : ''}
              onClick={() => setSeccionActiva(opcion)}
            >
              {opcion}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}