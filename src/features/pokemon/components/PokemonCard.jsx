import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useTeam } from '../../../features/team/TeamContext';
import Toast from '../../../shared/components/Toast';
import styles from './PokemonCard.module.css';

const MAX_TEAM_SIZE = 6;

export default function PokemonCard({ pokemon }) {
  const { addPokemon, removePokemon, team } = useTeam();
  const [toast, setToast] = useState({ open: false, message: '' });

  const alreadyInTeam = team.some(p => p.name === pokemon.name);
  const teamIsFull = team.length >= MAX_TEAM_SIZE;

  const showToast = message => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: '' }), 1800);
  };

  const handleAction = e => {
    e.preventDefault();
    e.stopPropagation();

    // REMOVER
    if (alreadyInTeam) {
      removePokemon(pokemon.name);
      showToast(`${capitalize(pokemon.name)} removido do time`);
      return;
    }

    // TIME CHEIO
    if (teamIsFull) {
      showToast('Seu time já possui 6 Pokémon');
      return;
    }

    // ADICIONAR
    addPokemon(pokemon);
    showToast(`${capitalize(pokemon.name)} adicionado ao time`);
  };

  return (
    <>
      <Card className={styles.card}>
        <Link to={`/pokemon/${pokemon.id}`} className={styles.linkArea}>
          <Card.Img
            variant="top"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className={styles.image}
          />

          <Card.Body className={styles.body}>
            <Card.Title className={styles.name}>{pokemon.name}</Card.Title>

            <Badge bg="secondary" className={styles.badge}>
              #{pokemon.id}
            </Badge>
          </Card.Body>
        </Link>

        <Card.Footer className={styles.footer}>
          <Button
            size="sm"
            onClick={handleAction}
            className={styles.button}
            variant={
              alreadyInTeam ? 'danger' : teamIsFull ? 'secondary' : 'primary'
            }
            disabled={!alreadyInTeam && teamIsFull}
          >
            {alreadyInTeam
              ? 'Remover do time'
              : teamIsFull
                ? 'Time cheio'
                : 'Adicionar ao time'}
          </Button>
        </Card.Footer>
      </Card>

      <Toast open={toast.open} message={toast.message} />
    </>
  );
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
