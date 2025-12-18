import { useEffect, useState } from 'react';

const cache = {};

export function usePokemonTypes(id) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (!id) return;

    if (cache[id]) {
      setTypes(cache[id]);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const result = data.types.map(t => t.type.name);

        cache[id] = result;
        setTypes(result);
      } catch {
        setTypes([]);
      }
    }

    load();
  }, [id]);

  return types;
}
