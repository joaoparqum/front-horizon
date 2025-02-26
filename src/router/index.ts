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

const routes = [
    { path: '/', component: Home },
    { path: '/HomeScreen', component: HomeScreen },
    { path: '/TelaDocumentos', component: TelaDocumentos},
    { path: '/CriaUsuario', component: TelaCriaUsuario}, 
    { path: '/AdicionarDocumento', component: TelaCriarDocumento},
    { path: '/TelaSght', component: HomeSght},
    { path: '/TelaHorasValidas', component: TelaHorasValidas},
    { path: '/TelaSolicitacao', component: TelaSolicitacoes},
    { path: '/TelaSolUser', component: TelaSolUser},
    { path: '/CriaHora', component: TelaCriaHoraValida},
    { path: '/CriaSolicitacao', component: TelaCriaSolicitacao}
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;