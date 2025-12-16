import { api } from "../../../services/api";

export const getPokemonList = async (limit = 50, offset = 0) => {
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data; // { count, next, previous, results }
};

export const getPokemonByName = async (name) => {
  const { data } = await api.get(`/pokemon/${name}`);
  return data;
};
