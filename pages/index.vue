<script setup>
import { ref, onMounted, computed } from 'vue';
import '../assets/styles.css';
import { useTeamStore } from '../stores/team';

const pokemon = ref([]);
const search = ref('');
const Nbr = 100;
const teamStore = useTeamStore();

const Pokemon = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${Nbr}`);
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
    <div class="nav-container">
      <div class="nav-title"><h1>Pokédex Comptalib</h1></div>
      <div class="nav-idk">
        <div class="Team-title">
          <UButton
              icon="heroicons:cog-8-tooth"
              color="purple"
              variant="solid"
              label="Gestion de votre équipe"
          />
        </div>
        <img src="../assets/images/pokeapi.png">
      </div>
    </div>

    <div class="search-container">
      <div class="Search">
        <UInput v-model="search" color="primary" icon="heroicons:magnifying-glass-20-solid" placeholder="Rechercher un Pokémon..." autocomplete="off" :trailing="false"/>
      </div>
    </div>

    <div class="main-content">
      <div class="pokemon-container">
        <ul>
          <li v-for="pokemon in filter" :key="pokemon.name">
            <NuxtLink :to="`/pokemon/${pokemon.name}`">
              <img :src="pokemon.sprite"> {{ pokemon.name }}
            </NuxtLink>
            <UButton @click="teamStore.addPokemon(pokemon)" color="green" label="Ajouter à l'équipe" />
          </li>
        </ul>
      </div>
      <div class="team-container">
        <p style="padding-top: 10px; padding-bottom: 10px">"Ici un aperçu de l'équipe"</p>
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
  </div>
</template>