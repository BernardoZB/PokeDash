import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTeam } from '../../..//features/team/TeamContext';
import Toast from '../../..//shared/components/Toast';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon }) {
  const { addPokemon, team } = useTeam();
  const [toast, setToast] = useState(false);

  const alreadyInTeam = team.some(p => p.name === pokemon.name);

  const handleAdd = e => {
    e.preventDefault();
    if (alreadyInTeam) return;

    addPokemon(pokemon);
    setToast(true);
    setTimeout(() => setToast(false), 1600);
  };

  return (
    <>
      <Link to={`/pokemon/${pokemon.name}`} className={styles.card}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
        />
        <h3>{pokemon.name.toUpperCase().charAt(0) + pokemon.name.slice(1)}</h3>

        <button
          className={styles.addButton}
          onClick={handleAdd}
          disabled={alreadyInTeam}
        >
          {alreadyInTeam ? 'No time' : 'Adicionar ao time'}
        </button>
      </Link>

      <Toast open={toast} message={`${pokemon.name} adicionado ao time`} />
    </>
  );
}
