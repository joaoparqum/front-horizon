<script setup lang="ts">
    import { ref } from 'vue';
    const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <a-layout :style="{ minHeight: '100vh', position: 'relative'}">

    <a-layout-header 
      :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }"
    >
      <img src="/casa-logo.jpg" alt="Logo" style="margin-right: 10px; height: 40px;" />
      <h1 style="color: white; margin: 0;">Horizonte</h1>
    </a-layout-header>

    <a-layout-content :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }"></a-breadcrumb>
        <div class="container-intro">

          <div class="sun-container">
              <div class="sun"></div>
              <a class="ray" onclick="alert('Vistas Explodidas - Para visualizações detalhadas e intuitivas, permitindo uma análise profunda e estratégica')">Vistas</a>
              <a class="ray" onclick="alert('SGHT - Para um controle preciso e eficiente do tempo dedicado a cada projeto.')">SGHT</a>
          </div>

          <section class="intro"> 
              <h1>O que é o Ecossistema Horizonte?</h1>

              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O Horizonte é mais do que um sistema — é uma plataforma integrada que oferece uma visão ampla e clara dos seus processos, unindo ferramentas poderosas para otimizar a gestão de horas trabalhadas e visualizações detalhadas de projetos. Com uma abordagem inovadora, o Horizonte foi projetado para ser o ponto de partida de uma jornada rumo à eficiência e à produtividade. No momento, o Horizonte já conta com duas funcionalidades essenciais:<br></p>

              <ul>
                <li>Gestão de Horas Trabalhadas</li>
                <li>Vistas Explodidas</li>
              </ul>

              <p><strong>Gestão de Horas Trabalhadas</strong>: Para um controle preciso e eficiente do tempo dedicado a cada projeto. <br>

              <strong>Vistas Explodidas</strong>: Para visualizações detalhadas e intuitivas, permitindo uma análise profunda e estratégica. </p>

              <p>Mas o Horizonte não para por aí. Pensado para ser expansível, ele está preparado para abranger novas funcionalidades que se integrem perfeitamente ao ecossistema, sempre com o objetivo de simplificar processos, ampliar a visão estratégica e impulsionar resultados.
              <br><br>
              <h1><strong>O futuro é amplo e o Horizonte está aqui para guiar você.</strong></h1></p>
          </section>
        </div>
    </a-layout-content>

    <a-layout-footer :style="{ position: 'relative', bottom: 0, width: '100%', textAlign: 'center', background: '#0404cf', padding: '35px 0' }">
      <h2 style="color: yellow; margin: 0;">Casa do Construtor | Setor de TI - Irecê ©{{ currentYear }}</h2>
    </a-layout-footer>
  </a-layout>
  
</template>

<style scoped>
  /* Estilo padrão */
  .content-wrapper {
    background: #fff;
    padding: 60px;
    margin: 0 auto;
    max-width: 800px;
    min-height: 460px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
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

  .container-intro {
    display: flex;
    align-items: center;
    gap: 100px; /* Espaço entre a section e o sol */
    margin-left: 20%;
    margin-bottom: 20px;
  }

  .intro {
    /* Alinha à direita dentro do flex container */
    width: 60%; /* Ajuste conforme necessário */
    padding: 20px;
    background-color: #0404cf; /* Apenas para destaque */
     /* Mantém o texto alinhado à esquerda */
    color: yellow;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: "Poppins", sans-serif;

    & h1 {
      text-align: center;
    }
  }

  .sun-container {
    position: relative;
    width: 200px;
    height: 200px;
  }

  .sun {
      width: 300px;
      height: 300px;
      background: yellow;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 30%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.8);
  }

  .ray {
      width: 50px;
      height: 50px;
      background: orange;
      position: absolute;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(255, 140, 0, 0.8);
      transition: transform 0.2s ease-in-out;
  }

  .ray:hover {
      transform: scale(1.2);
  }
 
  .ray:nth-child(1) { top: -20px; left: 50%; transform: translateX(-50%); }
  .ray:nth-child(2) { top: 20%; right: -60px; }
  .ray:nth-child(3) { bottom: -100px; left: 50%; transform: translateX(-50%); }
  .ray:nth-child(4) { top: 20%; left: -10px; }

</style>