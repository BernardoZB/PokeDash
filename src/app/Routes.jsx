import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import PokemonDetails from '../pages/PokemonDetails/PokemonDetails';
import TeamBuilder from '../pages/TeamBuilder/TeamBuilder';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/team" element={<TeamBuilder />} />
    </Routes>
  );
}
