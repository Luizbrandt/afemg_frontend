<template>
  <v-container>

    <v-alert ref="Alert"></v-alert>

    <v-dialog v-model="loading" max-width="70px" max-height="70px">
      <v-card max-width="70px" max-height="70px">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
              <v-progress-circular indeterminate color="#4DADD4"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-row>
      <v-navigation-bar color="#4DADD4" here="check_associate"></v-navigation-bar>
    </v-row>
    
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card max-width="500" class="mx-auto rounded-xl">

          <v-toolbar dark color="#4DADD4">
            <v-icon>mdi-account-check</v-icon>
            <v-toolbar-title class="headline space-text">Verificar Associação</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="check_associate_form">
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Código Público" :rules="public_hash_rules" prepend-inner-icon="mdi-code-brackets" v-model="check_associate" counter="32"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-container>
              <v-row>
                <v-col align="center" justify="center">
                  <v-btn dark color="#4DADD4" class="space-icons" @click="check()">Verificar</v-btn>
                  <v-btn dark color="#4DADD4" @click="backToHomepage()" class="space-icons">Cancelar</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>

        </v-card>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card v-show="checked.show" class="mx-auto rounded-xl" :color="checked.color" dark max-width="500">
          <v-card-title>
            <v-icon large left>{{ checked.icon }}</v-icon> 
            <span class="h6">{{ checked.name }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                  <strong>Status da Associação:</strong> {{ checked.status }}
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                  <strong>Data de Expiração:</strong> {{ checked.expire }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../router/index'
import config from '../config/properties.json'
import Alert from '../components/Alert'
import NavigationBar from '../components/NavigationBar'

export default {

  components: {
    'v-alert': Alert,
    'v-navigation-bar': NavigationBar 
  },

  data: () => ({

    loading: false,

    check_associate: '',
    
    public_hash_rules: [ 
      v => !!v || 'Código Público: Campo Obrigatório!',
      v => (v && v.length <= 32) || 'Tamanho máximo - 32 caracteres!',
    ],

    //mdi-account
    //mdi-account-alert

    checked: {
      show: false,
      icon: '',
      name: '',
      status: '',
      expire: '',
      color: '',
    },

  }),

  methods: {

    showMsg: function (text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

    close(){ this.checked.show = false },

    backToHomepage(){

      router.push({ name: 'index' })
    
    },

    check(){
      if(this.$refs.check_associate_form.validate()){

        this.loading = true

      } else {

        this.showMsg(config.ERROR.MESSAGES.FORM_IMCOMPLETE, config.ERROR.TYPES.WARNING, config.ALERT_TIMEOUT)

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