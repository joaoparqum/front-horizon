<template>
    <a-layout :style="{ minHeight: '100vh', position: 'relative'}">
  
      <a-layout-header 
        :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
      >
        <div style="display: flex; align-items: center;">
          <img src="/casa-logo-Photoroom.png" alt="Logo" style="margin-right: 10px; height: 50px;" /> 
          <h1 class="header-title">| Horizonte</h1>
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

      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', background: '#212f3c'}">
        <a-breadcrumb :style="{ margin: '16px 0' }">
        </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '790px', borderRadius: '15px', marginBottom: '35px' }">

            <h2 style="text-align: center;">Bem-vindo!</h2>
            <h1 style="text-align: center;">Selecione o sistema deseja acessar:</h1>

            <div class="tables-wrapper">
              <div 
                class="table-container"
                @click="navegarParaTabelaVistas"
              >
                <img src="/worksheet.png" class="work-icon">
                <p style="text-align: center;">Vistas Explodidas</p>
              </div>
              <div 
                class="table-hr-container"
                @click="navegarParaSGHT"
              >
                <img src="/working-time.png" class="time-icon">
                <p style="text-align: center;">SGHT</p>
              </div>
            </div>

            <div class="calendar">
              <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                <a-calendar v-model:value="value" :fullscreen="false" />
              </div>
            </div>

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
    import { onMounted, ref } from 'vue';
    import { Dayjs } from 'dayjs';

    const router = useRouter();
    const username = ref<string | null>(null);
    const currentYear = ref(new Date().getFullYear());
    const value = ref<Dayjs>();
    const store = useStore();

    onMounted(() => {
      username.value = localStorage.getItem('login');
    })

    const navegarParaTabelaVistas = () => {
      router.push('/TelaDocumentos');
    }

    const navegarParaSGHT = () => {
      if (localStorage.getItem('role') === 'admin_sght' || localStorage.getItem('role') === 'admin'){
        router.push('/TelaSght'); 
      } else if ( localStorage.getItem('role') === 'admin_vistas') {
        window.alert("Você é ADM DAS VISTAS - Não tem permissão para acessar o SGHT!!");
      } else if( localStorage.getItem('role') === 'user') {
        router.push('/TelaSolUser');
      }
    }
    
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

      .tables-wrapper {
        display: flex;
        flex-direction: column; /* Centraliza os itens horizontalmente */
        align-items: center; /* Centraliza os itens verticalmente */
        gap: 5px !important; /* Espaço entre os quadrados */
        height: 100%;
      }

      .table-container, .table-hr-container {
        width: 200px !important;
        height: 200px !important;
        padding: 5px !important;
      }

      .work-icon, .time-icon, .register-icon{
        width: 80px !important;
        height: auto; /* Mantém a proporção */
        margin-bottom: 20px;
      }
    }

    .tables-wrapper {
      display: flex;
      justify-content: center; /* Centraliza os itens horizontalmente */
      align-items: center; /* Centraliza os itens verticalmente */
      gap: 50px; /* Espaço entre os quadrados */
      height: 100%; /* Ocupa toda a altura do contêiner */
    }

    .table-container, .table-hr-container, .register-container {
      margin-top: 30px;
      margin-bottom: 30px;
      padding: 15px;
      border-style: solid;
      border-color: rgb(0, 0, 66);
      border-radius: 15px;
      font-size: 18px;
      font-weight: 500;
      width: 300px; /* Largura fixa para os quadrados */
      height: 300px; /* Altura fixa para os quadrados */
      display: flex; /* Para centralizar o texto dentro */
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
      background-color: white; /* Cor inicial */
      transition: background-color 1s ease;
      color: black;
      transition: color 1s ease;
    }

    .table-container:hover, .table-hr-container:hover, .register-container:hover {
      background-color: rgb(0, 0, 71); /* Cor ao passar o mouse */
      color: white;
      cursor: pointer;
    }

    .calendar{
      display: flex;
      justify-content: center; /* Centraliza os itens horizontalmente */
      align-items: center;
    }

    .work-icon, .time-icon, .register-icon{
      width: 120px;
      height: auto; /* Mantém a proporção */
      margin-bottom: 20px;
    }

    .bell{
      width: 32px;
    }

    .bell-container{
      margin-right: 5px;
      cursor: pointer;
    }
</style>