import React from 'react';

export default function GameCard({ juego, onVerDetalles, esFavorito, onToggleFavorito }) {
  return (
    <div className="game-card">
      <div className="game-card-img-container">
        <img src={juego.imagen} alt={juego.titulo} className="game-card-img" />
        <button 
          className={`fav-btn ${esFavorito ? 'is-fav' : ''}`}
          onClick={() => onToggleFavorito(juego.id)}
          title="Agregar a Favoritos"
        >
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="game-card-info">
        <span className="game-card-genre">{juego.genero}</span>
        <h3 className="game-card-title">{juego.titulo}</h3>
        <p className="game-card-developer">{juego.estudio}</p>
        <button className="details-btn" onClick={() => onVerDetalles(juego)}>
          Ver Detalles
        </button>
      </div>
    </div>
  );
}