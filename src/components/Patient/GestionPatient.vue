<template>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-10">
              <h3 class="text-center text-dark mt-3 mb-3">Patients</h3>
          </div>
      </div>
      <div class="row">
          <div class="col-md-4">
              <div class="card-body">
                  <form @submit.prevent="save">
                  <div class="form-group">
                      <label>Nom</label>
                      <input type="text" v-model="patient.nom" class="form-control" >
                   
                  </div>
                  <div class="form-group">
                      <label>email</label>
                      <input type="email" v-model="patient.email" class="form-control"  >
                  </div>
                  <div class="form-group">
                      <label>Date de naissance</label>
                      <input type="date" v-model="patient.dateDeNaissance" class="form-control" >
                  </div>
                  <div class="form-group">
                      <label>age</label>
                      <input type="number" v-model="patient.age" class="form-control"  >
                  </div>
                  <div class="form-group">
                    <label for="genre">Genre</label>
                    <select v-model="patient.genre" class="form-control" id="genre">
                      <option value="">Sélectionnez...</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                    </select>
                  </div>  
                  <button type="submit" class="btn btn-primary mt-2">{{buttonText}}</button>
                  </form>
              </div>
          </div>
          <div class="col-md-8">
                  <table class="table table-dark">
                  <thead>
                      <tr>
                      <th scope="col" class="text-center">Nom</th>
                      <th scope="col" class="text-center">Date de naissance</th>
                      <th scope="col" class="text-center">age</th>
                      <th scope="col" class="text-center">Genre</th>
                      <th scope="col" class="text-center">email</th>
                      <th scope="col" class="text-center">action</th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr v-for="patient in sortedPatients" v-bind:key="patient.id">

                          <td class="text-center">{{ patient.nom }}</td>
                          <td class="text-center">{{ formatDate(patient.dateDeNaissance) }}</td>
                          <td class="text-center">{{ patient.age }}</td>
                          <td class="text-center">{{ patient.genre }}</td>
                          <td class="text-center">{{ patient.email }}</td>
                          <td>
                            <div class="d-flex justify-content-center gap-2">
                              <button type="button" class="btn btn-warning mr-2" @click="edit(patient)">Edit</button>
                              <button type="button" class="btn btn-danger ml-2"  @click="remove(patient)">Delete</button>
                            </div>
                          </td>
                          </tr>
                       
                  </tbody>
                  </table>
          </div>
      </div>
  </div>    
</template>
<script>
import { formatDate } from '../../_utils/formatDate';
import { patientService } from '../../service/patient.service';
import './GestionPatient.css'; // Ajustez le chemin selon l'emplacement de votre fichier CSS


export default {
  name: 'Patient',
  data () {
    return {
      buttonText: 'Ajouter',
      result: {},
      patient:{
                 id: '',
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
                  this.genre = '',
                  this.dateDeNaissance = ''
            }
    }
}
</script>