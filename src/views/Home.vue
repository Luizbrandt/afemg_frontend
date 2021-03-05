<template>
<v-container>

  <v-row>
    <v-navigation-bar color="#D91A21" here="home"></v-navigation-bar>

    <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
      <v-card elevation="1" max-width="500" class="rounded-xl">
        <v-img src="../assets/main_art.png" max-width="500"></v-img>
      </v-card>
    </v-col>

    <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center" justify="center">

    <v-card class="mx-auto rounded-xl" :color="colors.green" dark max-width="250" @click="navigation('change-password')">
    <v-card-title>
    <v-icon>mdi-key</v-icon>
    <span class="subtitle-1 space-text">Alterar Senha</span>
    </v-card-title>
    </v-card>

    </v-col>

    <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center" justify="center">

    <v-card class="mx-auto rounded-xl" :color="colors.blue" dark max-width="250" @click="navigation('print-id')">
    <v-card-title>
    <v-icon>mdi-card-account-details</v-icon>
    <span class="subtitle-1 space-text">Imprimir Carteirinha</span>
    </v-card-title>
    </v-card>

    </v-col>

    <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center" justify="center">

    <v-card class="mx-auto rounded-xl" :color="colors.yellow" dark max-width="250" @click="navigation('manage-accounts')">
    <v-card-title>
    <v-icon>mdi-account-switch</v-icon>
    <span class="subtitle-1 space-text">Gerenciar Assinaturas</span>
    </v-card-title>
    </v-card>

    </v-col>

    <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center" justify="center">

    <v-card class="mx-auto rounded-xl" :color="colors.cyan" dark max-width="250" @click="navigation('check-associate')">
    <v-card-title>
    <v-icon>mdi-account-check</v-icon>
    <span class="subtitle-1 space-text">Verificar Associação</span>
    </v-card-title>
    </v-card>

    </v-col>
  </v-row>

</v-container>
</template>

<script>
import router from '../router/index.js'
import NavigationBar from '../components/NavigationBar'
import { clearAuthToken } from '../services/auth'

export default {

  components: {
    'v-navigation-bar': NavigationBar
  },

  data: () => ({

    colors: {
      red: '#D91A21',
      green: '#20B271',
      blue: '#1D304A',
      yellow: '#F6AD3A',
      cyan: '#4DADD4',
    }

  }),

  created(){
    clearAuthToken()
  },

  methods: {

    navigation(route){
      
      switch(route){
        
        case 'index':
          router.push({ name: 'index'})
          this.sidebar = false
          break;
        
        case 'change-password':
          router.push({ name: 'change-password' })
          this.sidebar = false
          break;
        
        case 'print-id':
          router.push({name: 'print-id'})
          this.sidebar = false
          break;
        
        case 'manage-accounts':
          router.push({name: 'manage-accounts'})
          this.sidebar = false
          break;
        
        case 'check-associate':
          router.push({name: 'check-associate'})
          this.sidebar = false
          break;
      }

    },
  }
  
}
</script>

<style scoped>

</style>