<script setup>
import { ref, useRoute, onMounted } from '#imports';
import { useTeamStore } from '~/stores/team';
import '../../assets/pokemon/stylePokemon.css';

const pokemonDetail = ref(null);
const pokemonDescription = ref(null);
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

  const types = data.types.map(type => type.type.name);
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

  const descriptionResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
  const descriptionData = await descriptionResponse.json();
  const descriptionEntry = descriptionData.flavor_text_entries.find(entry => entry.language.name === 'fr');
  pokemonDescription.value = descriptionEntry ? descriptionEntry.flavor_text : 'Description non disponible';
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
      <h2 class="name">{{ pokemonDetail.name }}</h2>
    </div>

    <div class="main-content">
      <div v-if="pokemonDetail" class="pokemon-container-info">
        <div>
          <div class="sprite-container">
            <img :src="pokemonDetail.sprite">
          </div>
          <div class="id-type-container">
            <div class="types-container">
              <div class="types-title"><strong>Types:</strong></div>
              <div v-for="type in pokemonDetail.types" :key="type" :class="['type-badge', type]">
                {{ type }}
              </div>
            </div>
          </div>
          <div class="height-weight-container">
            <div class="height-container">
              <div class="height-title">
                <strong>Hauteur:</strong>
              </div>
              <div class="height-value">
                {{ pokemonDetail.height }} dm
              </div>
            </div>
            <div class="weight-container">
              <div class="weight-title">
                <strong>Poids:</strong>
              </div>
              <div class="weight-value">
                {{ pokemonDetail.weight }}
              </div>
            </div>
          </div>
          <div class="stats-container">
            <div class="stats-title"><strong>Statistiques:</strong></div>
            <ul>
              <li v-for="(stat, key) in pokemonDetail.stats" :key="key">{{ key }}: {{ stat }}</li>
            </ul>
          </div>
          <div v-if="pokemonDescription" class="description-container">
            <h3>Description :</h3>
            <p>{{ pokemonDescription }}</p>
          </div>
          <NuxtLink class="Button-return" to="/">Retour à la liste</NuxtLink>
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