<template>
    <a-layout :style="{ minHeight: '100vh', position: 'relative'}">
  
      <a-layout-header 
        :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
      >
          <div style="display: flex; align-items: center;">
            <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;"/> 
            <h1 class="header-title">Vistas Explodidas</h1>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <p class="header-greeting">Olá, {{ username }}!</p>
            <a-button type="primary" @click="fazerLogout()">
              <LogoutOutlined />
              Sair
            </a-button>
          </div>
      </a-layout-header>
  
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', paddingBottom: '70px' }">
        <a-breadcrumb :style="{ margin: '16px 0' }"></a-breadcrumb>
        <div :style="{ background: '#fff', padding: '60px', minHeight: '790px' }">
          <h1 style="text-align: center;">Cadastro de documento</h1>
          <FormCriaDocumento/>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf' }">
        <h2 style="color: yellow;">Casa do Construtor | Setor de TI - Irecê ©{{ currentYear }}</h2>
      </a-layout-footer>
    </a-layout>
  </template>
  
  <script lang="ts" setup>
    import FormCriaDocumento from './FormCriaDocumento.vue';
    import { useStore } from 'vuex';
    import { message } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import { LogoutOutlined } from '@ant-design/icons-vue';
    import { onMounted, ref } from 'vue';
  
    const router = useRouter();
    const store = useStore();
    const username = ref<string | null>(null);
    const currentYear = ref(new Date().getFullYear());
  
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
  
    /* Ajustes para dispositivos móveis */
    @media (max-width: 768px) {
      .header-title {
        font-size: 10px;
      }
  
      .header-greeting {
        font-size: 6px;
      }
    }
  </style>