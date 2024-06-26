import { createMemoryHistory, createRouter } from 'vue-router'

import MedecinView from '../components/Medecin/Medecin.vue'
import PatientView from '../components/Patient/GestionPatient.vue'
import CreneauxView from '../components/Creneaux/Creneaux.vue'

const routes = [
  { path: '/'},
  { path: '/patient', component: PatientView },
  { path: '/medecin', component: MedecinView },
  { path: '/creneaux', component: CreneauxView }

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router