
# 🧠 Pokémon Strategy Lab

Aplicação front-end desenvolvida em **ReactJS** utilizando a **PokeAPI**, com foco em **análise estratégica de Pokémon**, indo além de uma Pokédex tradicional.

O projeto foi pensado para demonstrar **arquitetura escalável**, **boas práticas de React**, **organização por domínio** e **processamento de dados da API**.

<!-- ---

## 🚀 Demo

🔗 *(adicione aqui o link do deploy quando estiver pronto)*

--- -->

## 🎯 Objetivo do Projeto

Criar uma aplicação front-end completa para portfólio que:

* Consuma APIs externas
* Possua arquitetura organizada e escalável
* Demonstre domínio de React moderno
* Traga funcionalidades fora do padrão básico
* Seja fácil de evoluir com testes e documentação

---

## 🧩 Funcionalidades

### 🔍 Explorer de Pokémon

* Listagem de Pokémon
* Busca por nome
* Navegação para página de detalhes

### 📊 Página de Detalhes

* Informações completas do Pokémon
* Visualização de stats
* Tipos e combinações
* Estrutura pronta para cálculo de fraquezas e resistências

### ⚔️ Comparador

* Comparação de Pokémon lado a lado
* Destaque de diferenças de stats e tipos

### 🧠 Team Builder

* Montagem de time com até 6 Pokémon
* Persistência no `localStorage`
* Estrutura pronta para análise de cobertura de tipos

### ⭐ Favoritos

* Salvar Pokémon favoritos localmente

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma **arquitetura baseada em domínio (feature-based)**:

```txt
src/
├── app/        # Configurações globais
├── pages/      # Páginas (rotas)
├── features/   # Domínios da aplicação
├── shared/     # Código reutilizável
├── services/   # Serviços externos (API)
├── utils/      # Funções utilitárias
```

### Por quê essa arquitetura?

* Facilita manutenção
* Escala bem com o crescimento do projeto
* Reflete padrões usados em projetos reais
* Evita componentes e lógica acoplados

---

## 🛠️ Tecnologias e Bibliotecas

### Core

* **ReactJS**
* **Vite**
* **React Router DOM**

### Dados e API

* **Axios**
* **@tanstack/react-query**

### UI / UX

* **CSS Modules**
* **Framer Motion**
* **Chart.js**
* **react-chartjs-2**
* **clsx**

### Testes (planejado)

* **Vitest**
* **Testing Library**
* **jsdom**

---

## 📦 Instalação

```bash
# clone o repositório
git clone https://github.com/BernardoZB/PokeDash

# acesse a pasta
cd pokemon-strategy-lab

# instale as dependências
npm install

# rode o projeto
npm run dev
```

---

## 🌐 API Utilizada

* [PokeAPI](https://pokeapi.co/)
* API pública e gratuita
* Nenhuma autenticação necessária

---

## 🧠 Decisões Técnicas

* **React Query** para cache e gerenciamento de estados assíncronos
* **Separação de responsabilidades** entre UI, lógica e serviços
* **Hooks customizados** para encapsular regras de negócio
* **Context API** para estado global (Team Builder)
* **Persistência local** via `localStorage`

---

## 🧪 Testes (Roadmap)

Os testes serão implementados futuramente com foco em:

* Hooks customizados
* Componentes reutilizáveis
* Estados de loading e erro

Bibliotecas:

* Vitest
* Testing Library

---

## 📚 Documentação de Componentes (Roadmap)

Planejado:

* Documentação de componentes reutilizáveis
* Padrões de uso
* Props e exemplos
* Possível integração com Storybook

---

## 🚧 Melhorias Futuras

* Cálculo completo de fraquezas e resistências
* Análise automática de cobertura de tipos do time
* Dark / Light mode
* Acessibilidade (ARIA)
* Lazy loading de rotas
* Testes automatizados
* Documentação visual de componentes

---

## 👨‍💻 Autor

**Bernardo Brandão**
Front-end Developer | React

<!-- 🔗 LinkedIn: *(adicione aqui)*
🔗 Portfólio: *(adicione aqui)* -->

---

## 📄 Licença

Este projeto é apenas para fins educacionais e de portfólio.

---
