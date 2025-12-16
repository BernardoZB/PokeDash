import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Badge,
} from 'react-bootstrap';

import { usePokemonList } from '../../features/pokemon/hooks/usePokemonList';
import PokemonCard from '../../features/pokemon/components/PokemonCard';
import Loader from '../../shared/components/Loader';
import styles from './styles.module.css';

export default function Home() {
  const { data, isLoading, error } = usePokemonList();
  const [query, setQuery] = useState('');

  const list = data || [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(p => p.name.toLowerCase().includes(q));
  }, [list, query]);

  if (isLoading) return <Loader />;
  if (error) return <p className={styles.error}>Erro ao carregar Pokémon</p>;

  return (
    <Container fluid className={styles.container}>
      {/* HERO */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <Card className={styles.heroCard}>
            <Card.Body className="d-flex flex-column gap-3">
              <div>
                <h1 id="home-title" className={styles.title}>
                  PokeLab
                </h1>
              </div>

              <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  placeholder="Buscar Pokémon pelo nome..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  aria-label="Buscar Pokémon por nome"
                />
              </InputGroup>

              <div>
                <Badge bg="secondary">
                  Apenas para a 1ª geração ({list.length} Pokémon)
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* LISTA */}
      <Row className="justify-content-center">
        <Col xs={12} md={11}>
          {filtered.length === 0 ? (
            <Card className={styles.emptyState}>
              <Card.Body>
                Nenhum Pokémon encontrado para <strong>{query}</strong>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-4">
              {filtered.map((pokemon, index) => {
                const getIdFromUrl = url => {
                  if (!url) return index + 1;
                  const parts = url.split('/').filter(Boolean);
                  const last = parts[parts.length - 1];
                  const n = Number(last);
                  return Number.isNaN(n) ? index + 1 : n;
                };

                const id = pokemon.id || getIdFromUrl(pokemon.url);

                return (
                  <Col key={pokemon.name} xs={6} sm={4} md={3} lg={2}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.015,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className={styles.cardWrap}
                    >
                      <PokemonCard pokemon={{ ...pokemon, id }} />
                    </motion.div>
                  </Col>
                );
              })}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}
