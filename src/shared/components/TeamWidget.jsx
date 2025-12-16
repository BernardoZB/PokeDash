import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../../features/team/TeamContext";
import { calculateTeamWeaknesses } from "../../features/team/teamUtils";
import styles from "./TeamWidget.module.css";

export default function TeamWidget() {
  const { team, removePokemon } = useTeam();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const weaknesses = useMemo(
    () => calculateTeamWeaknesses(team),
    [team]
  );

  return (
    <div className={styles.wrapper}>
      <button className={styles.fab} onClick={() => setOpen(!open)}>
        🧠 {team.length}/6
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <h4>Seu Time</h4>

            {team.length === 0 ? (
              <p className={styles.empty}>Nenhum Pokémon no time</p>
            ) : (
              <>
                <ul className={styles.list}>
                  {team.map((p) => (
                    <li key={p.name}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                        alt={p.name}
                      />
                      <span>{p.name}</span>
                      <button onClick={() => removePokemon(p.name)}>✕</button>
                    </li>
                  ))}
                </ul>

                {weaknesses.length > 0 && (
                  <div className={styles.weaknesses}>
                    <strong>Fraquezas do time</strong>
                    <ul>
                      {weaknesses.map(([type, count]) => (
                        <li key={type}>
                          {type} ({count})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className={styles.goTeam}
                  onClick={() => navigate("/team")}
                >
                  Ir para Team Builder
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
