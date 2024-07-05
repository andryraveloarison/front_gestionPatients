<script>

import { authService } from "../../service/auth.service";

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
                console.log("*************")
                alert(data.token)
                localStorage.setItem('token', data.token);
                
                const parts = data.token.split('.');

                // Décoded le payload (la deuxième partie du token)
                const decodedPayload = atob(parts[1]);

                // Convertit le payload décodé en objet JSON
                const payload = JSON.parse(decodedPayload);

                console.log(payload.sub)
                console.log("*************")

                this.initaliseForm()
              })
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