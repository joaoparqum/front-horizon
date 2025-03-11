<template>
  <div>
    <a-button 
      type="primary" 
      @click="navegarParaAdicionarHoraValida"
      class="adiciona-button"
    >
      <FileAddOutlined />
      Adicionar Hora Válida
    </a-button>
    <a-divider type="vertical" />
    <a-button 
      type="primary" 
      @click="navegarParaHomescreen"
    >
      <SwapLeftOutlined />
      Voltar para tela inicial
    </a-button>
    <br/><br/>
    <a-input-search
      v-model:value="searchTerm"
      placeholder="Pesquisar por colaborador"
      enter-button
      @search="onSearch"
    />
    <br /><br />

    <div class="table-container">
      <a-table
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 1500, y: 500 }"
        row-key="name"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'filial'">
            <a-tag :color="colorMap[record.filial] || 'default'">
              {{ record.filial }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'operation'">
            <a-button 
              type="primary" 
              size="small" 
              @click="openEditModal(record.id)"
              class="visualizer-button"
            >
              <EditOutlined />
              Editar
            </a-button>
            <a-divider type="horizontal" />
            <a-button 
              type="primary"  
              size="small"
              danger 
              @click="deleteHoraValida(record.id)"
            >
              <DeleteOutlined />
              Deletar
            </a-button>
          </template>
          <template v-else>
            {{ record[column.dataIndex] }}
          </template>
        </template>
      </a-table>
    </div>

    <!-- Modal de edição -->
    <a-modal v-model:open="editModalOpen" title="Editar" @ok="handleEditOk(formData.id, formData)" @cancel="handleEditCancel">
      <FormEditaHoras :formData="formData" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { message, type TableColumnsType } from 'ant-design-vue';
  import { DeleteOutlined, EditOutlined, FileAddOutlined, SwapLeftOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import FormEditaHoras from './FormEditaHoras.vue';

  // Router e Store
  const router = useRouter();
  const store = useStore();
  // Estado
  const searchTerm = ref('');
  const data = computed(() => store.state.horas);
  const editModalOpen = ref(false);
  const formData = ref({
    id: '',
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

  const navegarParaAdicionarHoraValida = () => {
    router.push('/CriaHora');
  };

  const navegarParaHomescreen = () => {
    router.push('/TelaSght');
  };

  onMounted(() => {
    store.dispatch('fetchHoras');
  });

  const deleteHoraValida = async (id: number) => {
    try {
      await store.dispatch('deleteHoras', id);
      message.success('Hora Válida deletada com sucesso!');
    } catch {
      message.error('Erro ao deletar a hora válida.');
    }
  };

  const openEditModal = async (id: string) => {
    console.log('ID passado:', id);

    if (!id) {
        console.error('ID não encontrado');
        return;
    }

    try {
        const dadosParaEditar = await store.dispatch('fetchHorasById', {id} );
        formData.value = { ...dadosParaEditar };
        editModalOpen.value = true;
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
  };

  const handleEditOk = async ( id: string, updatedData: any ) => {
    try {
        // Os dados do formulário (já modificados no modal)
        console.log(updatedData);

        // Lógica para enviar os dados ao store ou outro lugar
        await store.dispatch('updateHoras', { id, updatedData });

        // Mensagem de sucesso e fechamento do modal
        message.success('Dados atualizados com sucesso!');
        editModalOpen.value = false;
    } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
        message.error('Erro ao editar os dados.');
    }
  };

  const handleEditCancel = () => {
    editModalOpen.value = false;
  };

  const onSearch = async (nomeColaborador: string) => {
    if (searchTerm.value) {
      try {
        await store.dispatch('searchHorasByName', nomeColaborador);
      } catch {
        message.error('Erro ao buscar colaborador. Verifique o termo digitado.');
      }
    } else {
      await store.dispatch('fetchHoras');
    }
  };

  const colorMap: { [key: string]: string } = {
    MATRIZ: 'geekblue',
    SEABRA: 'geekblue',
    TINTASMC: 'geekblue',
    ITABERABA: 'geekblue',
    MORRO: 'geekblue',
    JACOBINA: 'geekblue',
    CONQUISTA: 'geekblue',
  };

  // Colunas da tabela
  const columns: TableColumnsType = [
    { title: 'Nome', dataIndex: 'nomeColaborador', key: 'nomeColaborador', fixed: 'left', width: 100 },
    { title: 'Filial', dataIndex: 'filial', key: 'filial', width: 100, fixed: 'left' },
    { title: 'Jun/Jul-24', dataIndex: 'ano24_junhoJulho', key: 'ano24_junhoJulho', width: 100 },
    { title: 'Ago-24', dataIndex: 'ano24_agosto', key: 'ano24_agosto', width: 100 },
    { title: 'Set/Out-24', dataIndex: 'ano24_setembroOutubro', key: 'ano24_setembroOutubro', width: 100 },
    { title: 'Nov-24', dataIndex: 'ano24_novembro', key: 'ano24_novembro', width: 100 },
    { title: 'Dez-24', dataIndex: 'ano24_dezembro', key: 'ano24_dezembro', width: 100 },
    { title: 'Jan-25', dataIndex: 'ano25_janeiro', key: 'ano25_janeiro', width: 100 },
    { title: 'Fev-25', dataIndex: 'ano25_fevereiro', key: 'ano25_fevereiro', width: 100 },
    { title: 'Mar-25', dataIndex: 'ano25_marco', key: 'ano25_marco', width: 100 },
    { title: 'Abr-25', dataIndex: 'ano25_abril', key: 'ano25_abril', width: 100 },
    { title: 'Mai-25', dataIndex: 'ano25_maio', key: 'ano25_maio', width: 100 },
    { title: 'Jun-25', dataIndex: 'ano25_junho', key: 'ano25_junho', width: 100 },
    { title: 'Jul-25', dataIndex: 'ano25_julho', key:'ano25_julho', width: 100},
    { title: 'Ago-25', dataIndex: 'ano25_agosto', key: 'ano25_agosto', width: 100},
    { title: 'Set-25', dataIndex: 'ano25_setembro', key: 'ano25_setembro', width: 100},
    { title: 'Out-25', dataIndex: 'ano25_outubro', key: 'ano25_outubro', width: 100},
    { title: 'Nov-25', dataIndex: 'ano25_novembro', key: 'ano25_novembro', width: 100},
    { title: 'Dez-25', dataIndex: 'ano25_dezembro', key: 'ano25_dezembro', width: 100},
    { title: 'Total', dataIndex: 'total', key: 'total', fixed: 'right', width: 100},
    { title: 'Ação', key: 'operation', fixed: 'right', width: 100 },
  ];
</script>  

<style>

</style>