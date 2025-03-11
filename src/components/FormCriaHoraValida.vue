<template>
    <div style="display: flex; justify-content: center; align-items: center;">
      <a-form
        :model="formState"
        name="horavalida"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-row :gutter="[16, 16]">
          <!-- Nome do Colaborador -->
          <a-col :span="8">
            <a-form-item label="Nome" name="nomeColaborador" rules="[ { required: true, message: 'Por favor, insira o nome do colaborador' } ]">
              <a-input v-model:value="formState.nomeColaborador" placeholder="Digite o nome" />
            </a-form-item>
          </a-col>
  
          <!-- Filial -->
          <a-col :span="8">
            <a-form-item label="Filial" name="filial" rules="[ { required: true, message: 'Por favor, selecione a filial' } ]">
              <a-select v-model:value="formState.filial" placeholder="Selecione a filial">
                <a-select-option value="MATRIZ">Matriz</a-select-option>
                <a-select-option value="ITABERABA">Itaberaba</a-select-option>
                <a-select-option value="SEABRA">Seabra</a-select-option>
                <a-select-option value="JACOBINA">Jacobina</a-select-option>
                <a-select-option value="TINTASMC">TintasMC</a-select-option>
                <a-select-option value="MORRO">Morro do Chapéu</a-select-option>
                <a-select-option value="CONQUISTA">Vitória da Conquista</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Jun/Jul-24" >
              <a-input v-model:value="formState.ano24_junhoJulho" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Agosto-24" >
              <a-input v-model:value="formState.ano24_agosto" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Set/Out-24" >
              <a-input v-model:value="formState.ano24_setembroOutubro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Novembro-24" >
              <a-input v-model:value="formState.ano24_novembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  


        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Dezembro-24" >
              <a-input v-model:value="formState.ano24_dezembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Janeiro-25" >
              <a-input v-model:value="formState.ano25_janeiro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Fevereiro-25" >
              <a-input v-model:value="formState.ano25_fevereiro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Março-25" >
              <a-input v-model:value="formState.ano25_marco" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Abril-25" >
              <a-input v-model:value="formState.ano25_abril" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Maio-25" >
              <a-input v-model:value="formState.ano25_maio" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Junho-25" >
              <a-input v-model:value="formState.ano25_junho" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Julho-25" >
              <a-input v-model:value="formState.ano25_julho" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Agosto-25" >
              <a-input v-model:value="formState.ano25_agosto" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row> 
        
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Setembro-25" >
              <a-input v-model:value="formState.ano25_setembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Outubro-25" >
              <a-input v-model:value="formState.ano25_outubro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="Horas Novembro-25" >
              <a-input v-model:value="formState.ano25_novembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  

        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-form-item label="Horas Dezembro-25" >
              <a-input v-model:value="formState.ano25_dezembro" placeholder="Digite as horas" />
            </a-form-item>
          </a-col>
        </a-row>  
  
        <!-- Botão de Submissão -->
        <br />
        <a-row justify="center">
          <a-col>
            <a-form-item>
              <a-button type="primary" html-type="submit">Cadastrar Hora Válida</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
</template>
  
  
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  
  const store = useStore();
  const router = useRouter();
  
  // Interface para o estado do formulário
  interface HorasFormState {
    nomeColaborador: string;
    filial: string;
    ano24_junhoJulho: String,
    ano24_agosto: String,
    ano24_setembroOutubro: String,
    ano24_novembro: String,
    ano24_dezembro: String,
    ano25_janeiro: String,
    ano25_fevereiro: String,
    ano25_marco: String,
    ano25_abril: String,
    ano25_maio: String,
    ano25_junho: String,
    ano25_julho: String,
    ano25_agosto: String,
    ano25_setembro: String,
    ano25_outubro: String,
    ano25_novembro: String,
    ano25_dezembro: String
  }
  
  // Estado inicial do formulário
  const formState = reactive<HorasFormState>({
    nomeColaborador: '',
    filial: '',
    ano24_junhoJulho: '',
    ano24_agosto: '',
    ano24_setembroOutubro: '',
    ano24_novembro: '',
    ano24_dezembro: '',
    ano25_janeiro: '',
    ano25_fevereiro: '',
    ano25_marco: '',
    ano25_abril: '',
    ano25_maio: '',
    ano25_junho: '',
    ano25_julho: '',
    ano25_agosto: '',
    ano25_setembro: '',
    ano25_outubro: '',
    ano25_novembro: '',
    ano25_dezembro: ''
  });

  
    // Função chamada no envio bem-sucedido do formulário
    const onFinish = async () => {
      try {
        message.loading({ content: 'Enviando Hora Válida...' });
        await store.dispatch('createHoraValida', {
          nomeColaborador: formState.nomeColaborador,
          filial: formState.filial,
          ano24_junhoJulho: formState.ano24_junhoJulho,
          ano24_agosto: formState.ano24_agosto,
          ano24_setembroOutubro: formState.ano24_setembroOutubro,
          ano24_novembro: formState.ano24_novembro,
          ano24_dezembro: formState.ano24_dezembro,
          ano25_janeiro: formState.ano25_janeiro,
          ano25_fevereiro: formState.ano25_fevereiro,
          ano25_marco: formState.ano25_marco,
          ano25_abril: formState.ano25_abril,
          ano25_maio: formState.ano25_maio,
          ano25_junho: formState.ano25_junho,
          ano25_julho: formState.ano25_julho,
          ano25_agosto: formState.ano25_agosto,
          ano25_setembro: formState.ano25_setembro,
          ano25_outubro: formState.ano25_outubro,
          ano25_novembro: formState.ano25_novembro,
          ano25_dezembro: formState.ano25_dezembro
        });
        message.success({ content: 'Hora Válida criada com sucesso!' });
        setTimeout(() => {
          router.push('/TelaHorasValidas')
        }, 2000);
      } catch (error) {
        console.error('Erro ao criar hora válida:', error);
        message.error({ content: 'Erro ao criar hora válida.' });
      }
  };

  
  // Função chamada no envio mal-sucedido do formulário
  const onFinishFailed = (errorInfo: any) => {
    console.log('Falha no envio do formulário:', errorInfo);
  };
</script>