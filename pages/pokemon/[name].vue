<script setup>
import { ref, useRoute } from '#imports';
import '../../assets/pokemon/stylePokemon.css';

const pokemonDetail = ref(null);
const cache = new Map();

const route = useRoute();
const pokemonName = route.params.name;

const fetchPokemonDetails = async () => {
  if (cache.has(pokemonName)) {
    pokemonDetail.value = cache.get(pokemonName);
    return;
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();

  const types = data.types.map(type => type.type.name).join(", ");
  const stats = {};
  data.stats.forEach(stat => {
    stats[stat.stat.name] = stat.base_stat;
  });

  const pokemon = {
    name: data.name,
    sprite: data.sprites.front_default,
    types: types,
    height: data.height,
    weight: data.weight,
    stats: stats,
  };

  cache.set(pokemonName, pokemon);
  pokemonDetail.value = pokemon;
};

fetchPokemonDetails();
</script>

<template>
  <div v-if="pokemonDetail" class="pokemon-detail">
    <h1>{{ pokemonDetail.name }}</h1>
    <img :src="pokemonDetail.sprite">
    <div><strong>Types:</strong> {{ pokemonDetail.types }}</div>
    <div><strong>Hauteur:</strong> {{ pokemonDetail.height }}dm</div>
    <div><strong>Poids:</strong> {{ pokemonDetail.weight }}</div>
    <div><strong>Statistiques:</strong></div>
    <ul>
      <li v-for="(stat, key) in pokemonDetail.stats" :key="key">{{ key }}: {{ stat }}</li>
    </ul>
    <NuxtLink to="/">Retour à la liste</NuxtLink>
  </div>
</template>