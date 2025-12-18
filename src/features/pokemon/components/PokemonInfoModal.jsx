import { Modal, Badge, ProgressBar } from 'react-bootstrap';
import { usePokemonId } from '../hooks/usePokemon';
import { usePokemonMatchups } from '../hooks/usePokemonMatchups';
import TypeBadge from './TypeBadge';
import Loader from '../../../shared/components/Loader';
import styles from './PokemonInfoModal.module.css';

export default function PokemonInfoModal({ show, onHide, pokemonId }) {
  const { data, isLoading } = usePokemonId(pokemonId);
  const { weaknesses, strengths, loading } = usePokemonMatchups(
    data?.types || []
  );

  if (!show) return null;

  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
      centered
      size="md"
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title className={styles.title}>
          {data?.name}
          <Badge bg="secondary" className="ms-2">
            #{pokemonId}
          </Badge>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* TYPES */}
            <section className={styles.section}>
              <strong>Tipos</strong>
              <div className={styles.row}>
                {data.types.map(t => (
                  <TypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>
            </section>

            {/* MATCHUPS */}
            {!loading && (
              <section className={styles.section}>
                <strong>Fraquezas</strong>
                <div className={styles.row}>
                  {weaknesses.length === 0 ? (
                    <span className={styles.neutral}>Nenhuma</span>
                  ) : (
                    weaknesses.map(w => (
                      <TypeBadge
                        key={w.type}
                        type={w.type}
                        multiplier={w.mult}
                      />
                    ))
                  )}
                </div>

                <strong className="mt-2 d-block">Forças</strong>
                <div className={styles.row}>
                  {strengths.map(type => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </section>
            )}

            {/* STATS */}
            <section className={styles.section}>
              <strong>Status Base</strong>
              <ul className={styles.stats}>
                {data.stats.map(stat => (
                  <li key={stat.stat.name}>
                    <span className={styles.stats}>{stat.stat.name}</span>
                    <ProgressBar
                      now={stat.base_stat}
                      max={150}
                      variant="info"
                    />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
