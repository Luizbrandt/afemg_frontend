import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PrintId from '../views/PrintId.vue'
import ChangePassword from '../views/ChangePassword.vue'
import ManageAccounts from '../views/ManageAccounts.vue'
import CheckAssociate from '../views/CheckAssociate.vue'
import ID from '../generator/ID'
import LoggeddIn from '../views/auth/LoggedIn.vue'

//LoggedIn
//import { isLoggedIn } from '../services/auth'


Vue.use(VueRouter)

const routes = [
  
  { path: '/', name: 'index', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/print-id', name: 'print-id', component: PrintId },
  { path: '/change-password', name: 'change-password', component: ChangePassword },
  { path: '/manage-accounts',  name: 'manage-accounts', component: ManageAccounts, },
  { path: '/index', name: 'logged-in', component: LoggeddIn},
  { path: '/check-associate', name: 'check-associate', component: CheckAssociate },
  { path: '/printed-id', name: 'printed-id', component: ID, props: true },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
