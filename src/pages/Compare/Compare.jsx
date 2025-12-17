import { useState } from 'react';
import { usePokemonName } from '../../features/pokemon/hooks/usePokemon';
import Loader from '../../shared/components/Loader';
import styles from './styles.module.css';

export default function Compare() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  const pokemon1 = usePokemonName(first);
  const pokemon2 = usePokemonName(second);

  return (
    <main className={styles.container}>
      <h1>Comparar Pokémon</h1>

      <div className={styles.inputs}>
        <input
          placeholder="Primeiro Pokémon"
          value={first}
          onChange={e => setFirst(e.target.value.toLowerCase())}
        />
        <input
          placeholder="Segundo Pokémon"
          value={second}
          onChange={e => setSecond(e.target.value.toLowerCase())}
        />
      </div>

      <div className={styles.compare}>
        {[pokemon1, pokemon2].map((poke, index) => {
          if (poke.isLoading) return <Loader key={index} />;
          if (!poke.data) return null;

          return (
            <div key={index} className={styles.card}>
              <h2>{poke.data.name}</h2>
              <img src={poke.data.sprites.front_default} alt={poke.data.name} />
              <ul>
                {poke.data.stats.map(stat => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
