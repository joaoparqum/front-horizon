<template>
    <a-layout :style="{ minHeight: '100vh', position: 'relative'}">
  
      <a-layout-header 
        :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
      >
        <div style="display: flex; align-items: center;">
          <img src="/casa-logo-Photoroom.png" alt="Logo" style="margin-right: 10px; height: 50px;" /> 
          <h1 class="header-title">| SGHT</h1>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <p class="header-greeting">Olá, {{ username }}!</p>
          <a-button 
            type="primary" 
            @click="fazerLogout()"
            class="logout-button"
          >
            <LogoutOutlined />
            <span class="button-text">Sair</span>
          </a-button>
        </div>
      </a-layout-header>

      <a-layout-content :style="{ padding: '0 20px', marginTop: '64px', background: '#212f3c' }">
        <a-breadcrumb :style="{ margin: '16px 0' }">
        </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '790px', borderRadius: '15px', marginBottom: '35px' }">
          <h1 style="text-align: center;">Tabela de Solicitações</h1>
          <span v-if="isAdmin">
            <TabelaSolicitacoes/>
          </span>
          <span v-if="isUser">
            <TabelaSolicitacoesUsuario/>
          </span>
        </div>
      </a-layout-content>

      <a-layout-footer :style="{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf', padding: '8px 0' }">
        <div style="display: flex; align-items: center; justify-content: center;">
          <img src="/footer-image.png" alt="" style="height: 60px;">
          <h2 style="color: yellow; margin: 0;">| TI - Irecê ©{{ currentYear }}</h2>
        </div>
      </a-layout-footer>

    </a-layout>
  </template>
  
  <script lang="ts" setup>
    import { useStore } from 'vuex';
    import { message } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import { LogoutOutlined } from '@ant-design/icons-vue';
    import { computed, onMounted, ref } from 'vue';
    import TabelaSolicitacoes from './TabelaSolicitacoes.vue';
    import TabelaSolicitacoesUsuario from './TabelaSolicitacoesUsuario.vue';

    const router = useRouter();
    const store = useStore();
    const username = ref<string | null>(null);
    const currentYear = ref(new Date().getFullYear());
    const isAdmin = computed(() => localStorage.getItem('role') === 'admin_sght');
    const isUser = computed(() => localStorage.getItem('role') === 'user');

    onMounted(() => {
        username.value = localStorage.getItem('login');
    });

    const fazerLogout = () => {
      store.dispatch('logout');

      message.success('Saindo...');

      setTimeout(() => {
          router.push('/');
      }, 2000);
    }

    /*const cadastrarUsuario = () => {
      setTimeout(() => {
        router.push('/TelaCriaUsuario')
      }, 2000);
    }

    const isAdmin = computed(() => {
      const role = localStorage.getItem('role');
      console.log('Usuário carregado:', role);
      return role === 'admin';
    });*/
  </script>
  
  <style scoped>

    #components-layout-demo-fixed .logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 24px 16px 0;
      float: left;
    }
    .site-layout .site-layout-background {
      background: #fff;
    }
  
    [data-theme='dark'] .site-layout .site-layout-background {
      background: #141414;
    }

    .header-title {
      color: white;
      margin: 0;
      font-size: 24px;
    }

    .header-greeting {
      color: white;
      font-weight: bold;
      margin: 0;
      font-size: 16px;
    }

    .register-button,
    .logout-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      padding: 5px 15px;
    }

    .button-text {
      margin-left: 5px; /* Espaço entre o ícone e o texto */
    }

    /* Ajustes para dispositivos móveis */
    @media (max-width: 768px) {
      .header-title {
        font-size: 10px;
      }

      .header-greeting {
        font-size: 6px;
      }

      .register-button,
      .logout-button {
        font-size: 12px; /* Reduz o tamanho da fonte */
        padding: 5px 10px; /* Ajusta o espaçamento interno */
      }

    }
</style>