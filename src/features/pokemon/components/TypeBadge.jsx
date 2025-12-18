import styles from './TypeBadge.module.css';

const TYPE_ICONS = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌍',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
  normal: '🔘',
};

export default function TypeBadge({ type }) {
  const label = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div>
      <span className={`${styles.badge} ${styles[type]}`}>
        <span className={styles.icon}>{TYPE_ICONS[type]}</span>
        {label}
      </span>
    </div>
  );
}
