<script>

import { authService } from "../../service/auth.service";
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  data () {
    return {
      buttonText: 'Ajouter',
      result: {},
      user:{
                 username: '',
                 password: '',
      }
    }
  },
  

  mounted() {
        console.log("mounted() called.......");
  },



  methods: {
 
          login() {
           
                authService.login(this.user)
                .then( ({data})=>{
                  if(data.token){
                    
                    localStorage.setItem('token', data.token);
                    
                    const parts = data.token.split('.');

                    // Décoded le payload (la deuxième partie du token)
                    const decodedPayload = atob(parts[1]);

                    // Convertit le payload décodé en objet JSON
                    const payload = JSON.parse(decodedPayload);

                    const role = payload.sub.split(",")[1]
                    const router = this.$router; // Utilisez $router ici
                    
                    alert("Connexion reussi!");

                    if(role == 'ROLE_PATIENT'){
                      router.push('/patient'); // Remplacez '/login' par le chemin de votre page de connexion
                    }

                    if(role == 'ROLE_MEDECIN'){
                      router.push('/medecin'); // Remplacez '/login' par le chemin de votre page de connexion
                    }

                    if(role == 'ROLE_ADMIN'){
                      router.push('/rendezVous'); // Remplacez '/login' par le chemin de votre page de connexion
                    }

                    this.initaliseForm()

                  }else {
                    alert("Erreur lors de la connexion")
                  }

              }).catch((error) => {
                alert("Mauvais utilisateur ou mot de passe");
                console.error(error); // Ajoutez également un journal pour le débogage
              });
          },

            initaliseForm(){
                  this.user.username = '',
                  this.user.password = ''
            }
    }
}
</script>

<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-10">
              <h3 class="text-center text-dark mt-3 mb-3">CONNEXION</h3>
          </div>
      </div>
      <div class="row">
              <div class="card-body card">
                  <form @submit.prevent="login" class="form">
                  <div class="form-group">
                      <input type="text" v-model="user.username" class="form-control" placeholder="nom">                 
                  </div>
                  <div class="form-group">
                      <input type="password" v-model="user.password" class="form-control" placeholder="mot de passe">                 
                  </div>

                  <button type="submit" class="btn btn-primary mt-2">Se connecter</button>
                  </form>
              </div>
            
      </div>
  </div>    
</template>

<style>
  @import './Login.css';
</style>