<script setup>
const { data: pokemons } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=10");
</script>

<template>
  <div>
    <h1>Pokédex</h1>
    <ul>
      <li v-for="pokemon in pokemons?.results" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>
