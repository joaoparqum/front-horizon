import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import HomeScreen from '../components/HomeScreen.vue';
import TelaDocumentos from '../components/TelaDocumentos.vue';
import TelaCriaUsuario from '../components/TelaCriaUsuario.vue';
import TelaCriarDocumento from '../components/TelaCriarDocumento.vue';
import HomeSght from '../components/HomeSght.vue';
import TelaHorasValidas from '../components/TelaHorasValidas.vue';
import TelaSolicitacoes from '../components/TelaSolicitacoes.vue';
import TelaSolUser from '../components/TelaSolUser.vue';
import TelaCriaHoraValida from '../components/TelaCriaHoraValida.vue';
import TelaCriaSolicitacao from '../components/TelaCriaSolicitacao.vue';
import Intro from '../components/Intro.vue';
import TelaCriaUsusarioVistas from '../components/TelaCriaUsusarioVistas.vue';
import { useStore } from 'vuex';

const routes = [
    { path: '/', component: Home },
    { path: '/Intro', component: Intro},
    { path: '/HomeScreen', component: HomeScreen, meta: { requiresAuth: true } },
    { path: '/TelaDocumentos', component: TelaDocumentos, meta: { requiresAuth: true }},
    { path: '/CriaUsuario', component: TelaCriaUsuario, meta: { requiresAuth: true }}, 
    { path: '/CriaUserVistas', component: TelaCriaUsusarioVistas, meta: { requiresAuth: true }},
    { path: '/AdicionarDocumento', component: TelaCriarDocumento,  meta: { requiresAuth: true }},
    { path: '/TelaSght', component: HomeSght,  meta: { requiresAuth: true }},
    { path: '/TelaHorasValidas', component: TelaHorasValidas,  meta: { requiresAuth: true }},
    { path: '/TelaSolicitacao', component: TelaSolicitacoes,  meta: { requiresAuth: true }},
    { path: '/TelaSolUser', component: TelaSolUser,  meta: { requiresAuth: true }},
    { path: '/CriaHora', component: TelaCriaHoraValida,  meta: { requiresAuth: true }},
    { path: '/CriaSolicitacao', component: TelaCriaSolicitacao,  meta: { requiresAuth: true }}
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

// Adicionando a guarda de navegação para proteger as rotas
router.beforeEach((to, _from, next) => {
    const store = useStore();
  
    // Checa se a rota requer autenticação
    if (to.meta.requiresAuth) {
      if (store.state.token) { // Confia apenas no Vuex
        next(); // Permite o acesso
      } else {
        console.log('Redirecionando para login, token ausente.');
        next('/'); // Redireciona para a tela de login
      }
    } else {
      next(); // Permite o acesso para rotas que não precisam de autenticação
    }
});

export default router;