<template>
    <v-container>

        <!-- Loading -->
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

        <!-- Logout -->
        <v-dialog v-model="logout" max-width="350" persistent>
            <v-card max-width="500" class="mx-auto rounded-xl">
                <v-card-text>
                    <v-container>
                        <v-row class="start-text">
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-icon> mdi-alert-box-outline</v-icon>
                            </v-col>

                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                                Deseja efetuar logout (sair)?
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn icon @click="clearToken()"><v-icon>mdi-check</v-icon></v-btn>
                        <v-btn icon @click="closeLogout()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Remove User -->
        <v-dialog v-model="removeUser" max-width="350" persistent>
            <v-card max-width="500" class="mx-auto rounded-xl">
                <v-card-text>
                    <v-container>
                        <v-row class="start-text">
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-icon> mdi-alert-box-outline</v-icon>
                            </v-col>

                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                                Excluir usuário de nome <strong>{{ removeUserName }}</strong> e CPF <strong>{{ removeUserCpf }}</strong>?
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn icon @click="remove()"><v-icon>mdi-check</v-icon></v-btn>
                        <v-btn icon @click="closeRemove()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Add Admin -->
        <!-- <v-dialog v-model="addAdmin" max-width="350" persistent>
            <v-card max-width="500" class="mx-auto rounded-xl">
                <v-card-text>
                    <v-container>
                        <v-form ref="addAdminForm">
                            <v-row class="start-text">
                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <v-icon class="icons-separator">mdi-account-plus</v-icon>
                                </v-col>

                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <span><strong>Adicionar Administrador</strong></span>
                                </v-col>

                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <v-text-field label="Nome" solo v-model="addAdminName" counter="50" :rules="name_rules"></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <v-text-field label="Login(Email)" solo v-model="addAdminEmail" counter="50" :rules="email_rules"></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <v-text-field label="Senha" solo v-model="addAdminPwd" counter="15" :rules="password_rules"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn icon ><v-icon>mdi-check</v-icon></v-btn>
                        <v-btn icon @click="closeAddAdmin()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->

        <!-- Add User -->
        <v-dialog v-model="addUser" max-width="500" persistent>

            <v-card  class="mx-auto rounded-xl">
                <v-card-text>
                    <v-container>
                        <v-form ref="addUserForm">
                            <v-row class="start-text">
                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <v-icon class="icons-separator">mdi-account-plus-outline</v-icon>
                                </v-col>

                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <span><strong>Adicionar Associado</strong></span>
                                </v-col>

                                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center">
                                    <v-text-field label="Nome" solo counter="50" :rules="name_rules" v-model="addUserName"></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center">
                                    <v-text-field label="Email" solo counter="50" :rules="email_rules" v-model="addUserEmail"></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center">
                                    <v-text-field label="CPF" solo counter="14" :rules="cpf_rules" v-mask="['###.###.###-##']" v-model="addUserCpf"></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6" align="center">
                                    <v-text-field label="Contato" solo counter="14" :rules="phone_rules" v-mask="['(##)#####-####']" v-model="addUserPhone"></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                    <v-text-field label="Endereço" solo counter="100" :rules="adress_rules" v-model="addUserAdress"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn icon @click="addUserFunction()"><v-icon>mdi-check</v-icon></v-btn>
                        <v-btn icon @click="closeAddUser()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Change subscription -->
        <v-dialog v-model="addSubscription" max-width="400" persistent>
            <v-card max-width="500" class="mx-auto rounded-xl">
                <v-card-text>
                    <v-container>
                        <v-row class="start-text">
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-icon>mdi-timetable</v-icon>
                            </v-col>

                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                Data de expiração: <strong>{{ addSubscriptionExpireFormat }}</strong>
                            </v-col>
                            
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                                Adicionar meses de associação ao usuário de nome <strong>{{ addSubscriptionUserName }}</strong> e CPF <strong>{{ addSubscriptionUserCpf }}</strong>:
                            </v-col>

                            <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" align="center"></v-col>

                            <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" align="center">
                                <v-form>
                                    <v-autocomplete label="Meses" v-model="addSubscriptionMonths" :items="months"></v-autocomplete>
                                </v-form>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn icon @click="add()"><v-icon>mdi-check</v-icon></v-btn>
                        <v-btn icon @click="closeAdd()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- View Info -->
        <v-dialog v-model="viewInfo" max-width="450" persistent>
            <v-card max-width="450" class="mx-auto rounded-xl">
                <v-card-text>
                    <v-container>
                        <v-row class="start-text">
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" align="center">
                                <v-icon>mdi-information-outline</v-icon>
                            </v-col>
                            
                            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                                <p>Nome: <strong> {{ info.name }} </strong></p>
                                <p>CPF: <strong> {{ info.cpf }} </strong></p>
                                <p>Email: <strong> {{ info.email }} </strong></p>
                                <p>Contato: <strong> {{ info.phone }} </strong></p>
                                <p>Endereço: <strong> {{ info.address }} </strong></p>
                                <p>Código Público: <strong> {{ info.publicVerificationKey }} </strong></p>
                                <p>Código Privado: <strong> {{ info._id }} </strong></p>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn icon @click="closeInfo()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row>
            
            <v-col cols="12" xs="12" sm="12" md="12">
                <v-card max-width="700" class="mx-auto rounded-xl">
                    <v-toolbar dark color="#F6AD3A">
                        <v-icon>mdi-account-check</v-icon>

                        <v-toolbar-title class="headline space-text">Gerenciar Associações</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>

                        <v-data-table :headers="headers" :items="users" :footer-props="footerProps">

                            <!-- Actions -->
                            <template v-slot:[`item.actions`]="{ item }">

                                <!-- Delete associate -->
                                <v-tooltip bottom>
                                    <template #activator="{ on: tooltip }">
                                        <v-btn icon v-on="{ ...tooltip}" color="amber accent-4" class="icons-separator mr-2" @click="openRemove(item)">
                                            <v-icon>mdi-account-remove-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Remover Associado</span>
                                </v-tooltip>
                                
                                <!-- Info -->
                                <v-tooltip bottom>
                                    <template #activator="{ on: tooltip }">
                                        <v-btn icon v-on="{ ...tooltip}" color="amber accent-4" class="icons-separator mr-2" @click="openInfo(item)">
                                            <v-icon>mdi-information-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Informações</span>
                                </v-tooltip>

                                <!-- Update Subscription -->
                                <v-tooltip bottom>
                                    <template #activator="{ on: tooltip }">
                                        <v-btn icon v-on="{ ...tooltip}" color="amber accent-4" class="icons-separator mr-2" @click="oepnAdd(item)">
                                            <v-icon>mdi-update</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Atualizar Associação</span>
                                </v-tooltip>

                            </template>

                            <!-- Empty -->
                            <template slot="no-data">
                                <div>Nao há associados cadastrados!</div>
                            </template>

                        </v-data-table>

                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <!-- Add Admin -->
                        <!-- <v-tooltip bottom>
                            <template #activator="{ on: tooltip }">
                                <v-btn icon v-on="{ ...tooltip }" color="blue-grey lighten-2" class="icons-separator" @click="openAddAdmin()">
                                    <v-icon large>mdi-account-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>
                                Adicionar Administrador
                            </span>
                        </v-tooltip> -->

                        <!-- Add Associate -->
                        <v-tooltip bottom>
                            <template #activator="{ on: tooltip }">
                                <v-btn icon v-on="{ ...tooltip }" color="blue-grey lighten-2" class="icons-separator" @click="openAddUser()">
                                    <v-icon large>mdi-account-plus-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>
                                Adicionar Usuário (Associado)
                            </span>
                        </v-tooltip>

                        <!-- Logout -->
                        <v-tooltip bottom>
                            <template #activator="{ on: tooltip }">
                                <v-btn icon v-on="{ ...tooltip }" color="blue-grey lighten-2" @click="openLogout()" class="icons-separator">
                                    <v-icon large>mdi-close</v-icon>
                                </v-btn>
                            </template>
                            <span>
                                Sair (Logout)
                            </span>
                        </v-tooltip>

                    </v-card-actions>
                </v-card>
            </v-col>

        </v-row>

        <v-alert ref="Alert"></v-alert>
    </v-container>
