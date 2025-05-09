<template>
    <div class="table-container">
      <a-button 
        type="primary" 
        @click="navegarParaAdicionarSolicitacao"
      >
        <FileAddOutlined />
        Adicionar Solicitação
      </a-button>

      <br /><br />
      <!-- Campo de pesquisa -->
      <a-input-search
        v-model:value="searchTerm"
        placeholder="Pesquisar por motivo"
        enter-button
        @search="onSearch"
      />
      <br /><br />
  
      <!-- Tabela -->
      <a-table 
        :columns="columns" 
        :data-source="data" 
        row-key="name" 
        :pagination="{ pageSize: 6 }"
        :scroll="{ x: 1500, y: 500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'data'">
            <span>{{ formatDate(record.data) }}</span>
          </template>

          <template v-if="column.key === 'comprovante'">
            <a @click="visualizarDocumento(record.comprovante.id)">{{ record.comprovante.nomeComprovante }}</a>
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ record.status }}
            </a-tag>
          </template>
      
          <template v-else-if="column.key === 'action'">
            <a-button 
              type="primary" 
              size="small" 
              @click="openEditModal(record.id)"
              class="visualizer-button"
            >
              <EditOutlined />
              Editar
            </a-button>
            <span>
              <a-divider type="horizontal" />
              <a-button 
                type="primary" 
                size="small" 
                danger
                @click="deleteSolicitacao(record.id)"
                class="delete-button"
              >
                <DeleteOutlined />
                Deletar
              </a-button>
            </span>
          </template>
        </template>
      </a-table>


      <a-modal v-model:open="editModalOpen" title="Editar" @ok="handleEditOk(formData.id, formData)" @cancel="handleEditCancel">
        <FormEditaSolicitacao :formData="formData" />
      </a-modal>

      <a-modal v-model:open="openVisualizerModal" title="Comprovante" @cancel="visualizerCancel" style="width: 900px;">
        <iframe v-if="documentUrl" :src="documentUrl" width="100%" height="600px"></iframe>
        <p v-else>Carregando comprovante...</p>
      </a-modal>

    </div>
</template>
  
<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    import { DeleteOutlined, FileAddOutlined, EditOutlined } from '@ant-design/icons-vue';
    import FormEditaSolicitacao from './FormEditaSolicitacao.vue';
    
    const openVisualizerModal = ref(false);
    const documentUrl = ref("");
    const editModalOpen = ref(false);
    const formData = ref({
      id: '',
      data: '',
      motivo: '',
      comprovante: '',
      horasSolicitadas: '',
    });

    // Router e Store
    const router = useRouter();
    const store = useStore();
    
    // Campos de pesquisa e dados
    const searchTerm = ref('');
    const data = computed(() => store.state.data);
    
    // Funções auxiliares
    const navegarParaAdicionarSolicitacao = () => {
        router.push('/CriaSolicitacao');
    };

    const visualizerCancel = () => {
      openVisualizerModal.value = false;
      documentUrl.value = ""; // Limpa o documento quando fechar o modal
    };

    const loading = ref<Record<string, boolean>>({});

    const visualizarDocumento = async (documentId: any) => {
      try {
        loading.value = { ...loading.value, [documentId]: true };

        await store.dispatch("fetchComprovanteByCode", { DocumentCode: documentId });
        documentUrl.value = store.getters.documentUrl;

        if (documentUrl.value) {
          openVisualizerModal.value = true; // Abre o modal com o documento carregado
        } else {
          console.error("URL do documento não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao visualizar o documento:", error);
      } finally {
        loading.value = { ...loading.value, [documentId]: false };
      }
    };
    
    const onSearch = async (motivo: string) => {
        if (searchTerm.value) {
            try {
                await store.dispatch('searchSolicitacoesByMotivo', motivo);
            } catch {
                message.error('Erro ao buscar solicitações. Verifique o termo digitado.');
            }
        } else {
            await store.dispatch('fetchSolicitacoes');
        }
    };
    
    // Formatar data
    const formatDate = (date: string) => new Date(date).toLocaleString();
    
    // Cor do status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDENTE':
                return 'gold';
            case 'APROVADA':
                return 'green';
            case 'REJEITADA':
                return 'red';
            default:
                return 'blue';
        }
    };

  const openEditModal = async (id: string) => {
      console.log('ID passado:', id);

      if (!id) {
          console.error('ID não encontrado');
          return;
      }

      try {
          const dadosParaEditar = await store.dispatch('fetchSolicitacaoById', {id} );
          formData.value = { ...dadosParaEditar };
          editModalOpen.value = true;
      } catch (error) {
          console.error('Erro ao carregar os dados:', error);
      }
  };

  const handleEditCancel = () => {
    editModalOpen.value = false;
  };

  const handleEditOk = async ( id: string, updatedData: any ) => {
    try {
        // Os dados do formulário (já modificados no modal)
        console.log(updatedData);

        // Lógica para enviar os dados ao store ou outro lugar
        await store.dispatch('updateSolicitacao', { id, updatedData });

        // Mensagem de sucesso e fechamento do modal
        message.success('Dados atualizados com sucesso!');
        editModalOpen.value = false;
    } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
        message.error('Erro ao editar os dados.');
    }
  };
    
    const deleteSolicitacao = async (id: number) => {
        try {
            await store.dispatch('deleteSolicitacao', id);
            message.success('Solicitação deletada com sucesso!');
        } catch {
            message.error('Erro ao deletar a solicitação.');
        }
    };
    
    // Carregar dados na montagem do componente
    onMounted(() => {
        store.dispatch('fetchSolicitacoesByUser');
    });
    
    // Atualizar dados quando o campo de busca muda
    watch(searchTerm, (newValue) => {
        if (!newValue) {
          store.dispatch('fetchSolicitacoesByUser');
        }
    });
    
    // Configuração das colunas
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Colaborador',
            dataIndex: 'userLogin',
            key: 'userLogin',
            width: 150,
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            width: 150,
        },
        {
            title: 'Motivo',
            dataIndex: 'motivo',
            key: 'motivo',
            width: 200,
        },
        {
            title: 'Comprovante',
            dataIndex: 'comprovante',
            key: 'comprovante',
            width: 200
        },
        {
            title: 'Horas Solicitadas',
            dataIndex: 'horasSolicitadas',
            key: 'horasSolicitadas',
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
        },
        {
            title: 'Ação',
            key: 'action',
            width: 100,
        },
    ];
</script>
  
<style scoped>
    .table-container {
        padding: 0 20px;
    }
    
    .visualizer-button {
        margin-right: 8px;
    }
    
    .register-button {
        margin-left: 5px;
    }
</style>
  