import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePokemonList } from "../../features/pokemon/hooks/usePokemonList";
import PokemonCard from "../../features/pokemon/components/PokemonCard";
import Loader from "../../shared/components/Loader";
import styles from "./styles.module.css";

export default function Home() {
  const { data, isLoading, error } = usePokemonList();
  const [query, setQuery] = useState("");

  const list = data || [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => p.name.toLowerCase().includes(q));
  }, [list, query]);

  if (isLoading) return <Loader />;
  if (error) return <p className={styles.error}>Erro ao carregar Pokémon</p>;

  return (
    <main className={styles.container}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div>
          <h1 id="home-title">Pokémon Strategy Lab</h1>
          <p className={styles.subtitle}>
            Explore, compare and plan your ideal team. Busque por nome abaixo.
          </p>
        </div>

        <div className={styles.controls}>
          <label htmlFor="search" className={styles.visuallyHidden}>
            Buscar Pokémon
          </label>
          <input
            id="search"
            className={styles.search}
            placeholder="Buscar Pokémon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar Pokémon por nome"
          />
        </div>
      </section>

      <section className={styles.listSection}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            Nenhum Pokémon encontrado para "{query}".
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((pokemon, index) => {
              const getIdFromUrl = (url) => {
                if (!url) return index + 1;
                const parts = url.split("/").filter(Boolean);
                const last = parts[parts.length - 1];
                const n = Number(last);
                return Number.isNaN(n) ? index + 1 : n;
              };

              const id = pokemon.id || getIdFromUrl(pokemon.url);

              return (
                <motion.div
                  key={pokemon.name}
                  className={styles.cardWrap}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <PokemonCard pokemon={{ ...pokemon, id }} />
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
