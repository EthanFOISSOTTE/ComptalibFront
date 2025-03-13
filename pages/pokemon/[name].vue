<script setup>
import { ref, useRoute, onMounted } from '#imports';
import { useTeamStore } from '~/stores/team';
import '../../assets/pokemon/stylePokemon.css';

const pokemonDetail = ref(null);
const cache = new Map();

const route = useRoute();
const pokemonName = route.params.name;

const teamStore = useTeamStore();

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
    id: data.id,
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

onMounted(fetchPokemonDetails);
</script>

<template>
  <body>
    <div class="nav-container">
      <div class="nav-title"><h1>Pokédex Comptalib</h1></div>
      <div class="nav-idk">
        <img src="../../assets/images/pokeapi.png">
      </div>
    </div>

    <div v-if="pokemonDetail" class="name-container">
      <h1 class="name">{{ pokemonDetail.name }}</h1>
    </div>

    <div class="main-content">
      <div v-if="pokemonDetail" class="pokemon-detail">
        <div class="pokemon-container-info">
          <img :src="pokemonDetail.sprite">
          <div class="id-type-container">
            <div><strong>Identifiant:</strong> {{ pokemonDetail.id }}</div>
            <div><strong>Types:</strong> {{ pokemonDetail.types }}</div>
          </div>
          <div class="height-weight-container">
            <div><strong>Hauteur:</strong> {{ pokemonDetail.height }} dm</div>
            <div><strong>Poids:</strong> {{ pokemonDetail.weight }}</div>
          </div>

          <div><strong>Statistiques:</strong></div>
          <ul>
            <li v-for="(stat, key) in pokemonDetail.stats" :key="key">{{ key }}: {{ stat }}</li>
          </ul>
          <NuxtLink to="/">Retour à la liste</NuxtLink>
        </div>
      </div>

      <div class="team-container">
        <p style="padding-top: 10px; padding-bottom: 10px">Votre Équipe Pokémon</p>
        <UDivider />
        <div v-if="teamStore.team.length === 0">Aucun Pokémon dans l'équipe</div>
        <ul>
          <li v-for="(pokemon, index) in teamStore.team" :key="index">
            <img :src="pokemon.sprite"> {{ pokemon.name }}
            <UButton @click="teamStore.removePokemon(index)" color="red" label="Retirer" />
          </li>
        </ul>
      </div>
    </div>
  </body>

</template>