import { useTeam } from '../../features/team/TeamContext';
import styles from './styles.module.css';

export default function TeamBuilder() {
  const { team, removePokemon } = useTeam();

  return (
    <main className={styles.container}>
      <h1>Team Builder</h1>

      {team.length === 0 && <p>Nenhum Pokémon no time.</p>}

      <div className={styles.team}>
        {team.map(pokemon => (
          <div key={pokemon.name} className={styles.card}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <button onClick={() => removePokemon(pokemon.name)}>Remover</button>
          </div>
        ))}
      </div>
    </main>
  );
}
