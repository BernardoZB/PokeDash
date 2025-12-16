// Minimal type effectiveness placeholder
export const typeEffectiveness = {
  normal: { rock: 0.5 },
}

export function effectiveness(attacker, defender) {
  return (typeEffectiveness[attacker]?.[defender]) ?? 1
}
