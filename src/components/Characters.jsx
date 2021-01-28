import React, { useState, useEffect, useReducer, useMemo, useRef } from 'react'

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
  const [search, setSearch] = useState('')
  const searchInput = useRef(null)

  console.log('FAVORITOS', favorites)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
  }, []);

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  const handleSearch = () => {
    setSearch(searchInput.current.value)
  }

  // const filteredUser = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })

  const filteredUser = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }), [characters, search])

  return (
    <div className='Characters'>
      <div className="search">
        <input type="text" value={search} ref={searchInput} onChange={handleSearch} />
      </div>
      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}
      {/* utilizamos filterdUser en vez de characteres */}
      {filteredUser.map(character => (
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