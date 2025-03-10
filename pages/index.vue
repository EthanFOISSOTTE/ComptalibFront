<script setup>
import { ref, onMounted, computed } from 'vue';
import '../assets/styles.css';

const pokemon = ref([]);
const search = ref('');

const Pokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const data = await response.json();

  pokemon.value = data.results.map((pokemon) => {
    const id = pokemon.url.split("/").slice(-2, -1)[0];
    return {
      name: pokemon.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    };
  });
};

onMounted(Pokemon);

const filter = computed(() => {
  return pokemon.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <h1>Pokédex</h1>

    <div class="Search">
      <UInput v-model="search" color="primary" placeholder="Rechercher un Pokémon..." icon="i-heroicons-magnifying-glass-20-solid" autocomplete="off" :ui="{ icon: {trailing: { pointer: ''} } }"/>
    </div>

    <ul>
      <li v-for="pokemon in filter" :key="pokemon.name">
        <img :src="pokemon.sprite"> {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>
