import React, { useState, useEffect, useReducer } from 'react'

const initialState = {
  favorites: []
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  console.log('FAVORITOS', favorites)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  }, []);

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  return (
    <div className='Characters'>
      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}

      {characters.map(character => (
        <div className='item' key={character.id}>
          <img src={character.image} alt='imagen' />
          <h2>{character.name}</h2>
          <h6>{character.species}</h6>
          <button type='button' onClick={() => handleClick(character)}>Agregar a favoritos</button>
        </div>
      ))}
    </div>
  );
}

export default Characters;