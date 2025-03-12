import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeamStore = defineStore('team', () => {
    const team = ref([])

    const addPokemon = (pokemon) => {
        if (team.value.length < 6) {
            team.value.push(pokemon)
        }
    }

    const removePokemon = (index) => {
        team.value.splice(index, 1)
    }

    return { team, addPokemon, removePokemon }
})
