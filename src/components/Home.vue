<script setup lang="ts">
    import { ref } from 'vue';
    import Login from './Login.vue';
    const currentYear = ref(new Date().getFullYear());
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const navegarParaIntro = () =>{
      router.push('/Intro');
    }

    const navegarSght = () => {
       router.push('/CriaSolicitacao');
     }
</script>

<template>
  <a-layout :style="{ minHeight: '100vh', position: 'relative'}">

    <a-layout-header 
      :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
    >
      <img src="/casa-logo-Photoroom.png" alt="Logo" style="margin-right: 10px; height: 50px;" />
      <h1 style="color: white; margin: 0;">Horizonte</h1>
    </a-layout-header>

    <a-layout-content :style="{ display:'flex', justifyContent:'center', alignItems: 'center', marginTop: '60px', background: 'linear-gradient(180deg, #873600, #f4d03f)'}">
      <a-breadcrumb :style="{ margin: '16px 0' }"></a-breadcrumb>
        <div class="content-wrapper">
          <div class="horizon-container">
              <a-popover placement="right">
                <template #content>
                  <p>Clique para saber mais sobre o Horizonte!</p>
                </template>
                <img src="/logo-2.png" alt="Logo" style="height: 100px;" @click="navegarParaIntro"/>
              </a-popover>    
          </div>
          <h1 class="welcome-title" style="margin-top: 10px;">Seja bem-vindo ao HORIZONTE!</h1>
          <div class="login-container">
            <Login/>

            <a-button type="primary" @click="navegarSght">tela shgt</a-button>
          </div>
        </div>
    </a-layout-content>

    <a-layout-footer :style="{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf', padding: '8px 0', boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.3)'  }">
      <div style="display: flex; align-items: center; justify-content: center;">
        <img src="/footer-image.png" alt="" style="height: 60px;">
        <h2 style="color: yellow; margin: 0;">| Irecê ©{{ currentYear }}</h2>
      </div>
    </a-layout-footer>

  </a-layout>
  
</template>


<style scoped>
  /* Estilo padrão */
  .content-wrapper {
    background: #fff;
    padding: 40px;
    margin: 0 auto;
    max-width: 800px;
    min-height: 460px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .welcome-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 1.5rem;
  }

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .horizon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  /* Responsividade */
  @media (max-width: 1024px) {
    .content-wrapper {
      padding: 40px;
      margin: 0 20px;
    }
    .welcome-title {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      padding: 20px;
    }
    .welcome-title {
      font-size: 1rem;
    }
    a-layout-header {
      flex-direction: column;
      text-align: center;
    }
  } 
</style>