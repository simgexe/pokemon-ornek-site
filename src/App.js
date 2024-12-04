import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (!number) return; 

    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setName(response.data.name);
        setWeight(response.data.weight);
      })
      .catch((err) => {
        window.alert(`Hata: ${err.message}`);
      });
  }, [number]);

  return (
    <div className="App">
      <h1>Pokemon</h1>
      <input
        type="number"
        placeholder="Enter Pokemon ID"
        onChange={(e) => setNumber(e.target.value)}
      />
      <h2>Name: {name}</h2>
      <h3>Weight: {weight}</h3>
      {data && data.sprites ? (
        <img
          src={data.sprites.other.dream_world.front_default}
          alt={`${name} sprite`}
        />
      ) : (
        <p>Loading image...</p>
      )}
      <p>My abilities are:</p>
      {data
        ? data.abilities.map((value, key) => (
            <div key={key}>{value.ability.name}</div>
          ))
        : null}
    </div>
  );
}

export default App;
