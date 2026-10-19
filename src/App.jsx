import React, { useState } from 'react';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import GameCard from './componentes/GameCard';
import './App.css';

export default function App() {
  const [seccionActiva, setSeccionActiva] = useState('Explorar');
  const [generoFiltro, setGeneroFiltro] = useState('Todos');
  const [favoritos, setFavoritos] = useState([]);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  // Lista con los 6 juegos requeridos e imágenes reales
  const juegos = [
    {
      id: 1,
      titulo: 'Hollow Knight',
      estudio: 'Team Cherry',
      genero: 'Metroidvania',
      descripcion: 'Forja tu propio camino en Hollow Knight, una aventura de acción épica a través de un reino en ruinas de insectos y héroes.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHAMRzTxEkE8vaZaCIXbctzXl2BSM9M6_PLhjV_rBZg&s=10',
    },
    {
      id: 2,
      titulo: 'Celeste',
      estudio: 'Extremely OK Games',
      genero: 'Plataformas',
      descripcion: 'Ayuda a Madeline a sobrevivir a sus demonios internos en su viaje a la cima de la montaña Celeste.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkI6x7JzYh0c-sD-ygUKUEeAiRvI1wz0u3T6Lg3QqOJ-VPOTaxSsF9fFne&s=10',
    },
    {
      id: 3,
      titulo: 'Stardew Valley',
      estudio: 'ConcernedApe',
      genero: 'Simulación / RPG',
      descripcion: 'Heredaste la antigua parcela de cultivo de tu abuelo en Stardew Valley. ¡Construye la granja de tus sueños!',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dsOGnbVSFNaBJIGKLwi7l-0RmQ7nf3no5eCRD1H4mA&s=10',
    },
    {
      id: 4,
      titulo: 'Hades',
      estudio: 'Supergiant Games',
      genero: 'Roguelike',
      descripcion: 'Desafía al dios del inframundo mientras peleas y te abres paso a machetazos para escapar en este roguelike.',
      imagen: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg?t=1758127023',
    },
    {
      id: 5,
      titulo: 'Dead Cells',
      estudio: 'Motion Twin',
      genero: 'Roguelike',
      descripcion: 'Dead Cells es un juego de plataformas de acción tipo rogue-lite y metroidvania.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj58QWyDLJqX4tyzIp_BAJRlambOvLPMRSZc02fWg8bQ&s=10',
    },
    {
      id: 6,
      titulo: 'Cuphead',
      estudio: 'Studio MDHR',
      genero: 'Acción / Run & Gun',
      descripcion: 'Un juego de acción clásico centrado en combates contra jefes, inspirado en los dibujos animados de los años 30.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7M0ZcPrWOrA3LfZEEc6aZKtV_VV4bnUnCuY0M7-PgLQ&s=10',
    },
  ];

  // Alternar Favoritos
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // Filtrado de juegos según sección activa
  const juegosFiltrados = juegos.filter((juego) => {
    if (seccionActiva === 'Mis Favoritos') {
      return favoritos.includes(juego.id);
    }
    if (seccionActiva === 'Géneros' && generoFiltro !== 'Todos') {
      return juego.genero.includes(generoFiltro);
    }
    return true;
  });

  const generosDisponibles = ['Todos', 'Metroidvania', 'Plataformas', 'Simulación / RPG', 'Roguelike', 'Acción / Run & Gun'];

  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />
        
        <main className="dashboard-content">
          <h2 className="section-title">{seccionActiva}</h2>

          {/* Filtros de Género */}
          {seccionActiva === 'Géneros' && (
            <div className="genre-filters">
              {generosDisponibles.map((g) => (
                <button
                  key={g}
                  className={`genre-btn ${generoFiltro === g ? 'active' : ''}`}
                  onClick={() => setGeneroFiltro(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          )}

          {/* Grid de Juegos */}
          {juegosFiltrados.length === 0 ? (
            <p className="empty-msg">No hay videojuegos para mostrar en esta sección.</p>
          ) : (
            <div className="games-grid">
              {juegosFiltrados.map((juego) => (
                <GameCard
                  key={juego.id}
                  juego={juego}
                  esFavorito={favoritos.includes(juego.id)}
                  onToggleFavorito={toggleFavorito}
                  onVerDetalles={setJuegoSeleccionado}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal de Detalles */}
      {juegoSeleccionado && (
        <div className="modal-overlay" onClick={() => setJuegoSeleccionado(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={juegoSeleccionado.imagen} alt={juegoSeleccionado.titulo} className="modal-img" />
            <h3>{juegoSeleccionado.titulo}</h3>
            <p className="modal-dev"><strong>Desarrollador:</strong> {juegoSeleccionado.estudio}</p>
            <p className="modal-genre"><strong>Género:</strong> {juegoSeleccionado.genero}</p>
            <p className="modal-desc">{juegoSeleccionado.descripcion}</p>
            <button className="close-btn" onClick={() => setJuegoSeleccionado(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}