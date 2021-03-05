<template>
  <v-container>

    <v-dialog v-model="loading" max-width="70px" max-height="70px">
      <v-card max-width="70px" max-height="70px">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
              <v-progress-circular indeterminate color="#1D304A"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-alert ref="Alert"></v-alert>

    <v-row>
      <v-navigation-bar color="#1D304A" here="print_id"></v-navigation-bar>
    </v-row>
    
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card max-width="500" class="mx-auto rounded-xl">

          <v-toolbar dark color="#1D304A">
            <v-icon>mdi-card-account-details</v-icon>
            <v-toolbar-title class="headline space-text">Imprimir Carteirinha</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="print_id_form">
              <v-container>
                <v-row>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="CPF" :rules="cpf_rules" prepend-inner-icon="mdi-card-account-details-outline" counter="14" v-mask="['###.###.###-##']" v-model="print_id.cpf"></v-text-field>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Código Privado" :rules="private_hash_rules" prepend-inner-icon="mdi-code-braces" counter="24" v-model="print_id.private_hash"></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-container>
              <v-row>
                <v-col align="center" justify="center">
                  <v-btn dark color="#1D304A" class="space-icons" @click="print()">Imprimir</v-btn>
                  <v-btn dark color="#1D304A" @click="backToHomepage()" class="space-icons">Cancelar</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../router/index.js'
import script from '../common/validation.js'
import Alert from '../components/Alert'
import NavigationBar from '../components/NavigationBar'
import properties from '../config/properties.json'

export default {

  components: {
    'v-alert': Alert,
    'v-navigation-bar': NavigationBar
  },

  data: () => ({

    loading: false,

    print_id: {
      cpf: '',
      private_hash: '',
    },

    cpf_rules: [
      v => !!v || 'CPF: Campo Obrigatório!',
      v => (v && v.length <= 14) || 'Tamanho máximo: 14 caracteres!',
      v => (v && script.cpfValidation(v.replace(/[()-.]|\//g, ''))) || 'CPF inválido: digite um CPF válido!',
    ],

    private_hash_rules: [
      v => !!v || 'Código Privado: Campo Obrigatório!',
      v => (v && v.length <= 24) || 'Tamanho máximo: 24 caracteres!',
    ],

    properties: {
      name: 'Sávio Lage',
      cpf: '000.000.000-..',
      init: '01/01/2023',
      expire: '01/01/2024',
      public: 'd4edf942-9010-401a-8ee8-6ea00beea787',
      private: '9b5eb538-7b7d-11eb-9439-0242ac130002',
    },

  }),

  created() {
    clearAuthToken()
  },

  methods: {

    showMsg: function (text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

    backToHomepage(){ router.push({ name: 'index' }) },

    printId(name, cpf, init, expire, public_hash, private_hash){
      router.push({ name: 'printed-id', params: { name: name, cpf: cpf , init: init , expire: expire , public_hash: public_hash , private_hash: private_hash}})
    },

    print(){

      if(this.$refs.print_id_form.validate()){
        
        let cpf_value = this.print_id.cpf;
        cpf_value = cpf_value.replace(/[()-.]|\//g, '')

        let object = {
          privateKey: this.print_id.private_hash,
          cpf: cpf_value,
        }
      
        console.log(object)

      } else {
        this.showMsg(properties.ERROR.MESSAGES.FORM_IMCOMPLETE, properties.ERROR.TYPES.WARNING, properties.ALERT_TIMEOUT)
      }


    },

  },
  
}
</script>

<style scoped>

.verticallly-centralized{
  margin-top: auto;
  margin-bottom: auto;
}

.icons-separator{
  margin-left: 20px;
  margin-right: 20px;
}

</style>