import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { useTeam } from '../../features/team/TeamContext';
import styles from './TeamWidget.module.css';
import TypeBadge from '../../features/pokemon/components/TypeBadge';
import { usePokemonTypes } from '../../features/pokemon/hooks/usePokemonTypes';

function TeamItem({ pokemon, onRemove, onNavigate }) {
  const types = usePokemonTypes(pokemon.id);

  return (
    <li className={styles.item} onClick={() => onNavigate(pokemon.id)}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />

      <div className={styles.info}>
        <span className={styles.name}>{pokemon.name}</span>

        <div className={styles.types}>
          {types.map(type => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      <Button
        size="sm"
        variant="outline-danger"
        onClick={e => {
          e.stopPropagation();
          onRemove(pokemon.name);
        }}
      >
        ✕
      </Button>
    </li>
  );
}

export default function TeamWidget() {
  const { team, removePokemon } = useTeam();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.title}>
                  <span>Seu Time</span>

                  <button
                    className={styles.close}
                    onClick={() => setOpen(false)}
                    aria-label="Fechar painel do time"
                  >
                    ✕
                  </button>
                </Card.Title>

                {team.length === 0 ? (
                  <p className={styles.empty}>Nenhum Pokémon no time</p>
                ) : (
                  <>
                    <ul className={styles.list}>
                      <ul className={styles.list}>
                        {team.map(p => (
                          <TeamItem
                            key={p.name}
                            pokemon={p}
                            onRemove={removePokemon}
                            onNavigate={id => navigate(`/pokemon/${id}`)}
                          />
                        ))}
                      </ul>
                    </ul>

                    <Button
                      className={styles.goTeam}
                      onClick={() => {
                        navigate('/team');
                        setOpen(false);
                      }}
                    >
                      Ir para Team Builder
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FAB */}
      <motion.button
        className={styles.fab}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(!open)}
      >
        🧠
        <span className={styles.counter}>{team.length}/6</span>
      </motion.button>
    </div>
  );
}
