import { createMemoryHistory, createRouter } from 'vue-router'

import MedecinView from '../components/Medecin/Medecin.vue'
import PatientView from '../components/Patient/GestionPatient.vue'

const routes = [
  { path: '/'},
  { path: '/patient', component: PatientView },
  { path: '/medecin', component: MedecinView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router