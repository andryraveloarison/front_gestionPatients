<script>
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import './style.css'

export default {
  setup() {
    const router = useRouter();
    const hasToken = ref(false);

    const logout = () => {
      // Supprime le token du localStorage
      localStorage.removeItem('token');
      // Redirige vers la page de connexion ou effectue toute autre action nécessaire après la déconnexion
      router.push('/login'); // Remplacez '/login' par le chemin de votre page de connexion
  
    };

    // Vérifie si un token existe dans le localStorage
    hasToken.value = !!localStorage.getItem('token');

    // Réactive la valeur de hasToken lorsque le token change
    watchEffect(() => {
      hasToken.value = !!localStorage.getItem('token');
    });

    return {
      hasToken,
      logout,
    };
  },
};
</script>


<template>
  <h1 class="title">Gestion hospitalière</h1>

  <nav class="navMenu">
    <div>
      <RouterLink to="/login"> Connexion</RouterLink>
      <RouterLink to="/register"> S'inscrire</RouterLink>
      <div v-if="hasToken">
      <button @click="logout">Se déconnecter</button>
    </div>
    </div>
    <div>
      <RouterLink to="/patient"> Patient</RouterLink>
      <RouterLink to="/medecin"> Medecin</RouterLink>
      <RouterLink to="/creneaux"> Creneaux</RouterLink>
      <RouterLink to="/rendezVous"> Rendez vous</RouterLink>
    </div>


    
  </nav>
  
  <main>
    <RouterView />
  </main>
</template>


