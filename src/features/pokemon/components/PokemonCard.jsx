import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useTeam } from '../../../features/team/TeamContext';
import Toast from '../../../shared/components/Toast';
import styles from './PokemonCard.module.css';
import PokemonInfoModal from './PokemonInfoModal';

const MAX_TEAM_SIZE = 6;

export default function PokemonCard({ pokemon }) {
  const { addPokemon, removePokemon, team } = useTeam();
  const [toast, setToast] = useState({ open: false, message: '' });
  const [showInfo, setShowInfo] = useState(false);

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
            className={styles.halfButton}
            variant={
              alreadyInTeam ? 'danger' : teamIsFull ? 'secondary' : 'primary'
            }
            disabled={!alreadyInTeam && teamIsFull}
          >
            {alreadyInTeam
              ? 'Remover'
              : teamIsFull
                ? 'Time cheio'
                : 'Adicionar'}
          </Button>

          <Button
            size="sm"
            variant="outline-info"
            className={styles.halfButton}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setShowInfo(true);
            }}
          >
            ℹ️ Info
          </Button>
        </Card.Footer>
      </Card>
      {showInfo && (
        <PokemonInfoModal
          show={showInfo}
          onHide={() => setShowInfo(false)}
          pokemonId={pokemon.id}
        />
      )}

      <Toast open={toast.open} message={toast.message} />
    </>
  );
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
