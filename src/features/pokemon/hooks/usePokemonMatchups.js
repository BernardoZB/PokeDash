import { useEffect, useState } from 'react';

export function usePokemonMatchups(types) {
  const [weaknesses, setWeaknesses] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!types || types.length === 0) return;

    async function loadMatchups() {
      setLoading(true);

      const responses = await Promise.all(
        types.map(t => fetch(t.type.url).then(res => res.json()))
      );

      const weakMap = {};
      const strongMap = {};

      responses.forEach(typeData => {
        typeData.damage_relations.double_damage_from.forEach(t => {
          weakMap[t.name] = (weakMap[t.name] || 1) * 2;
        });

        typeData.damage_relations.double_damage_to.forEach(t => {
          strongMap[t.name] = (strongMap[t.name] || 1) * 2;
        });

        typeData.damage_relations.half_damage_from.forEach(t => {
          weakMap[t.name] = (weakMap[t.name] || 1) * 0.5;
        });

        typeData.damage_relations.no_damage_from.forEach(t => {
          weakMap[t.name] = 0;
        });
      });

      setWeaknesses(
        Object.entries(weakMap)
          .filter(([_, mult]) => mult > 1)
          .map(([type, mult]) => ({ type, mult }))
      );

      setStrengths(Object.entries(strongMap).map(([type]) => type));

      setLoading(false);
    }

    loadMatchups();
  }, [types]);

  return { weaknesses, strengths, loading };
}