</template>

<script>
import router from '../../router/index'
import admin from '../../services/admin'
import Alert from '../../components/Alert'
import script from '../../common/validation.js'
import properties from '../../config/properties.json'
import { clearAuthToken, getAuthToken } from '../../services/auth'

//getAuthToken, getTokenExpirationDate

export default {

    components: {
        'v-alert': Alert,
    },

    data(){
        return{

            loading: false,

            logout: false,

            /* Add Admin */
            addAdmin: false,
            addAdminName: '',
            addAdminEmail: '',
            addAdminPwd: '',
            addAdminPwdRepeat: '',
            /* --------- */

            /* Add User */
            addUser: false,
            addUserName: '',
            addUserEmail: '',
            addUserPhone: '',
            addUserCpf: '',
            addUserAdress: '',
            addUserAccessionDate: '',
            addUserexpirationDate: '',
            /* -------- */

            /* Remove User */
            removeUser: false,
            removeUserName: '',
            removeUserCpf: '',
            removeUserid: '',
            /* ----------- */

            /* Add User Subscription Time */
            addSubscription: false,
            addSubscriptionExpire: '',
            addSubscriptionExpireFormat: '',
            addSubscriptionMonths: '',
            addSubscriptionUserName: '',
            addSubscriptionUserCpf: '',
            addSubscriptionUserId: '',
            months: ['1','2','3','4','5','6','7','8','9','10','11','12'],
            /* ----------- */

            users: [],

            headers: [
                {text: 'Nome', value: 'name', align: 'start', sortable: true },
                {text: 'Email', value: 'email', align: 'start', sortable: true },
                {text: 'Funcionalidades', value: 'actions'}
            ],

            /* View Info */
            viewInfo: false,
            info: {
                createdAt: '',
                _id: '',
                name: '',
                email: '',
                phone: '',
                address: '',
                cpf: '',
                accessionDate: '',
                expirationDate: '',
                publicVerificationKey: '',
            },
            /* ----------- */

            /* Data Table: Footer Props */
            footerProps: {
                'items-per-page-text': 'Usuários / Página',
                'items-per-page-options': [5, 10, 15, 20, 25, 50, 100],
            },
            /* ------------------------ */

            name_rules: [
                v => !!v || 'Nome:  Campo Obrigatório!',
                v => (v && v.length <= 50) || 'Tamanho máximo - 50 caracteres!',
            ],

            email_rules: [
                v => !!v || 'Email:  Campo Obrigatório!',
                v => (v && v.length <= 50) || 'Tamanho máximo - 50 caracteres!',
                v => /.+@.+\..+/.test(v) || 'Formato inválido!',
            ],
    
            password_rules: [ 
                v => !!v || 'Senha: Campo Obrigatório!',
                v => (v && v.length <= 15) || 'Tamanho máximo - 15 caracteres!',
            ],

            adress_rules: [
                v => !!v || 'Endereço: Campo Obrigatório!',
                v => (v && v.length <= 100) || 'Tamanho máximo - 100 caracteres!',
            ],

            phone_rules: [
                v => !!v || 'Contato: Campo Obrigatório!',
                v => (v && v.length == 14) || 'Formato inválido!',
            ],

            cpf_rules: [
                v => !!v || 'CPF: Campo Obrigatório!',
                v => (v && v.length <= 14) || 'Tamanho máximo: 14 caracteres!',
                v => (v && script.cpfValidation(v.replace(/[()-.]|\//g, ''))) || 'CPF inválido: digite um CPF válido!',
            ],

        }
    },

    watch: {
        addAdmin(value){
            if(value == false) this.$refs.addAdminForm.reset()
        },

        addUser(value){
            if(value == false) this.$refs.addUserForm.reset()
        },
    },

    created(){

        if(!getAuthToken()){
            this.clearToken()
        }

        this.getUsers()
    },

    methods: {

        showMsg: function (text, color, timeout = 3000) {  this.$refs.Alert.showMsg(text, color, timeout); },

        getUsers(){

            this.users = []

            this.loading = true

            admin.list('/client').then((response) => {
                let userList = response.data

                userList.forEach((u) => {
                    let user = {
                        createdAt: u.createdAt,
                        _id: u._id,
                        name: u.name,
                        email: u.email,
                        phone: u.phone,
                        address: u.address,
                        cpf: u.cpf,
                        accessionDate: u.accessionDate,
                        expirationDate: u.expirationDate,
                        publicVerificationKey: u.publicVerificationKey
                    }

                    this.users.push(user)
                })
            }).catch((error) => {

                console.log(error)
                this.showMsg(properties.ERROR.MESSAGES.USERS_GET, properties.ERROR.TYPES.ERROR, properties.ALERT_TIMEOUT)
            
            }).finally(() => {

                this.loading = false
            })
        },

        clearToken(){
            clearAuthToken()
            router.push({ name: 'index' })
            this.$router.go()
        },

        openLogout(){
            this.logout = true;
        },

        closeLogout(){
            this.logout = false;
        },

        setLogout(){
            this.closeLogout()
        },

        print(item){
            console.log(item)
        },

        openRemove(item){
            this.removeUserid = item._id;
            this.removeUserName = item.name;
            this.removeUserCpf = item.cpf;
            this.removeUser = true;
        },

        closeRemove(){
            this.removeUserid = '';
            this.removeUserName = '';
            this.removeUserCpf = '';
            this.removeUser = false;
        },

        remove(){

            this.loading = true;
            let success = false;

            admin.remove_user('client',this.removeUserid).then(() => {

                this.showMsg(properties.ERROR.MESSAGES.USER_REMOVE_SUCCESS, properties.ERROR.TYPES.SUCCESS, properties.ALERT_TIMEOUT)
                success = true;
                this.closeRemove()

            }).catch((error) => {

                console.log(error)
                this.showMsg(properties.ERROR.MESSAGES.USER_REMOVE, properties.ERROR.TYPES.ERROR, properties.ALERT_TIMEOUT)

            }).finally(() => {

                this.loading = false;
                if(success) this.getUsers();

            })

        },

        format(d){
            d = String(d);
            return `${d.substring(8,10)}/${d.substring(5,7)}/${d.substring(0,4)}`
        },

        format_cpf(cpf){
            cpf = String(cpf)
            return `${cpf.substring(0,3)}.${cpf.substring(3,6)}.${cpf.substring(6,9)}-${cpf.substring(9,11)}`
        },

        oepnAdd(item){
            this.addSubscriptionMonths = '';
            this.addSubscriptionExpire = item.expirationDate;
            this.addSubscriptionExpireFormat = this.format(this.addSubscriptionExpire)
            this.addSubscriptionUserName = item.name;
            this.addSubscriptionUserCpf = this.format_cpf(item.cpf);
            this.addSubscriptionUserId = item._id;
            this.addSubscription = true;
        },

        closeAdd(){
            this.addSubscription = false;
        },

        add(){

            this.loading = true;
            let success = false;

            let d = new Date(String(this.addSubscriptionExpire));
            let months = Number(this.addSubscriptionMonths);
            d = d.setMonth(d.getMonth() + months);

            let object = { expirationDate: d}


            admin.change_subscription('client',this.addSubscriptionUserId, object).then(() => {

                this.showMsg(properties.ERROR.MESSAGES.SUBSCRIPTION_SUCCESS, properties.ERROR.TYPES.SUCCESS, properties.ALERT_TIMEOUT)
                success = true;
                this.closeAdd()

            }).catch((error) => {

                console.log(error)
                this.showMsg(properties.ERROR.MESSAGES.SUBSCRIPTION_FAILED, properties.ERROR.TYPES.ERROR, properties.ALERT_TIMEOUT)
                this.closeAdd()

            }).finally(() => {

                this.loading = false;
                if(success) this.getUsers();

            })

        },

        openInfo(item){

            this.info =  {
                createdAt : item.createdAt,
                _id : item._id,
                name : item.name,
                email : item.email,
                phone: item.phone,
                address: item.address,
                cpf: this.format_cpf(item.cpf),
                accessionDate: item.accessionDate,
                expirationDate: item.expirationDate,
                publicVerificationKey: item.publicVerificationKey,
            }

            this.viewInfo = true;
        },

        closeInfo(){

            this.info =  {
                createdAt : '',
                _id : '',
                name : '',
                email : '',
                phone : '',
                address : '',
                cpf : '',
                accessionDate : '',
                expirationDate : '',
                publicVerificationKey : '',
            }

            this.viewInfo = false;
        },

        // openAddAdmin(){
        //     this.addAdmin = true;
        // },

        // closeAddAdmin(){
        //     this.addAdmin = false;
        //     this.addAdminName = '';
        //     this.addAdminEmail = '';
        //     this.addAdminPwd = '';
        //     this.addAdminPwdRepeat = '';
        // },

        openAddUser(){
            this.addUser = true;
        },

        closeAddUser(){
            this.addUser = false;
        },

        addUserFunction(){

            if(this.$refs.addUserForm.validate()){

                let nowDate = new Date();
                let oneMonthDate = new Date();
                oneMonthDate.setMonth(oneMonthDate.getMonth() + 1)
                
                let object = {
                    name: this.addUserName,
                    email: this.addUserEmail,
                    phone: String(this.addUserPhone).replace(/[()-.]|\//g, ''),
                    cpf: String(this.addUserCpf).replace(/[()-.]|\//g, ''),
                    address: this.addUserAdress,
                    accessionDate: nowDate.toISOString(),
                    expirationDate: oneMonthDate.toISOString()
                }

                this.loading = true;

                admin.add_associate('client', object).then(() => {

                    this.showMsg(properties.ERROR.MESSAGES.USER_CREATE_SUCCESS, properties.ERROR.TYPES.SUCCESS, properties.ALERT_TIMEOUT);
                    this.closeAddUser();
                    this.getUsers();

                }).catch((error) => {

                    console.log(error);
                    this.showMsg(properties.ERROR.MESSAGES.USER_CREATE_FAILED, properties.ERROR.TYPES.ERROR, properties.ALERT_TIMEOUT);
                    this.closeAddUser();

                }).finally(() => {

                    this.loading = false;

                })

            }
        },

    },
    
}
</script>

<style scoped>

.icons-separator{
    margin-left: 5px;
    margin-right: 5px;
}

.start-text{
    text-align: start;
}

.center-text{
    margin-left: auto;
    margin-right: auto;
}

</style>