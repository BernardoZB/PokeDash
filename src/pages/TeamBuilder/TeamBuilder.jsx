import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useTeam } from '../../features/team/TeamContext';
import { calculateTeamWeaknesses } from '../../features/team/teamUtils';
import TypeBadge from '../../features/pokemon/components/TypeBadge';
import Loader from '../../shared/components/Loader';

import styles from './styles.module.css';

/**
 * TeamBuilder melhorado:
 * - Busca dados completos (/pokemon/:id) para cada membro do time, se necessário
 * - Cache em memória para evitar requisições repetidas
 * - Usa os dados enriquecidos (types, stats, sprites) para a UI e análise
 */

export default function TeamBuilder() {
  const { team, removePokemon } = useTeam();
  const navigate = useNavigate();

  const cacheRef = useRef({}); // cache simples em memória: { id: enrichedPokemon }
  const [enrichedTeam, setEnrichedTeam] = useState([]); // team com dados completos
  const [loading, setLoading] = useState(false);

  // extraí id a partir de url se existir
  const extractIdFromUrl = url => {
    if (!url) return null;
    const parts = url.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    const n = Number(last);
    return Number.isNaN(n) ? null : n;
  };

  // Enriquecer o time: para cada item, se já tem types/stats, usa; senão busca /pokemon/:idOrName
  useEffect(() => {
    let mounted = true;
    async function enrichTeam() {
      if (!team || team.length === 0) {
        if (mounted) setEnrichedTeam([]);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          team.map(async member => {
            // Id preferencial: member.id, senão extrai de url, senão usa name
            const idOrName =
              member.id || extractIdFromUrl(member.url) || member.name;

            // check cache by idOrName (try id if number)
            const cacheKey = idOrName;
            if (cacheRef.current[cacheKey]) {
              return cacheRef.current[cacheKey];
            }

            // If member already has types & stats, keep but normalize id & sprites
            if (member.types && member.stats) {
              const normalized = {
                ...member,
                id: member.id || (member.name ? member.name : cacheKey),
                sprites: member.sprites || member.sprites,
              };
              cacheRef.current[cacheKey] = normalized;
              return normalized;
            }

            // fetch full pokemon data
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${idOrName}`
            );
            if (!res.ok) {
              // fallback: return minimal member
              const fallback = { ...member, id: member.id || idOrName };
              cacheRef.current[cacheKey] = fallback;
              return fallback;
            }
            const data = await res.json();
            const enriched = {
              id: data.id,
              name: data.name,
              sprites: data.sprites,
              types: data.types,
              stats: data.stats,
            };
            cacheRef.current[cacheKey] = enriched;
            return enriched;
          })
        );

        if (mounted) {
          setEnrichedTeam(results);
        }
      } catch (err) {
        // em erro, mantenha como está (não quebre a UI)
        if (mounted) {
          // best effort: try to map team to at least have id/name
          setEnrichedTeam(
            team.map(m => ({
              id: m.id || extractIdFromUrl(m.url) || m.name,
              name: m.name,
              sprites: m.sprites || null,
              types: m.types || [],
              stats: m.stats || [],
            }))
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    enrichTeam();

    return () => {
      mounted = false;
    };
  }, [team]);

  // Fraquezas baseadas no enrichedTeam
  const weaknesses = useMemo(
    () => calculateTeamWeaknesses(enrichedTeam || []),
    [enrichedTeam]
  );

  // Estatísticas médias baseadas no enrichedTeam
  const avgStats = useMemo(() => {
    if (!enrichedTeam || enrichedTeam.length === 0) return null;

    const totals = {};
    enrichedTeam.forEach(p => {
      p.stats?.forEach(stat => {
        totals[stat.stat.name] = (totals[stat.stat.name] || 0) + stat.base_stat;
      });
    });

    return Object.entries(totals).map(([name, value]) => ({
      name,
      value: Math.round(value / enrichedTeam.length),
    }));
  }, [enrichedTeam]);

  return (
    <main className={styles.container}>
      <Link to="/" className={styles.floatingHome}>
        ⬅ Home
      </Link>

      <header className={styles.header}>
        <h1>Team Builder</h1>
        <p>
          Analise a composição do seu time e identifique forças e fraquezas
          estratégicas.
        </p>
      </header>

      {/* TIME */}
      <section className={styles.section}>
        <h2>Seu Time ({team.length}/6)</h2>

        {team.length === 0 ? (
          <div className={styles.empty}>Nenhum Pokémon no time.</div>
        ) : (
          <>
            {/* loader leve enquanto enriquece */}
            {loading && (
              <div style={{ marginBottom: 12 }}>
                <Loader />
              </div>
            )}

            <div className={styles.teamGrid}>
              {enrichedTeam.map(pokemon => (
                <Card key={pokemon.id} className={styles.pokemonCard}>
                  <Card.Body>
                    <div
                      className={styles.cardHeader}
                      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ')
                          navigate(`/pokemon/${pokemon.id}`);
                      }}
                    >
                      <img
                        src={
                          pokemon.sprites?.front_default ||
                          pokemon.sprites?.other?.['official-artwork']
                            ?.front_default ||
                          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
                        }
                        alt={pokemon.name}
                      />

                      <div>
                        <h5
                          className="pokeName"
                          style={{ textTransform: 'capitalize' }}
                        >
                          {pokemon.name}
                        </h5>

                        <div className={styles.types}>
                          {pokemon.types?.map(t => (
                            <TypeBadge key={t.type.name} type={t.type.name} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* STATS */}
                    {pokemon.stats && pokemon.stats.length > 0 && (
                      <ul className={styles.stats}>
                        {pokemon.stats.map(stat => (
                          <li key={stat.stat.name}>
                            <span>{stat.stat.name}</span>
                            <ProgressBar
                              now={stat.base_stat}
                              max={150}
                              variant="info"
                            />
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removePokemon(pokemon.name)}
                      className={styles.remove}
                    >
                      Remover
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ANÁLISE */}
      {enrichedTeam && enrichedTeam.length > 0 && (
        <section className={styles.section}>
          <h2>Análise do Time</h2>

          <div className={styles.analysisGrid}>
            {/* FRAQUEZAS */}
            <Card>
              <Card.Body className={styles.cardBody}>
                <h5>Fraquezas Defensivas</h5>

                {weaknesses.length === 0 ? (
                  <p className={styles.good}>Boa cobertura defensiva</p>
                ) : (
                  <div className={styles.badgeWrap}>
                    {weaknesses.map(([type, count]) => (
                      <Badge key={type} bg="danger" className={styles.badge}>
                        {type} ×{count}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* STATS MÉDIOS */}
            {avgStats && (
              <Card>
                <Card.Body className={styles.cardBody}>
                  <h5>Status Médios</h5>

                  <ul className={styles.stats}>
                    {avgStats.map(stat => (
                      <li key={stat.name}>
                        <span>{stat.name}</span>
                        <ProgressBar
                          now={stat.value}
                          max={150}
                          variant="success"
                          label={stat.value}
                        />
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
