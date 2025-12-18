import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EvolutionTree.module.css';

export default function EvolutionTree({ speciesUrl }) {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadEvolution() {
      const speciesRes = await fetch(speciesUrl);
      const speciesData = await speciesRes.json();

      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      async function buildNode(node, condition = null) {
        const pokeRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${node.species.name}`
        );
        const pokeData = await pokeRes.json();

        // 🔢 Limita até a Gen 1
        if (pokeData.id > 151) return null;

        const children = await Promise.all(
          node.evolves_to.map(evo =>
            buildNode(evo, formatCondition(evo.evolution_details?.[0]))
          )
        );

        return {
          id: pokeData.id,
          name: node.species.name,
          sprite: pokeData.sprites.other['official-artwork'].front_default,
          condition,
          evolvesTo: children.filter(Boolean),
        };
      }

      const tree = await buildNode(evoData.chain);
      if (mounted) setRoot(tree);
    }

    loadEvolution();
    return () => (mounted = false);
  }, [speciesUrl]);

  if (!root) return <p>Sem evoluções</p>;

  return (
    <div className={styles.tree}>
      <EvolutionNode node={root} />
    </div>
  );
}

/* ---------------- NODE ---------------- */

function EvolutionNode({ node }) {
  return (
    <div className={styles.nodeWrapper}>
      <div className={styles.node}>
        <Link to={`/pokemon/${node.id}`}>
          <img src={node.sprite} alt={node.name} />
          <span className={styles.name}>{node.name}</span>
        </Link>
      </div>

      {node.evolvesTo.length > 0 && (
        <div className={styles.children}>
          {node.evolvesTo.map(child => (
            <div key={child.id} className={styles.branch}>
              {child.condition && (
                <span className={styles.condition}>{child.condition}</span>
              )}
              <EvolutionNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- UTIL ---------------- */

function formatCondition(details) {
  if (!details) return null;

  if (details.min_level) return `Nível ${details.min_level}`;

  if (details.item) return `Usando ${details.item.name.replace('-', ' ')}`;

  if (details.trigger?.name === 'trade') return 'Troca';

  if (details.min_happiness) return 'Alta amizade';

  if (details.time_of_day)
    return details.time_of_day === 'day' ? 'Durante o dia' : 'À noite';

  return 'Condição especial';
}
