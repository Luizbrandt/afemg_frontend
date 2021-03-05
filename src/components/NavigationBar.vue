<template>
    <v-container>
        <v-card max-width="500" class="mx-auto rounded-xl">
            <v-toolbar dark :color="bar_color">
                <v-container>
                    <v-row align="center" justify="center">

                        <v-tooltip top>
                            <template #activator="{on:tooltip}">
                                <v-icon class="icons-separator" v-on="{...tooltip}" @click="navigation('change-password')" :disabled="selected_menu == 'change_password' ? true : false">mdi-key</v-icon>
                            </template>
                            <span>Alteração de Senha</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template #activator="{on:tooltip}">
                                <v-icon class="icons-separator" v-on="{...tooltip}" @click="navigation('print-id')" :disabled="selected_menu == 'print_id' ? true : false">mdi-card-account-details</v-icon>
                            </template>
                            <span>Impressão da Carteirinha</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template #activator="{on:tooltip}">
                                <v-icon class="icons-separator" v-on="{...tooltip}" @click="navigation('manage-accounts')" :disabled="selected_menu == 'manage_accounts' ? true : false">mdi-account-switch</v-icon>
                            </template>
                            <span>Gerenciamento de Assinaturas</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template #activator="{on:tooltip}">
                                <v-icon class="icons-separator" v-on="{...tooltip}" @click="navigation('check-associate')" :disabled="selected_menu == 'check_associate' ? true : false">mdi-account-check</v-icon>
                            </template>
                            <span>Validação de Associados</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template #activator="{on:tooltip}">
                                <v-icon class="icons-separator" v-on="{...tooltip}" @click="navigation('index')" :disabled="selected_menu == 'home' ? true : false">mdi-home</v-icon>
                            </template>
                            <span>Homepage</span>
                        </v-tooltip>

                    </v-row>
                </v-container>
            </v-toolbar>
        </v-card>
    </v-container>
</template>

<script>
import router from '../router/index'

export default {

    props: {

        color: {
            type: String,
            required: true,
        },

        here: {
            type: String,
            required: true,
        },
    },

    data(){
        return {

            bar_color: this.color,

            selected_menu: this.here,

        }
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
    },
}
</script>

<style scoped>

.icons-separator{
  margin-left: 20px;
  margin-right: 20px;
}

</style>