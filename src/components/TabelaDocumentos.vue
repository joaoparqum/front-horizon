<template>
    <div class="table-container">
      <a-button 
        type="primary" 
        @click="navegarParaAdicionarDocumento"
        v-if="isAdmin"
      >
        <FileAddOutlined />
        Adicionar documento
      </a-button>
      <a-divider type="vertical" v-if="isAdmin" />
      <a-button 
        v-if="isAdmin"
        type="primary" 
        @click="cadastrarUsuario()"
        class="register-button"
      >
        <UserAddOutlined />
        <span class="button-text">Registrar usuário</span>
      </a-button>
      <a-divider type="vertical" v-if="isAdmin"/>
      <a-button 
        type="primary" 
        @click="voltarParaHome"
      >
          <ArrowLeftOutlined />
          <span>Voltar para a Home</span>
      </a-button>
      <br /><br />
      <a-input-search
        v-model:value="searchTerm"
        placeholder="Pesquisar por nome"
        enter-button
        @search="onSearch"
      />
      <br /><br />
  
      <a-table 
        :columns="columns" 
        :data-source="data" 
        :scroll="{ x: 800 }" 
        :pagination="{ pageSize: 6 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'nomeVista'">
            <a @click="visualizarDocumento(record.id)">
              {{ record.nomeVista }}
            </a>
          </template>
          <template v-else-if="column.key === 'tipoVista'">
            <a-tag :color="record.tipoVista === 'pdf' ? 'geekblue' : 'green'">
              {{ record.tipoVista }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'tamanhoVista'">
            <span>{{ (record.tamanhoVista / 1024).toFixed(2) }} KB</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button 
              type="primary" 
              :loading="loading[record.id]" 
              size="small" 
              @click="visualizarDocumento(record.id)"
              class="visualizer-button"
            >
              Visualizar
            </a-button>
            <span v-if="isAdmin">
              <a-divider type="vertical" />
              <a-button 
                type="primary"  
                size="small" 
                @click="deleteDocument(record.id)"
                class="delete-button"
              >
                <DeleteOutlined />
                Deletar
              </a-button>
            </span>
          </template>
        </template>
      </a-table>

      <a-modal v-model:open="openVisualizerModal" title="Vista Explodida" @cancel="visualizerCancel">
        <iframe v-if="documentUrl" :src="documentUrl" width="100%" height="600px"></iframe>
        <p v-else>Carregando documento...</p>
      </a-modal>
    </div>
</template>
  
<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { computed, onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    import { ArrowLeftOutlined, DeleteOutlined, FileAddOutlined, UserAddOutlined } from '@ant-design/icons-vue';
  
    const router = useRouter();
    const searchTerm = ref('');
    const store = useStore();
    const openVisualizerModal = ref(false);
    const documentUrl = ref("");
  
    const cadastrarUsuario = () => {
      setTimeout(() => {
        router.push('/CriaUserVistas')
      }, 2000);
    }

    const navegarParaAdicionarDocumento = () => {
      router.push('/AdicionarDocumento');
    };

    const voltarParaHome = () => {
      router.push('/HomeScreen')
    }
  
    const isAdmin = computed(() => {
      const role = localStorage.getItem('role');
      console.log('Usuário carregado:', role); // Verificar se o usuário está disponível
      return role === 'admin_vistas' || role === 'admin';
    });
  
    const mockData = ref([
      {
        id: '1',
        nomeVista: 'documento1.pdf',
        tipoVista: 'pdf',
        tamanhoVista: 2048, // Em bytes (2MB)
        url: 'https://wwfit.awsassets.panda.org/downloads/circolare_n_4_earth_hour_25_marzo_2017.pdf',
      },
      {
        id: '2',
        nomeVista: 'relatorio.pdf',
        tipoVista: 'pdf',
        tamanhoVista: 102400, // Em bytes (100MB)
        url: 'https://wwfit.awsassets.panda.org/downloads/circolare_n_4_earth_hour_25_marzo_2017.pdf',
      },
      {
        id: '3',
        nomeVista: 'planilha.pdf',
        tipoVista: 'pdf',
        tamanhoVista: 51200, // Em bytes (50MB)
        url: 'https://wwfit.awsassets.panda.org/downloads/circolare_n_4_earth_hour_25_marzo_2017.pdf',
      },
    ]);
  
    const data = computed(() => mockData.value);
    //const data = computed(() => store.state.data);
  
    onMounted(() => {
      store.dispatch('fetchData');
    });

    const visualizerCancel = () => {
      openVisualizerModal.value = false;
      documentUrl.value = ""; // Limpa o documento quando fechar o modal
    };
  
    /*const downloadDocument = (DocumentCode: string, nomeArquivo: string) => {
      store.dispatch('searchDocumentByCode', { DocumentCode, nomeArquivo });
      store.dispatch('fetchData');
    };
  
    const openDocumentByName = async (documentId: string) => {
      message.loading({ content: 'Carregando documento...' });
      await store.dispatch('fetchDocumentByCode', { DocumentCode: documentId });
        const documentUrl = store.getters.documentUrl;
  
        if (documentUrl) {
          window.open(documentUrl, '_blank');
        } else {
          console.error('URL do documento não encontrado!');
          message.error('Erro na abertura do documento!');
        }
      setTimeout(() => {
        message.success({ content: 'Documento carregado!', duration: 2 });
      }, 1000);
    };*/
  
    const loading = ref<Record<string, boolean>>({});

    const visualizarDocumento = (documentId: string) => {
      const doc = mockData.value.find(d => d.id === documentId);
      if (doc) {
        documentUrl.value = doc.url;
        openVisualizerModal.value = true; // Abre o modal
      } else {
        console.error("Documento não encontrado!");
      }
    };
  
    /*const visualizarDocumento = async (documentId: any) => {
      try {
        loading.value = { ...loading.value, [documentId]: true };

        await store.dispatch("fetchDocumentByCode", { DocumentCode: documentId });
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
    };*/
  
    const deleteDocument = (id: string) => {
      store.dispatch('deleteData', id);
    };
  
    const onSearch = (nomeVista: string) => {
      if (searchTerm.value) {
        try {
          store.dispatch('searchDocumentByName', nomeVista);
        } catch (error) {
          message.error('Erro durante a busca! Digite o nome corretamente!');
        }
      } else {
        try {
          store.dispatch('fetchData');
        } catch (error) {
          message.error('Erro ao buscar todos os documentos!');
        }
      }
    };
  
    watch(searchTerm, (newValue) => {
      if (!newValue) {
        store.dispatch('fetchData');
      }
    });
  
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        responsive: ['md'],
      },
      {
        title: 'Nome do Arquivo',
        dataIndex: 'nomeVista',
        key: 'nomeVista',
        width: 200,
      },
      {
        title: 'Tipo do Arquivo',
        dataIndex: 'tipoVista',
        key: 'tipoVista',
        width: 150,
      },
      {
        title: 'Tamanho do Arquivo (KB)',
        dataIndex: 'tamanhoVista',
        key: 'tamanhoVista',
        width: 150,
        responsive: ['md'],
      },
      {
        title: 'Ação',
        key: 'action',
        width: 150,
      },
    ];
</script>
  
<style scoped>
    .table-container {
      padding: 0 20px;
    }
  
    /* Responsividade */
    @media (max-width: 1024px) {
      .table-container {
        padding: 0 5px;
      }
    }
  
    @media (max-width: 768px) {
      .register-button {
        margin-top: 5px;
      }
    }
  
    .visualizer-button {
      margin-bottom: 5px;
    }
  
</style>