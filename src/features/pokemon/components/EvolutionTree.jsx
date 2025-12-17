import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EvolutionTree.module.css';

export default function EvolutionTree({ speciesUrl }) {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    async function loadEvolution() {
      // 1️⃣ Busca species
      const speciesRes = await fetch(speciesUrl);
      const speciesData = await speciesRes.json();

      // 2️⃣ Busca evolution chain
      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      // 3️⃣ Extrai cadeia com condições
      const extractChain = async node => {
        const pokemonRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${node.species.name}`
        );
        const pokemonData = await pokemonRes.json();

        const details = node.evolution_details?.[0];

        const current = {
          name: node.species.name,
          id: pokemonData.id,
          sprite: pokemonData.sprites.other['official-artwork'].front_default,
          condition: formatCondition(details),
        };

        if (node.evolves_to.length > 0) {
          return [current, ...(await extractChain(node.evolves_to[0]))];
        }

        return [current];
      };

      const fullChain = await extractChain(evoData.chain);
      setChain(fullChain);
    }

    loadEvolution();
  }, [speciesUrl]);

  if (chain.length === 0) return <p>Sem evoluções</p>;

  return (
    <div className={styles.chain}>
      {chain.map((pokemon, index) => (
        <div key={pokemon.name} className={styles.node}>
          <Link to={`/pokemon/${pokemon.id}`}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <span className={styles.name}>{pokemon.name}</span>
          </Link>

          {index < chain.length - 1 && (
            <div className={styles.evolutionInfo}>
              <span className={styles.arrow}>➡</span>
              {chain[index + 1].condition && (
                <span className={styles.condition}>
                  {chain[index + 1].condition}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- UTIL ---------------- */

function formatCondition(details) {
  if (!details) return null;

  if (details.min_level) {
    return `Nível ${details.min_level}`;
  }

  if (details.item) {
    return `Usando ${details.item.name.replace('-', ' ')}`;
  }

  if (details.trigger?.name === 'trade') {
    return 'Troca';
  }

  if (details.min_happiness) {
    return 'Alta amizade';
  }

  return 'Condição especial';
}
