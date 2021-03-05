<template>
  <v-app>
    <v-app-bar absolute src="./assets/bar_app.png">
      <v-app-bar-nav-icon @click="showSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>AFEMG - Associados e Identificação</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer absolute temporary v-model="sidebar">
      <v-list nav dense>
        <v-list-item-group v-model="group">

          <v-list-item @click="navigation('index')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Homepage</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigation('change-password')">
            <v-list-item-icon>
              <v-icon>mdi-key</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Alterar Senha</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigation('print-id')">
            <v-list-item-icon>
              <v-icon>mdi-card-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Imprimir Carteirinha</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigation('manage-accounts')">
            <v-list-item-icon>
              <v-icon>mdi-account-switch</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Gerenciar Assinaturas</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navigation('check-associate')">
            <v-list-item-icon>
              <v-icon>mdi-account-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Verificar Associação</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <br>
    <br>
    <br>

    <v-main>
      <v-container>

        <v-row>

          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- color="blue-grey lighten-5" -->

    <br>

    <v-footer padless class="no-print">
      <v-card class="flex" flat tile color="blue-grey lighten-5">
        <v-container>
          <v-row>

            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center" justify="center">
              <v-btn icon color="#D91A21" class="space-icons">
                <v-icon large>mdi-instagram</v-icon>
              </v-btn>

              <v-btn icon color="#D91A21" class="space-icons">
                <v-icon large>mdi-facebook</v-icon>
              </v-btn>

              <v-btn icon color="#D91A21" class="space-icons">
                <v-icon large>mdi-whatsapp</v-icon>
              </v-btn>

              <v-btn icon color="#D91A21" class="space-icons">
                <v-icon large>mdi-telegram</v-icon>
              </v-btn>

              <hr class="horizontal-footer-separator">

              <span class="dev-label">Desenvolvedores</span>

              <p>
                  <span class="span-text"><strong>André Brandt</strong></span> <v-icon color="#D91A21" class="space-icons" @click="brandtGit()">mdi-github</v-icon> | <span class="span-text"><strong>Sávio Lage</strong></span> <v-icon color="#D91A21" class="space-icons" @click="savioGit()">mdi-github</v-icon>
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
import router from './router/index.js'

export default {

  components:{

  },

  data: () => ({

    sidebar: false,

    group: null,

    colors: {
      red: '#D91A21',
      green: '#20B271',
      blue: '#1D304A',
      yellow: '#F6AD3A',
      cyan: '#4DADD4',
    },

  }),

  methods: {

    showSidebar(){
      this.sidebar = true
    },

    message(text){
      console.log(text)
    },

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

    savioGit(){
      window.location.href = "https://github.com/saviollage"
    },

    brandtGit(){
      window.location.href = "https://github.com/Luizbrandt"
    }

  },
  
}
</script>

<style>

.rouded-card{
  border-radius: 20px;
}

.space-text{
  margin-left: auto;
  margin-right: auto;
}

.span-text{
  color: #D91A21;
}

.block-content{
  margin-top: 10px;
  margin-bottom: 10px;
}

.space-icons{
  margin-left: 5px;
  margin-right: 5px;
}

.horizontal-footer-separator{
  color: #D91A21;
  border: 1px solid;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 40%;
}

.dev-label{
  color: #D91A21;
  margin-bottom: 5px;
  text-align: center;
}

.no-print{
  visibility: none;
}
</style>
