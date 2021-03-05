<template>
  <v-container>

    <v-alert ref="Alert"></v-alert>

    <v-dialog v-model="loading" max-width="70px" max-height="70px">
      <v-card max-width="70px" max-height="70px">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
              <v-progress-circular indeterminate color="#20B271"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-row>
      <v-navigation-bar color="#20B271" here="change_password"></v-navigation-bar>
    </v-row>

    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card max-width="500" class="mx-auto rounded-xl">

          <v-toolbar dark color="#20B271">
            <v-icon>mdi-key</v-icon>
            <v-toolbar-title class="headline space-text">Alterar Senha</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="change_password_form">
              <v-container>
                <v-row>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Login (Email)" :rules="login_rules" prepend-inner-icon="mdi-account-alert-outline" v-model="change_password.login" counter="50"></v-text-field>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Senha Antiga" :rules="password_rules" prepend-inner-icon="mdi-form-textbox-lock" v-model="change_password.old" counter="15" :type="show_old ? 'text' : 'password'" :append-icon="show_old == true ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_old = !show_old"></v-text-field>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Senha Antiga (Verificação)" :rules="[(change_password.old === change_password.old_repeat) || 'Senhas não coincidem!']" prepend-inner-icon="mdi-form-textbox-lock" v-model="change_password.old_repeat" counter="15" :type="show_old_repeat ? 'text' : 'password'" :append-icon="show_old_repeat == true ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_old_repeat = !show_old_repeat"></v-text-field>
                  </v-col>

                  <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                    <v-text-field outlined label="Nova Senha" :rules="[password_rules, passwordDifference()]" prepend-inner-icon="mdi-form-textbox-lock" v-model="change_password.new" counter="15" :type="show_new ? 'text' : 'password'" :append-icon="show_new == true ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_new = !show_new"></v-text-field>
                  </v-col>

                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-container>
              <v-row>
                <v-col align="center" justify="center">
                  <v-btn dark color="#20B271" class="space-icons" @click="change()">Alterar</v-btn>
                  <v-btn dark color="#20B271" @click="backToHomepage()" class="space-icons">Cancelar</v-btn>
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
import properties from '../config/properties.json'
import NavigationBar from '../components/NavigationBar'

export default {

  components: {
    'v-navigation-bar': NavigationBar,
    'v-alert': Alert,
  },

  data: () => ({

    loading: false,

    show_old: false,

    show_old_repeat: false,

    show_new: false,

    change_password: {
      login: '',
      old: '',
      old_repeat: '',
      new: '',
    },

    login_rules: [
      v => !!v || 'Emal:  Campo Obrigatório!',
      v => (v && v.length <= 50) || 'Tamanho máximo - 50 caracteres!',
      v => /.+@.+\..+/.test(v) || 'Formato inválido!',
    ],

    password_rules: [ 
      v => !!v || 'Senha: Campo Obrigatório!',
      v => (v && v.length <= 15) || 'Tamanho máximo - 15 caracteres!',
    ],

  }),

  computed: {
    passwordConfirmation(){
      return() => (this.change_password.old == this.change_password.old_repeat) || 'Senhas antigas não coincidem!'
    },

    passwordDifference(){
      return() => (this.change_password.old != this.change_password.new) || 'A nova senha precisa diferir da senha antiga!'
    }
  },

  methods: {

    showMsg: function (text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

    backToHomepage(){

      router.push({ name: 'index' })
    
    },

    change(){

      if(this.$refs.change_password_form.validate()){

        let object = {
          email: this.change_password.login,
          oldPassword: this.change_password.old,
          newPassword: this.change_password.new
        };

        this.loading = true;

        console.log(object)

      } else {
        this.showMsg(properties.ERROR.MESSAGES.FORM_IMCOMPLETE, properties.ERROR.TYPES.WARNING, properties.ALERT_TIMEOUT)
      }
    
    },

  },

  created(){
    clearAuthToken()
  },
  
}
</script>

<style scoped>

.verticallly-centralized{
  margin-top: auto;
  margin-bottom: auto;
}

.centralized{
  margin-left: auto;
  margin-right: auto;
}

</style>