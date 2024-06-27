<script>

import './style.css'; // Ajustez le chemin selon l'emplacement de votre fichier CSS
</script>

<template>
  <h1 class="title">Gestion hospitalière</h1>

  <nav>
    <RouterLink to="/patient"> Patient</RouterLink>
    <RouterLink to="/medecin"> Medecin</RouterLink>
    <RouterLink to="/creneaux"> Creneaux</RouterLink>
    <RouterLink to="/rendezVous"> Rendez vous</RouterLink>
  </nav>
  
  <main>
    <RouterView />
  </main>
</template>
