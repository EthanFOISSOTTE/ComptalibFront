import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/index.vue';
import PokemonView from './pages/pokemon.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/pokemon/:name', component: PokemonView, props: true },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router