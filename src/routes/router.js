import { createMemoryHistory, createRouter } from 'vue-router'

import MedecinView from '../components/Medecin/Medecin.vue'
import PatientView from '../components/Patient/GestionPatient.vue'
import CreneauxView from '../components/Creneaux/Creneaux.vue'
import RendezVousView from '../components/RendezVous/RendezVous.vue'
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'

const routes = [
  { path:'/', component: Register},
  { path:'/register', component: Register},
  { path: '/login', component: Login},
  { path: '/patient', component: PatientView },
  { path: '/medecin', component: MedecinView },
  { path: '/creneaux', component: CreneauxView },
  { path: '/rendezVous', component: RendezVousView}

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router