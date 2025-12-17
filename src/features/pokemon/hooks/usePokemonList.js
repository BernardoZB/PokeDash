import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '../services/pokemonService';

export const usePokemonNameList = (limit = 151) => {
  return useQuery({
    queryKey: ['pokemon-list', limit],
    queryFn: async () => {
      const data = await getPokemonList(limit);
      return data.results;
    },
  });
};
