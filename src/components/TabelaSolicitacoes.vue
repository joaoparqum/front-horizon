<template>
    <div class="table-container">
      <!-- Botão para adicionar solicitação -->
      <a-button 
        type="primary" 
        @click="navegarParaHomescreen"
      >
        <SwapLeftOutlined />
        Voltar para tela inicial
      </a-button>
      <br /><br />
      <!-- Campo de pesquisa -->
      <a-input-search
        v-model:value="searchTerm"
        placeholder="Pesquisar por colaborador"
        enter-button
        @search="onSearch"
      />
      <br /><br />
  
      <!-- Tabela -->
      <a-table
        :columns="columns"
        :data-source="data"
        row-key="name"
        :pagination="{ pageSize: 8 }"
      >
        <template #bodyCell="{ column, record }: { column: any; record: Solicitacao }">
          <template v-if="column.key === 'data'">
            <span>{{ formatDate(record.data) }}</span>
          </template>

          <template v-if="column.key === 'comprovante'">
            <a @click="visualizarDocumento(record.comprovante.id)">
              {{ record.comprovante.nomeComprovante }}
            </a>
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
              @click="aprovarSolicitacao(record.id)"
              class="aproved-button"
            >
              Aprovar
            </a-button>
            <a-divider type="vertical" />
            <a-button
              type="primary"
              size="small"
              @click="rejeitarSolicitacao(record.id)"
              class="rejected-button"
            >
              Rejeitar
            </a-button>
          </template>
        </template>
      </a-table>

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
    import { SwapLeftOutlined } from '@ant-design/icons-vue';
    
    // Router e Store
    const router = useRouter();
    const store = useStore();
    
    // Campos de pesquisa e dados
    const searchTerm = ref('');
    const data = computed<Solicitacao[]>(() => store.state.data);

    const openVisualizerModal = ref(false);
    const documentUrl = ref("");
    
    interface Solicitacao {
      id: number;
      userLogin: string;
      data: string; // ou Date, se for um objeto Date
      motivo: string;
      comprovante: {
        id: string;
        nomeComprovante: string;
      };
      horasSolicitadas: number;
      status: string;
    }

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

    // Funções auxiliares
    const navegarParaHomescreen = () => {
        router.push('/TelaSght');
    };

    // Funções para alterar status
    const aprovarSolicitacao = async (id: number) => {
        try {
            await store.dispatch('changeStatus', { id, status: 'APROVADO' });
            message.success('Solicitação aprovada com sucesso!');
        } catch (error) {
            message.error('Erro ao aprovar solicitação.');
            console.error(error);
        }
    };

    const rejeitarSolicitacao = async (id: number) => {
        try {
            await store.dispatch('changeStatus', { id, status: 'REJEITADO' });
            message.success('Solicitação rejeitada com sucesso!');
        } catch (error) {
            message.error('Erro ao rejeitar solicitação.');
            console.error(error);
        }
    };
    
    const onSearch = async (login: string) => {
        if (searchTerm.value) {
            try {
                await store.dispatch('searchSolicitacoesByName', login);
            } catch {
                message.error('Erro ao buscar solicitações. Verifique o termo digitado.');
            }
        } else {
            await store.dispatch('fetchSolicitacoes');
        }
    };

    watch(searchTerm, (newValue) => {
      if (!newValue) {
        store.dispatch('fetchSolicitacoes');
      }
    });
    
    // Formatar data
    const formatDate = (date: string) => new Date(date).toLocaleString();
    
    // Cor do status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDENTE':
                return 'gold';
            case 'APROVADO':
                return 'green';
            case 'REJEITADO':
                return 'red';
            default:
                return 'blue';
        }
    };
    
    // Carregar dados na montagem do componente
    onMounted(() => {
        store.dispatch('fetchSolicitacoes');
    });
    
    // Atualizar dados quando o campo de busca muda
    watch(searchTerm, (newValue) => {
        if (!newValue) {
          store.dispatch('fetchSolicitacoes');
        }
    });

    interface Column {
      title: string;
      dataIndex: string;
      key: string;
      width?: number;
    }
    
    // Configuração das colunas
    const columns: Column[] = [
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
            dataIndex: 'action',
            key: 'action',
            width: 300,
        },
    ];
</script>
  
<style scoped>
    .table-container {
        padding: 0 10px;
    }
    
    .aproved-button {
      margin-right: 8px;
      background-color: rgb(0, 161, 0);
    }

    .rejected-button {
      background-color: red;
    }
    
    .register-button {
        margin-left: 5px;
    }
</style>
  