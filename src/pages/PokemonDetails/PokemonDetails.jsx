import { useParams, Link, Navigate } from 'react-router-dom';
import { Card, Badge, ProgressBar } from 'react-bootstrap';
import { usePokemonId } from '../../features/pokemon/hooks/usePokemon';
import TypeBadge from '../../features/pokemon/components/TypeBadge';
import Loader from '../../shared/components/Loader';
import EvolutionTree from '../../features/pokemon/components/EvolutionTree';
import styles from './styles.module.css';
import { usePokemonMatchups } from '../../features/pokemon/hooks/usePokemonMatchups';
import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useTeam } from '../../features/team/TeamContext';

export default function PokemonDetails() {
  const { id } = useParams();
  const pokemonId = Number(id);
  const invalidId = pokemonId > 151 || pokemonId < 1 || Number.isNaN(pokemonId);

  const { data, isLoading, error } = usePokemonId(id);

  const {
    data: dataNext,
    isLoading: isLoadingNext,
    error: errorNext,
  } = usePokemonId(parseInt(id) + 1);
  const {
    data: dataPrev,
    isLoading: isLoadingPrev,
    error: errorPrev,
  } = usePokemonId(parseInt(id) - 1);

  const {
    weaknesses,
    strengths,
    loading: loadingMatchups,
  } = usePokemonMatchups(data?.types || []);

  const { team, addPokemon, removePokemon } = useTeam();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [, setClickCount] = useState(0);
  const [isShiny, setIsShiny] = useState(false);
  const shinyAudioRef = useRef(null);

  const isInTeam = team.some(p => p.id === data?.id);
  const teamFull = team.length >= 6;

  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
  if (invalidId) {
    return <Navigate to="/" replace />;
  }

  if (isLoading || isLoadingNext || isLoadingPrev) return <Loader />;
  if (error) return <p>Erro ao carregar Pokémon</p>;

  const toggleCry = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };
  const handleImageClick = () => {
    if (isShiny) return; // evita repetir

    setClickCount(prev => {
      const next = prev + 1;

      if (next === 3) {
        // toca som de brilho
        shinyAudioRef.current?.play();

        // ativa shiny
        setIsShiny(true);

        return 0; // reseta contador
      }

      return next;
    });
  };

  const handleTeamAction = () => {
    if (isInTeam) {
      removePokemon(data.name);
    } else {
      if (teamFull) return;
      addPokemon({
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        types: data.types,
      });
    }
  };

  if (isLoading || isLoadingNext || isLoadingPrev) return <Loader />;
  if (error || errorNext || errorPrev) return <p>Erro ao carregar Pokémon</p>;
  return (
    <main className={styles.container}>
      {/* NAV TOPO */}
      <Link to="/" className={styles.floatingHome}>
        ⬅ Home
      </Link>
      <nav className={styles.topNav}>
        {id > 1 ? (
          <Link to={`/pokemon/${dataPrev.id}`} className={styles.navItem}>
            <span className={styles.arrow}>⬅</span>
            <div>
              <small>Anterior </small>
              <strong className="pokeName">
                {dataPrev.name.charAt(0).toUpperCase() + dataPrev.name.slice(1)}
              </strong>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Badge bg="secondary" className={styles.idBadge}>
          #{id}
        </Badge>

        {id < 151 && (
          <Link to={`/pokemon/${dataNext.id}`} className={styles.navItem}>
            <div className={styles.alignRight}>
              <small>Próximo </small>
              <strong className="pokeName">
                {dataNext.name.charAt(0).toUpperCase() + dataNext.name.slice(1)}
              </strong>
            </div>
            <span className={styles.arrow}>➡</span>
          </Link>
        )}
      </nav>

      <Card className={styles.headerCard}>
        <Card.Body className={styles.header}>
          <div
            className={`${styles.imageWrapper} ${isShiny ? styles.shinyBurst : ''}`}
            onClick={handleImageClick}
          >
            <img
              src={
                isShiny
                  ? data.sprites.other['official-artwork'].front_shiny
                  : data.sprites.other['official-artwork'].front_default
              }
              alt={data.name}
              className={styles.pokemonImage}
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>{data.name}</h1>

            <div className={styles.types}>
              {data.types.map(t => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>

            {/* AÇÕES */}
            <div className={styles.actions}>
              {/* CRY */}
              <Button variant="primary" size="sm" onClick={toggleCry}>
                {playing ? '🔊 Pausar choro' : '🔈 Ouvir choro'}
              </Button>
              <audio
                ref={shinyAudioRef}
                src="/sounds/shiny.mp3"
                preload="auto"
              />
              <audio
                ref={audioRef}
                src={cryUrl}
                onEnded={() => setPlaying(false)}
              />

              {/* TEAM */}
              <Button
                size="sm"
                variant={isInTeam ? 'danger' : 'primary'}
                disabled={!isInTeam && teamFull}
                onClick={handleTeamAction}
              >
                {isInTeam
                  ? 'Remover do time'
                  : teamFull
                    ? 'Time cheio'
                    : 'Adicionar ao time'}
              </Button>
            </div>

            {/* MATCHUPS */}
            {!loadingMatchups && (
              <div className={styles.matchups}>
                <div>
                  <strong>Fraquezas</strong>
                  <div className={styles.badgeRow}>
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
                </div>

                <div>
                  <strong>Forças</strong>
                  <div className={styles.badgeRow}>
                    {strengths.map(type => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* STATS */}
      <Card className={styles.headerCard}>
        <Card.Body>
          <h3>Status Base</h3>

          <ul className={styles.stats}>
            {data.stats.map(stat => (
              <li key={stat.stat.name}>
                <span>{stat.stat.name}</span>

                <ProgressBar
                  now={stat.base_stat}
                  max={150}
                  label={stat.base_stat}
                />
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      {/* EVOLUTION */}
      <Card className={styles.headerCard}>
        <Card.Body>
          <h3>Árvore de Evolução</h3>
          <EvolutionTree speciesUrl={data.species.url} />
        </Card.Body>
      </Card>
    </main>
  );
}
