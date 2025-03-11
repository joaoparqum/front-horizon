<template>
    <a-form
      :model="props.formData"
      :layout="'vertical'"
      ref="formRef"
    >
        <a-row :gutter="[16, 16]">
            <!-- Nome do Colaborador -->
            <a-col :span="8">
              <a-form-item
                label="Nome"
                name="nomeColaborador"
                rules="[ { required: true, message: 'Por favor, insira o nome do colaborador' } ]"
              >
                <a-input
                  v-model:value="props.formData.nomeColaborador"
                  placeholder="Digite o nome"
                />
              </a-form-item>
            </a-col>
  
            <!-- Filial -->
            <a-col :span="8">
              <a-form-item
                label="Filial"
                name="filial"
                rules="[ { required: true, message: 'Por favor, selecione a filial' } ]"
              >
                <a-select
                  v-model:value="props.formData.filial"
                  placeholder="Selecione a filial"
                >
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
  
            <!-- Outras colunas de horas -->
            <a-col :span="8">
              <a-form-item label="Horas Jun/Jul-24">
                <a-input
                  v-model:value="props.formData.ano24_junhoJulho"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>
  
          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-form-item label="Horas Agosto-24">
                <a-input
                  v-model:value="props.formData.ano24_agosto"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Horas Set/Out-24">
                <a-input
                  v-model:value="props.formData.ano24_setembroOutubro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Horas Novembro-24">
                <a-input
                  v-model:value="props.formData.ano24_novembro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>
  
          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-form-item label="Horas Dezembro-24">
                <a-input
                  v-model:value="props.formData.ano24_dezembro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Horas Janeiro-25">
                <a-input
                  v-model:value="props.formData.ano25_janeiro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Horas Fevereiro-25">
                <a-input
                  v-model:value="props.formData.ano25_fevereiro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>
  
          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-form-item label="Horas Março-25">
                <a-input
                  v-model:value="props.formData.ano25_marco"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Horas Abril-25">
                <a-input
                  v-model:value="props.formData.ano25_abril"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Horas Maio-25">
                <a-input
                  v-model:value="props.formData.ano25_maio"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>
  
          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-form-item label="Horas Junho-25">
                <a-input
                  v-model:value="props.formData.ano25_junho"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Horas Julho-25">
                <a-input
                  v-model:value="props.formData.ano25_julho"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Horas Agosto-25">
                <a-input
                  v-model:value="props.formData.ano25_agosto"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-form-item label="Horas Setembro-25">
                <a-input
                  v-model:value="props.formData.ano25_setembro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Horas Outubro-25">
                <a-input
                  v-model:value="props.formData.ano25_outubro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="Horas Novembro-25">
                <a-input
                  v-model:value="props.formData.ano25_novembro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[16, 16]">
            <a-col :span="8">
              <a-form-item label="Horas Dezembro-25">
                <a-input
                  v-model:value="props.formData.ano25_dezembro"
                  placeholder="Digite as horas"
                />
              </a-form-item>
            </a-col>
          </a-row>
      </a-form>
</template>
  
<script lang="ts" setup>
  
    // Definindo que formData será passado como uma prop
    const props = defineProps({
      formData: {
        type: Object,
        required: true,
      },
    });
</script>
    