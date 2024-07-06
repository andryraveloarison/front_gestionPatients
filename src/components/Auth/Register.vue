<script>

import { authService } from "../../service/auth.service";
import { useRouter } from 'vue-router';


export default {
  name: 'Register',
  data () {
    return {
      buttonText: 'Ajouter',
      result: {},
      user:{
                 username: '',
                 password: '',
                 role:''
      }
    }
  },
  

  mounted() {
        console.log("mounted() called.......");
  },



  methods: {

          register() {
            authService.register(this.user)
            .then( ({data})=>{
                if(data){
                  const router = useRouter();
                  alert('Inscrition reussi')
                  router.push('/login'); // Remplacez '/login' par le chemin de votre page de connexion
                  this.initaliseForm()
                }
              
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
              <h3 class="text-center text-dark mt-3 mb-3">INSCRIPTION</h3>
          </div>
      </div>
      <div class="row">
              <div class="card-body card">
                  <form @submit.prevent="register" class="form">
                  <div class="form-group">
                      <input type="text" v-model="user.username" class="form-control" placeholder="nom">                 
                  </div>
                  <div class="form-group">
                      <input type="password" v-model="user.password" class="form-control" placeholder="mot de passe">                 
                  </div>

                  <div class="form-group">
                    <select v-model="user.role" class="form-control" id="genre" >
                      <option value="">Role</option>
                      <option value="ROLE_PATIENT">Patient</option>
                      <option value="ROLE_MEDECIN">Medecin</option>
                      <option value="ROLE_ADMIN">Admin</option>
                    </select>
                  </div> 

                  <button type="submit" class="btn btn-primary mt-2">Se connecter</button>
                  </form>
              </div>
            
      </div>
  </div>    
</template>

<style>
  @import './Register.css';
</style>