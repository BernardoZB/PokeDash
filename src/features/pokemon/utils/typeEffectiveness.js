const TYPE_CHART = {
  fire: {
    strongAgainst: ['grass', 'ice', 'bug', 'steel'],
    weakTo: ['water', 'rock', 'ground'],
  },
  water: {
    strongAgainst: ['fire', 'rock', 'ground'],
    weakTo: ['electric', 'grass'],
  },
  grass: {
    strongAgainst: ['water', 'rock', 'ground'],
    weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'],
  },
  electric: {
    strongAgainst: ['water', 'flying'],
    weakTo: ['ground'],
  },
  ice: {
    strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
    weakTo: ['fire', 'fighting', 'rock', 'steel'],
  },
  fighting: {
    strongAgainst: ['normal', 'rock', 'steel', 'ice', 'dark'],
    weakTo: ['flying', 'psychic', 'fairy'],
  },
  poison: {
    strongAgainst: ['grass', 'fairy'],
    weakTo: ['ground', 'psychic'],
  },
  ground: {
    strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
    weakTo: ['water', 'grass', 'ice'],
  },
  flying: {
    strongAgainst: ['grass', 'fighting', 'bug'],
    weakTo: ['electric', 'ice', 'rock'],
  },
  psychic: {
    strongAgainst: ['fighting', 'poison'],
    weakTo: ['bug', 'ghost', 'dark'],
  },
  bug: {
    strongAgainst: ['grass', 'psychic', 'dark'],
    weakTo: ['fire', 'flying', 'rock'],
  },
  rock: {
    strongAgainst: ['fire', 'ice', 'flying', 'bug'],
    weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
  },
  ghost: {
    strongAgainst: ['psychic', 'ghost'],
    weakTo: ['ghost', 'dark'],
  },
  dragon: {
    strongAgainst: ['dragon'],
    weakTo: ['ice', 'dragon', 'fairy'],
  },
  dark: {
    strongAgainst: ['psychic', 'ghost'],
    weakTo: ['fighting', 'bug', 'fairy'],
  },
  steel: {
    strongAgainst: ['ice', 'rock', 'fairy'],
    weakTo: ['fire', 'fighting', 'ground'],
  },
  fairy: {
    strongAgainst: ['fighting', 'dragon', 'dark'],
    weakTo: ['poison', 'steel'],
  },
};

export function getTypeMatchups(types = []) {
  const strong = new Set();
  const weak = new Set();

  types.forEach(type => {
    const data = TYPE_CHART[type];
    if (!data) return;

    data.strongAgainst.forEach(t => strong.add(t));
    data.weakTo.forEach(t => weak.add(t));
  });

  return {
    strongAgainst: Array.from(strong),
    weakTo: Array.from(weak),
  };
}
