<template>
  <v-container>
    
    <v-card max-width="500" class="mx-auto rounded-xl">

      <v-toolbar dark color="#D91A21">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="headline space-text">Login</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form ref="login_form">
          <v-container>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-text-field outlined label="Login (Email)" :rules="login_rules" prepend-inner-icon="mdi-account-alert-outline" v-model="user_auth.login" counter="50"></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-text-field outlined label="Credencial (Senha)" :rules="password_rules" prepend-inner-icon="mdi-form-textbox-lock" v-model="user_auth.password" counter="15" :type="show_password ? 'text' : 'password'" :append-icon="show_password == true ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show_password = !show_password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row>
            <v-col align="center" justify="center">
              <v-btn dark color="#D91A21" class="space-icons" @click="login()">Login</v-btn>
              <v-btn dark color="#D91A21" @click="backToHomepage()" class="space-icons">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
import router from '../router/index.js'
import { clearAuthToken } from '../services/auth'

export default {

  data: () => ({

    user_auth: {
      login: '',
      password: ''
    },

    login_rules: [
      v => !!v || 'Emal:  Campo Obrigatório!',
      v => (v && v.length <= 50) || 'Tamanho máximo: 50 caracteres!',
      v => /.+@.+\..+/.test(v) || 'Formato inválido!',
    ],
    
    password_rules: [ 
      v => !!v || 'Senha: Campo Obrigatório!',
      v => (v && v.length <= 15) || 'Tamanho máximo: 15 caracteres!',
    ],

    show_password: false,

  }),

  created(){
    clearAuthToken()
  },

  methods: {

    backToHomepage(){

      router.push({ name: 'index' })
    
    },

    login(){
      if(this.$refs.login_form.validate()){
        let object = {
          email: this.user_auth.login,
          password: this.user_auth.password
        }
        console.log(object)
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

</style>