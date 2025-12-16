export function addToTeam(team, pokemon) {
  if (team.find(p => p.name === pokemon.name)) return team;
  return [...team, pokemon];
}

export function removeFromTeam(team, name) {
  return team.filter(p => p.name !== name);
}
// Mapa simplificado de efetividade (base)
const TYPE_CHART = {
  fire: { weakTo: ['water', 'rock', 'ground'] },
  water: { weakTo: ['electric', 'grass'] },
  grass: { weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'] },
  electric: { weakTo: ['ground'] },
  flying: { weakTo: ['electric', 'ice', 'rock'] },
  rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'] },
  ground: { weakTo: ['water', 'grass', 'ice'] },
  psychic: { weakTo: ['bug', 'ghost', 'dark'] },
  dark: { weakTo: ['fighting', 'bug', 'fairy'] },
  fairy: { weakTo: ['poison', 'steel'] },
};

export function calculateTeamWeaknesses(team) {
  const counter = {};

  team.forEach(pokemon => {
    if (!pokemon.types) return;

    pokemon.types.forEach(t => {
      const weaknesses = TYPE_CHART[t] || {};
      weaknesses.weakTo?.forEach(w => {
        counter[w] = (counter[w] || 0) + 1;
      });
    });
  });

  return Object.entries(counter)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}
