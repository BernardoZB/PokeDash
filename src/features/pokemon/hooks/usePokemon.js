import { useQuery } from '@tanstack/react-query';
import { getPokemonByName } from '../services/pokemonService';

export const usePokemon = name => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
};
