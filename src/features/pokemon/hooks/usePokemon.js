import { useQuery } from '@tanstack/react-query';
import { getPokemonByName, getPokemonById } from '../services/pokemonService';

export const usePokemonName = name => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
};
export const usePokemonId = id => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id),
    enabled: !!id,
  });
};
