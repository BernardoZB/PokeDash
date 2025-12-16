import React from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList({ items = [] }) {
  return (
    <div>
      {items.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  )
}
