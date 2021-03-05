<template>
  <v-container>

    <v-dialog v-model="loading" max-width="70px" max-height="70px">
      <v-card max-width="70px" max-height="70px">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
              <v-progress-circular indeterminate color="#F6AD3A"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-alert ref="Alert"></v-alert>

    <v-row>
      <v-navigation-bar color="#F6AD3A" here="manage_accounts"></v-navigation-bar>
    </v-row>

    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card max-width="500" class="mx-auto rounded-xl">

          <v-toolbar dark color="#F6AD3A">
            <v-icon>mdi-account-switch</v-icon>
            <v-toolbar-title class="headline space-text">Gerenciar Assinaturas</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="login_form">
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Login (Email)" :rules="login_rules" prepend-inner-icon="mdi-account-alert-outline" v-model="admin_auth.login" counter="50"></v-text-field>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Credencial (Senha)" :rules="password_rules" prepend-inner-icon="mdi-form-textbox-lock" v-model="admin_auth.password" counter="15" :type="show_password ? 'text' : 'password'" :append-icon="show_password == true ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_password = !show_password"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-container>
              <v-row>
                <v-col align="center" justify="center">
                  <v-btn dark color="#F6AD3A" class="space-icons" @click="login()">Login</v-btn>
                  <v-btn dark color="#F6AD3A" @click="backToHomepage()" class="space-icons">Cancelar</v-btn>
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

    show_password: false,

    admin_auth: {
      login: '',
      password: '',
    },
    
    login_rules: [
      v => !!v || 'Email:  Campo Obrigatório!',
      v => (v && v.length <= 50) || 'Tamanho máximo - 50 caracteres!',
      v => /.+@.+\..+/.test(v) || 'Formato inválido!',
    ],
    
    password_rules: [ 
      v => !!v || 'Senha: Campo Obrigatório!',
      v => (v && v.length <= 15) || 'Tamanho máximo - 15 caracteres!',
    ],

  }),

  watch: {
    
  },

  created(){},

  methods: {

    showMsg: function (text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

    backToHomepage(){ router.push({ name: 'index' }) },

    login(){

      if(this.$refs.login_form.validate()){

        let object = { email: this.admin_auth.login, password: this.admin_auth.password }

        console.log(object)

      } else {

        this.showMsg(properties.ERROR.MESSAGES.FORM_IMCOMPLETE, properties.ERROR.TYPES.WARNING, properties.ALERT_TIMEOUT)

      }

    }


  },
  
}
</script>

<style scoped>

.verticallly-centralized{
  margin-top: auto;
  margin-bottom: auto;
}

</style>