import { createStore } from 'vuex';
import axios from 'axios';
import { message } from 'ant-design-vue';

interface State {
  data: any[];
  token: string | null;
  user: string | null;
  isLoggedIn: boolean | null;
  role: string | null;
  login: string | null;
  document: any | null;
  url: string | null;
  novasSolicitacoes: any[];
  solicitacoes: any[];
  horas: any[];
}

const store = createStore({
  state() {
    return {
      data: [],
      token: localStorage.getItem('token'),
      user: null,
      role: null,
      login: null,
      isLoggedIn: false,
      document: null,
      novasSolicitacoes: [],
    };
  },
  mutations: {
    setData(state: State, data: any[]) {
      state.data = data;
    },
    setToken(state: State, token: string) {
      state.token = token;
    },
    setUser(state: State, user: string) {
      state.user = user;
    },
    setRole(state: State, role: string) { 
      state.role = role;
    },
    setLogin(state: State, login: string){
      state.login = login;
    },
    login(state: State) {
      state.isLoggedIn = true;
    },
    logout(state: State) {
      state.isLoggedIn = false;
    },
    setDocument(state: State, url: string) {
      state.document = url;
    },
    clearDocument(state: State) {
      state.document = null;
    },
    setHorasData(state: State, horas: any[]) {
      state.horas = horas;
    },
    setNovasSolicitacoes(state: any, solicitacoes: any[]) {
      state.novasSolicitacoes = solicitacoes;
    },
  },
  actions: {
    async login(
      { commit }: { commit: (mutation: string, payload?: any) => void }, 
      { username, password }: { username: string; password: string }) 
    {
      try {
        const response = await axios.post('http://localhost:8080/horizonte/auth/login', {
          login: username,
          password: password,
        });
        const token = response.data.token;
        const role = response.data.role;
        const login = response.data.login;

        commit('setToken', token);
        commit('setUser', role);
        commit('setLogin', login);
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('login', login);

        console.log('role:', role);
        console.log('login:', login);

        message.success('Login realizado com sucesso!');

        return true;
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          message.error('Credenciais inválidas. Verifique seu login e senha.');
        } else {
            message.error('Erro ao fazer login! Tente novamente mais tarde.');
        }
        return false;
      }
    },
    async logout({ commit }: { commit: (mutation: string, payload?: any) => void }) {
      commit('setToken', null);
      localStorage.removeItem('token');
    },
    async registerUser(
      { commit }: { commit: (mutation: string, payload?: any) => void }, 
      userData: any) 
    {
      try {
        const response = await axios.post('http://localhost:8080/horizonte/auth/register', userData);
        console.log('Usuário cadastrado com sucesso:', response.data);
        message.success('Usuário cadastrado com sucesso!');
        commit('setUser', userData);
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        message.error('Erro ao cadastrar usuário!');
      }
    },
    async fetchData({ commit }: { commit: (mutation: string, payload?: any) => void }) {
      try {
        const response = await axios.get('http://localhost:8080/horizonte/vistas');
        commit('setData', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },
    restoreState({ commit }: { commit: (mutation: string, payload?: any) => void }) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const login = localStorage.getItem('login');

  
      if (token) {
        commit('setToken', token);
        commit('login'); // Define o estado como logado
      }
  
      if (role) {
        commit('setUser', role);
      }
  
      if (login) {
        commit('setLogin', login);
      }
    },
    async searchDocumentByCode(
      { commit }: { commit: (mutation: string, payload?: any) => void },
      { DocumentCode, nomeArquivo }: { DocumentCode: string; nomeArquivo: string }
    ) {
      try {
        const response = await axios.get(`http://localhost:8080/horizonte/vistas/download/${DocumentCode}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nomeArquivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        commit('setData', [response.data]);
      } catch (error) {
        console.error('Erro ao buscar documento por código:', error);
      }
    },
    async searchDocumentByName({ commit }: { commit: (mutation: string, payload?: any) => void }, nomeVista: string) {
      try {
        const response = await axios.get(`http://localhost:8080/horizonte/vistas/nomeVista/${nomeVista}`);
        commit('setData', response.data);
      } catch (error) {
        console.log("Erro ao buscar documento pelo nome!");
      }
    },
    async fetchDocumentByCode(
      { commit }: { commit: (mutation: string, payload?: any) => void },
      { DocumentCode }: { DocumentCode: string})
    {
      try {
        const response = await axios.get(`http://localhost:8080/horizonte/vistas/view/${DocumentCode}`, {
          responseType: 'blob', // Certifique-se de receber como blob
        });
    
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const documentUrl = window.URL.createObjectURL(blob);

        commit('setDocument', documentUrl);
        return documentUrl;
      } catch (error) {
        console.error('Erro ao carregar o conteúdo do documento:', error);
        commit('setDocument', null);
        throw new Error('Erro ao carregar o conteúdo do documento!');
      }
    },
    async deleteData(
      { state, dispatch }: { state: State; dispatch: (action: string, payload?: any) => Promise<any> }, 
      id: string) 
    {
      try {
        await axios.delete(`http://localhost:8080/horizonte/vistas/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });
        dispatch('fetchData');
        message.success('Documento deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir o documento:', error);
        message.error('Erro ao excluir documento!');
      }
    },
    async addDocument(
      { dispatch }: { state: State; dispatch: (action: string, payload?: any) => Promise<any> }, 
      files: File[]
    ) {
      try {
        const formData = new FormData();
    
        // Adiciona todos os arquivos ao FormData
        files.forEach(file => {
          formData.append('files[]', file); // Utiliza 'files[]' para o envio de múltiplos arquivos
        });
    
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:8080/horizonte/vistas/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
    
        dispatch('fetchData');
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
    }, 
    async fetchSolicitacoes({ commit }: { state: State; commit: (mutation: string, payload?: any) => void }) {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8080/horizonte/solicitacoes', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          //console.log('Dados recebidos:', response.data);
          commit('setData', response.data);
      } catch (error) {
          console.error('Erro ao buscar dados:', error);
      }
    },
    async fetchSolicitacoesByUser({ commit }: { state: State; commit: (mutation: string, payload?: any) => void }) {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8080/horizonte/solicitacoes/user', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          //console.log('Dados recebidos:', response.data);
          commit('setData', response.data);
      } catch (error) {
          console.error('Erro ao buscar dados:', error);
      }
    }, 
    async deleteSolicitacao({ dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
    id: string) {
      try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8080/horizonte/solicitacoes/${id}`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          dispatch('fetchSolicitacoesByUser');
      } catch (error) {
          console.error('Erro ao excluir o documento:', error);
      }
    },
    async createSolicitacao(
      { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> },
      payload: { data: string; motivo: string; horasSolicitadas: number; comprovante: File }
    ) {
      try {
        const token = localStorage.getItem('token'); 
    
        const formData = new FormData();
        formData.append('data', payload.data);
        formData.append('motivo', payload.motivo);
        formData.append('horasSolicitadas', payload.horasSolicitadas.toString());
        formData.append('comprovante', payload.comprovante); // Adiciona o arquivo
    
        // Verifica se o arquivo foi realmente adicionado ao FormData
        console.log(formData.get('comprovante'));  

        // Envia a solicitação com FormData
        await axios.post(`http://localhost:8080/horizonte/solicitacoes`, formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
              'Content-Type': 'multipart/form-data', // Define o tipo correto
            },
          }
        );
    
        console.log('Solicitação criada com sucesso!');
        await dispatch('fetchSolicitacoesByUser'); // Atualiza a lista de solicitações
      } catch (error) {
        console.error('Erro ao criar solicitação: ', error);
      }
    },
    async createHoraValida( { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, horas: {nomeColaborador: string, filial: string, ano24_junhoJulho: number, ano24_agosto: number, ano24_setembroOutubro: number, ano24_novembro: number, ano24_dezembro: number, ano25_janeiro: number, ano25_fevereiro: number, ano25_marco: number, ano25_abril: number, ano25_maio: number, ano25_junho: number, ano25_julho: number, ano25_agosto: number, ano25_setembro: number, ano25_outubro: number,
    ano25_novembro: number, ano25_dezembro: number    
    }) {
          try{
              const token = localStorage.getItem('token');
              await axios.post(`http://localhost:8080/horizonte/horas`, 
              {
                  nomeColaborador: horas.nomeColaborador,
                  filial: horas.filial,
                  ano24_junhoJulho: horas.ano24_junhoJulho,
                  ano24_agosto: horas.ano24_agosto,
                  ano24_setembroOutubro: horas.ano24_setembroOutubro,
                  ano24_novembro: horas.ano24_novembro,
                  ano24_dezembro: horas.ano24_dezembro,
                  ano25_janeiro: horas.ano25_janeiro,
                  ano25_fevereiro: horas.ano25_fevereiro,
                  ano25_marco: horas.ano25_marco,
                  ano25_abril: horas.ano25_abril,
                  ano25_maio: horas.ano25_maio,
                  ano25_junho: horas.ano25_junho,
                  ano25_julho: horas.ano25_julho,
                  ano25_agosto: horas.ano25_agosto,
                  ano25_setembro: horas.ano25_setembro,
                  ano25_outubro: horas.ano25_outubro,
                  ano25_novembro: horas.ano25_novembro,
                  ano25_dezembro: horas.ano25_dezembro
              },
              {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              dispatch('fetchHoras');
          } catch (error) {
              console.log('Erro ao criar hora valida: ', error);
          }
    }, 
    async fetchHoras ({ commit }: { state: State; commit: (mutation: string, payload?: any) => void }) {
      try{
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/horizonte/horas`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          commit('setHorasData', response.data);
      } catch ( error ){
          console.log('Erro ao mostrar horas válidas: ', error);
      }
    },
    async deleteHoras (
      { dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
      id: string) 
    {
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/horizonte/horas/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch('fetchHoras');
        } catch ( error ){
            console.log('Erro ao deletar hora válida: ', error);
        }
    },
    async searchHorasByName(
      { commit }: { commit: (mutation: string, payload?: any) => void }, 
      nomeColaborador: string) 
    {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/horizonte/horas/nome/${nomeColaborador}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        });
        commit('setHorasData', response.data);
      } catch (error) {
        console.log("Erro ao buscar documento pelo nome!");
      }
    },
    async searchSolicitacoesByName(
      { commit }: { commit: (mutation: string, payload?: any) => void }, 
      login: string) 
    {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/horizonte/solicitacoes/nome/${login}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        commit('setData', response.data);
      } catch (error) {
        console.log("Erro ao buscar documento pelo nome!");
      }
    },
    async searchSolicitacoesByMotivo(
      { commit }: { commit: (mutation: string, payload?: any) => void }, 
      motivo: string) 
    {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/horizonte/solicitacoes/motivo/${motivo}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        commit('setData', response.data);
      } catch (error) {
        console.log("Erro ao buscar documento pelo nome!");
      }
    },
    async changeStatus(
      { dispatch }: { state: State; dispatch: (action: string, payload?: any) => Promise<any> },
      { id, status }: { id: string; status: string }
    ) {
      try {
          const token = localStorage.getItem('token');
          await axios.patch(
              `http://localhost:8080/horizonte/solicitacoes/${id}/status`, null, 
              {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
                  params: {
                      status,
                  },
              }
          );
          dispatch('fetchSolicitacoes');
      } catch (error) {
          console.error('Erro ao mudar status da solicitação:', error);
      }
    },
    async fetchNovasSolicitacoes({ commit }: any) {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/horizonte/solicitacoes/nao-vistas', {
          headers: { 'Authorization': `Bearer ${token}` },
      });
      commit('setNovasSolicitacoes', response.data);
    },
    async marcarNotificacoesComoVistas({ dispatch }: any) {
      try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:8080/horizonte/solicitacoes/marcar-vistas', {}, {
              headers: { 'Authorization': `Bearer ${token}` },
          });
          // Atualiza a lista de notificações após marcar como vistas
          dispatch('fetchNovasSolicitacoes');
      } catch (error) {
          console.error('Erro ao marcar notificações como vistas:', error);
      }
    },
    async updateSolicitacao({ dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
        payload: any) {
            try {
                const token = localStorage.getItem('token');
                if(!token) {
                    throw new Error('Token não encontrado. Faça login novamente.');
                }

                await axios.patch(`http://localhost:8080/horizonte/solicitacoes/${payload.id}`, payload.updatedData, {
                    headers: { Authorization: `Bearer ${token}`},
                });
                dispatch('fetchSolicitacoesByUser');
                console.log("Solicitação atualizada com sucesso!");
            } catch (error) {
                console.error('Erro ao atualizar a solicitação!', error);
            }
    },
    async updateHoras({ dispatch }: { dispatch: (action: string, payload?: any) => Promise<any> }, 
        payload: any) 
    {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token não encontrado. Faça login novamente.');
                }
            
                await axios.patch(`http://localhost:8080/horizonte/horas/${payload.id}`, payload.updatedData,{
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                dispatch('fetchHoras');
                console.log('Hora Válida atualizada com sucesso!');
            } catch (error) {
                console.error('Erro ao atualizar a hora válida:', error);
                throw error; 
            }
      },
      async fetchSolicitacaoById({}: { dispatch: (action: string, payload?: any) => Promise<any> }, 
        payload: any) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/horizonte/solicitacoes/${payload.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                return response.data;
            } catch (error) {
                console.log("Erro ao encontrar solicitação:", error);
            }
      },
      async fetchHorasById({}: { dispatch: (action: string, payload?: any) => Promise<any> }, 
        payload: any) {
            try {
            
              const token = localStorage.getItem('token');
          
              if (!token) {
                throw new Error('Token não encontrado. Faça login novamente.');
              }
          
              const response = await axios.get(`http://localhost:8080/horizonte/horas/${payload.id}`, {
                headers: { Authorization: `Bearer ${token}` }  // Corrigido "Authorizarion" para "Authorization"
              });
          
              return response.data;
            } catch (error) {
              console.log('Erro ao encontrar hora válida: ', error);
              throw error; // Re-lançando o erro para ser tratado no componente
            }
      },
      async fetchComprovanteByCode(
        { commit }: { commit: (mutation: string, payload?: any) => void },
        { DocumentCode }: { DocumentCode: string})
      {
        try {
          const token = localStorage.getItem('token');  
          const response = await axios.get(`http://localhost:8080/horizonte/comprovantes/view/${DocumentCode}`, {
            responseType: 'blob', 
            headers: { 
                Authorization: `Bearer ${token}`
            }
          });
      
          const blob = new Blob([response.data], { type: response.headers['content-type'] || '' });
          const documentUrl = window.URL.createObjectURL(blob);
  
          commit('setDocument', documentUrl);
          return documentUrl;
        } catch (error) {
          console.error('Erro ao carregar o conteúdo do documento:', error);
          commit('setDocument', null);
          throw new Error('Erro ao carregar o conteúdo do documento!');
        }
      },    
  },
  getters: {
    flightData: (state: State) => state.data,
    documentUrl: (state: State) => state.document,
    novasSolicitacoes: (state: State) => state.novasSolicitacoes,
    token: (state: State) => state.token
  },
});


export default store;