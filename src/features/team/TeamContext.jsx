import { createContext, useContext, useEffect, useState } from 'react';

const TeamContext = createContext(null);
const STORAGE_KEY = 'pokemon-team';

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const addPokemon = pokemon => {
    setTeam(prev => {
      if (prev.find(p => p.name === pokemon.name)) return prev;
      if (prev.length >= 6) return prev;
      return [...prev, pokemon];
    });
  };

  const removePokemon = name => {
    setTeam(prev => prev.filter(p => p.name !== name));
  };

  return (
    <TeamContext.Provider value={{ team, addPokemon, removePokemon }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = () => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error('useTeam must be used within TeamProvider');
  return ctx;
};
