<script>
import { formatDate } from '../../_utils/formatDate';
import { patientService } from '../../service/patient.service';
import './GestionPatient.css'; // Ajustez le chemin selon l'emplacement de votre fichier CSS


export default {
  name: 'Register',
  data () {
    return {
      buttonText: 'Ajouter',
      result: {},
      patient:{
                 nom: '',
                 email: '',
                 age: '',
                 dateDeNaissance:'',
                 genre:''

      }
    }
  },
  
  created() { 
      this.PatientLoad();
  },
  mounted() {
        console.log("mounted() called.......");
  },
  computed: {
    sortedPatients() {
      return Array.isArray(this.result)? this.result.sort((a, b) => a.id - b.id) : [];
    },
  },


  methods: {
          formatDate,
          PatientLoad()
          {
                patientService.loadData()
                  .then(
                      ({data})=>{
                        this.result = data;
                      }
                  );
          },
            
          save()
          {
            this.patient.id == '' ? this.saveData() : this.updateData();
          },


          saveData()
          {
            patientService.saveData(this.patient)
            .then( ({data})=>{
                this.result.push(data)
                this.initaliseForm()
              }
            )

          },

          edit(patient)
          {
            this.buttonText = "editer"
            this.patient = patient;
          },


          updateData()
          {
              patientService.updateData(this.patient)
              .then(
                ({data})=>{
                  this.initaliseForm()
                  this.buttonText = "ajouter"
                  this.PatientLoad();
                }
              );

          },

          remove(patient){
              patientService.deleteData(patient.id);
              alert("Supprimer");
              this.result = this.result.filter(item => item.id !== patient.id);
            },

            initaliseForm(){
                  this.patient.nom = '';
                  this.patient.email = '',
                  this.patient.age = '',
                  this.patient.genre = '',
                  this.patient.dateDeNaissance = ''
            }
    }
}
</script>

<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-10">
              <h3 class="text-center text-dark mt-3 mb-3">REGISTER</h3>
          </div>
      </div>
      <div class="row">
        <div class="col-md-4 card">
              <div class="card-body">
                  <form @submit.prevent="save" class="form">
                  <div class="form-group">
                      <input type="text" v-model="patient.nom" class="form-control" placeholder="nom">
                   
                  </div>
                  <div class="form-group">
                      <input type="email" v-model="patient.email" class="form-control" placeholder="email" >
                  </div>
                  <div class="form-group">
                      <input type="date" v-model="patient.dateDeNaissance" class="form-control" placeholder="Date de naissance" >
                  </div>
                  <div class="form-group">
                      <input type="number" v-model="patient.age" class="form-control" placeholder="age" >
                  </div>
                  <div class="form-group">
                    <select v-model="patient.genre" class="form-control" id="genre" >
                      <option value="">Genre</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                    </select>
                  </div>  
                  <button type="submit" class="btn btn-primary mt-2">{{buttonText}}</button>
                  </form>
              </div>
          </div>
          
      </div>
  </div>    
</template>

<style>
  @import './Register.css';
</style>