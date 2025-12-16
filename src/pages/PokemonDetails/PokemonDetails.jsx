import { useParams } from 'react-router-dom';
import { usePokemon } from '../../features/pokemon/hooks/usePokemon';
import TypeBadge from '../../features/pokemon/components/TypeBadge';
import Loader from '../../shared/components/Loader';
import styles from './styles.module.css';

export default function PokemonDetails() {
  const { name } = useParams();
  const { data, isLoading, error } = usePokemon(name);

  if (isLoading) return <Loader />;
  if (error) return <p>Erro ao carregar Pokémon</p>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img src={data.sprites.front_default} alt={data.name} />
        <h1 className="pokeName">{data.name}</h1>
      </header>

      <section>
        <h2>Tipos</h2>
        <div className={styles.types}>
          {data.types.map(t => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </section>

      <section>
        <h2>Status Base</h2>
        <ul className={styles.stats}>
          {data.stats.map(stat => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
