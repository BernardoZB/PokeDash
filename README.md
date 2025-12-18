
---

# 🧠 PokeDash — Pokémon Team Builder

> **Front-end React application focused on UX, state management and strategic data analysis using public APIs.**

PokeDash is a **modern React application** that allows users to explore Pokémon, build a team of up to 6 members, and analyze **defensive weaknesses, strengths and average stats** — all with a clean UI, smooth animations and no backend.

This project was designed as a **portfolio case**, demonstrating:

* Real-world React architecture
* Advanced state management
* API-driven UI
* Strategic data processing
* Polished UX/UI decisions

---

## 🔥 Why This Project Matters

Unlike a simple Pokédex, **PokeDash simulates a real strategic tool** similar to those used by competitive Pokémon players.

It answers questions like:

* *Is my team weak to Electric or Ice?*
* *Do my Pokémon cover each other defensively?*
* *Is my team too slow or too fragile?*

All analysis is done **client-side**, using data from the PokeAPI.

---

## 🚀 Main Features

### 🧩 Pokémon Exploration

* Pokémon listing with cards
* Clean navigation using React Router
* Reusable UI components

### 📄 Pokémon Details Page

* Official artwork
* Type badges with custom styling
* Base stats with progress bars
* **Defensive strengths & weaknesses**
* Evolution tree with conditions
* Pokémon cry playback 🎵
* Add/remove Pokémon from the team
* Navigation to previous / next Pokémon

### 🧠 Team System (Core Feature)

* Team limited to 6 Pokémon
* Global state with Context API
* Persistent storage using `localStorage`
* Add/remove actions with visual feedback (toast)

### 🧠 Floating Team Widget

* Animated floating action button
* Real-time team counter
* Pokémon list with:

  * Sprite
  * Name
  * **Type icons (fetched dynamically)**
* Click Pokémon → details page
* Displays team-wide weaknesses
* Shortcut to Team Builder

### 📊 Team Builder (Advanced Analysis)

* Fetches **full Pokémon data** for the team
* Displays:

  * Individual Pokémon cards
  * Types and base stats
  * Average team stats
  * Aggregated defensive weaknesses
* Designed for **decision-making**, not just visuals

---

## 🧱 Tech Stack

### Core

* **React 18**
* **React Router DOM**
* **@tanstack/react-query**
* **Context API**

### UI / UX

* **React Bootstrap**
* **CSS Modules**
* **Framer Motion**
* Custom Toast system

### APIs

* **PokeAPI**
* Pokémon official cries repository (`.ogg` audio)

---

## 🗂️ Project Architecture

The project follows a **feature-based architecture**, common in scalable React applications.

```txt
src/
├── app/                # Global providers & React Query
├── features/           # Business logic by domain
│   ├── pokemon/
│   └── team/
├── pages/              # Route-level pages
├── widgets/            # Floating / global UI elements
├── shared/             # Reusable UI components
└── main.jsx
```

### Why this matters:

* Clear separation of concerns
* Easy scalability
* Predictable data flow
* Readable and maintainable codebase

---

## 🧠 State & Data Management

### Team State

* Stored globally via Context API
* Automatically persisted in `localStorage`
* Restored on page reload

### Data Fetching

* Pokémon data fetched on demand
* Cached using React Query
* Avoids unnecessary re-fetching

### Type Analysis Logic

* Defensive multipliers are calculated per Pokémon
* Dual types are combined (e.g. Fire + Flying)
* Team weaknesses are aggregated and counted

---

## 🎨 UX & Visual Design

* Dark theme with radial gradients
* Consistent design language across pages
* Type-specific color system
* Smooth animations (hover, open, feedback)
* Compact, information-dense layouts

The UI prioritizes **readability and decision-making**, not just aesthetics.

---

## 📦 Installation

```bash
npm install
npm install react-router-dom
npm install @tanstack/react-query
npm install react-bootstrap bootstrap
npm install framer-motion
```

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

## 🧪 What This Project Demonstrates

✅ Advanced React patterns
✅ Clean component composition
✅ Custom hooks and reusable logic
✅ UX thinking and polish
✅ Real-world API integration
✅ Strategic data processing

---

## 🔮 Possible Improvements

* Team suggestions based on weaknesses
* Export team (image / JSON)
* Competitive modes (Singles / Doubles)
* Unit tests (React Testing Library)
* Accessibility improvements (ARIA)

---

## 👨‍💻 Author

**Bernardo Brandão**
Front-end Developer — React

> This project was built to demonstrate **real-world front-end skills**, not just UI cloning.
