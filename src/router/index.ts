import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import HomeScreen from '../components/HomeScreen.vue';
import TelaDocumentos from '../components/TelaDocumentos.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import TelaCriarDocumento from '../components/TelaCriarDocumento.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/HomeScreen', component: HomeScreen },
    { path: '/TelaDocumentos', component: TelaDocumentos},
    { path: '/CriaUsuario', component: TelaCriaUsuario}, 
    { path: '/AdicionarDocumento', component: TelaCriarDocumento}
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;