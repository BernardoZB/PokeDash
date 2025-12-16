import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';

import { useTeam } from '../../features/team/TeamContext';
import { calculateTeamWeaknesses } from '../../features/team/teamUtils';
import styles from './TeamWidget.module.css';

export default function TeamWidget() {
  const { team, removePokemon } = useTeam();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const weaknesses = useMemo(() => calculateTeamWeaknesses(team), [team]);

  return (
    <div className={styles.wrapper}>
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
                <Card.Title className={styles.title}>Seu Time</Card.Title>

                {team.length === 0 ? (
                  <p className={styles.empty}>Nenhum Pokémon no time</p>
                ) : (
                  <>
                    <ul className={styles.list}>
                      {team.map(p => (
                        <li key={p.name} className={styles.item}>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                            alt={p.name}
                          />

                          <span className={styles.name}>{p.name}</span>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => removePokemon(p.name)}
                          >
                            ✕
                          </Button>
                        </li>
                      ))}
                    </ul>

                    {weaknesses.length > 0 && (
                      <div className={styles.weaknesses}>
                        <strong>Fraquezas do time</strong>

                        <div className={styles.weaknessList}>
                          {weaknesses.map(([type, count]) => (
                            <Badge
                              key={type}
                              bg="danger"
                              className={styles.weakness}
                            >
                              {type} ×{count}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className={styles.goTeam}
                      onClick={() => navigate('/team')}
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
    </div>
  );
}
