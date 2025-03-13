import { defineStore } from 'pinia';

interface Pokemon {
    name: string;
    sprite: string;
}

export const useTeamStore = defineStore('team', {
    state: () => ({
        team: [] as Pokemon[],
    }),
    actions: {
        addPokemon(pokemon: Pokemon) {
            if (this.team.length < 6 && !this.team.find(p => p.name === pokemon.name)) {
                this.team.push(pokemon);
            }
        },
        removePokemon(index: number) {
            this.team.splice(index, 1);
        },
    },
    persist: true, // Activer la persistance avec pinia-plugin-persistedstate
});
