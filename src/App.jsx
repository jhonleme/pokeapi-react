import { useState, useEffect } from 'react';
import lucarioBanner from './assets/Lucário_Pokéone.png';

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(poke =>
          fetch(poke.url).then(res => res.json())
        );

        Promise.all(promises).then(pokeDetails => {
          setPokemons(pokeDetails);
        });
      });
  }, []);

  return (
    <div>
      <img
        src={lucarioBanner}
        alt="Pokéone Banner"
        style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}
      />
      <h1>Lista de Pokémons</h1>
      <ul>
        {pokemons.map(poke => (
          <li key={poke.id}>
            <h3>{poke.name}</h3>
            <img src={poke.sprites.front_default} alt={poke.name} />
            <p>Altura: {poke.height}</p>
            <p>Peso: {poke.weight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
