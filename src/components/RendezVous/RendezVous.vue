
<script>
  import { formatDate } from '../../_utils/formatDate';
  import { rvService } from '../../service/rv.service';
  import { medecinService } from '../../service/medecin.service';
  import { patientService } from '../../service/patient.service';

  
  export default {
    name: 'rendezVous',
    data () {
      return {
        buttonText: 'Ajouter',
        result: {},
        resultMedecin:{},
        resultPatient:{},
        rendezVous:{
                   id: '',
                   start: '',
                   end: '',
                   date:'',
                   id_medecin:'',
                   id_patient:'',
                   nom_patient:'',
                   nom_medecin:'',
                   id_creneaux:''

        },
        medecin:{
                   id: '',
                   nom: '',
                   prenom: '',
        },
        patient: {
                  id: '',
                   nom: '',
                   prenom: '',
        }

      }
    },
    
    created() { 
        this.RendezVousLoad();
        this.MedecinLoad();
        this.PatientLoad();
    },

    mounted() {
          console.log("mounted() called.......");
    },

    computed: {
      sortedRv() {
        return Array.isArray(this.result)? this.result.sort((a, b) => a.id - b.id) : [];
      },

      sortedMedecin() {
        return Array.isArray(this.resultMedecin)? this.resultMedecin.sort((a, b) => a.id - b.id) : [];
      },

      sortedPatient() {
        return Array.isArray(this.resultPatient)? this.resultPatient.sort((a, b) => a.id - b.id) : [];
      },
    },
  
  
    methods: {
            formatDate,
            RendezVousLoad()
            {
                 rvService.loadData()
                    .then(
                        ({data})=>{
                          this.result = data;
                        }
                    );
            },

            MedecinLoad()
            {
                  medecinService.loadData()
                    .then(
                        ({data})=>{
                          this.resultMedecin = data;
                        }
                    );
            },

            PatientLoad()
            {
                  patientService.loadData()
                    .then(
                        ({data})=>{
                          this.resultPatient = data;
                        }
                    );
            },
              
            save()
            {
              this.rendezVous.id == '' ? this.saveData() : this.updateData();
            },
  
  
            saveData()
            {

              let rvRequest={		
                      "start":this.rendezVous.start,
                      "end":this.rendezVous.end,
                      "date":this.rendezVous.date,
                      "id_creneaux":this.rendezVous.id_creneaux,
                      "id_patient":this.rendezVous.id_patient
              }
              rvService.saveData(rvRequest)
              .then( ({data})=>{
                  this.RendezVousLoad();
                  this.initaliseForm()
                }
              )
  
            },
  
            edit(rendezVous)
            {
              this.buttonText = "editer"
              this.rendezVous = rendezVous;
            },
  
  
            updateData()
            {
               /* let creneauxRequest={		
                  "id" : this.creneaux.id,
                  "startTime" : this.creneaux.startTime,
                  "endTime" : this.creneaux.endTime,
                  "startPause" : this.creneaux.startPause,
                  "endPause" : this.creneaux.endPause,
                  "id_medecin" : this.medecin.id
              }

              creneauxService.updateData(creneauxRequest)

                .then(
                  ({data})=>{
                    console.log(data)
                    this.initaliseForm()
                    this.buttonText = "ajouter"
                    this.CreneauxLoad();
                  }
                );

                */
  
            },
  
            remove(rendezVous){
                rvService.deleteData(rendezVous.id);
                alert("Supprimer");
                this.result = this.result.filter(item => item.id !== rendezVous.id);
              },
  
              initaliseForm(){
                    /*this.creneaux.startTime = '';
                    this.creneaux.endTime = '',
                    this.creneaux.startPause = '',
                    this.creneaux.endPause = '',
                    this.creneaux.id_medecin = ''*/

              }
      }
  }
  </script>
  
  <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h3 class="text-center text-dark mt-3 mb-3"> Rendez Vous</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 card">
                <div class="card-body ">
                    <form @submit.prevent="save" class="form">

                    <div class="form-group oneForm">
                      <label>Medecin</label>
                      <select v-model="medecin.id" class="form selectBox"  required>
                        <option v-for="medecin in sortedMedecin" v-bind:key="medecin.id" :value="medecin.id">
                          {{ medecin.nom}}
                        </option>
                      </select>
                    </div>  

                    <div class="form-group oneForm">
                      <label>Patient</label>
                      <select v-model="patient.id" class="form selectBox"  required>
                        <option v-for="patient in sortedPatient" v-bind:key="patient.id" :value="patient.id">
                          {{ patient.nom}}
                        </option>
                      </select>
                    </div>

                    <div class="form-group oneForm">
                        <label>Date</label>
                        <input type="date" v-model="rendezVous.date" class="form-control" placeholder="Debut Pause">
                    </div>
                    <div class="form-group oneForm">
                        <label>Debut</label>
                        <input type="time" v-model="rendezVous.start" class="form-control" placeholder="Debut">
                    </div>
                    <div class="form-group oneForm">
                        <label>Fin</label>
                        <input type="time" v-model="rendezVous.end" class="form-control"  placeholder="Fin">
                    </div>
                    
                    <button type="submit" class="btn btn-primary  bouton">{{buttonText}}</button>
                    </form>
                </div>
            </div>
            <div class="col-md-8">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col" class="text-center">Medecin</th>
                        <th scope="col" class="text-center">Patient</th>
                        <th scope="col" class="text-center">Date</th>
                        <th scope="col" class="text-center">Debut</th>
                        <th scope="col" class="text-center">Fin</th>
                        <th scope="col" class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr v-for="rv in sortedRv" v-bind:key="rv.id">
                            <td class="text-center">{{ rv.nomMedecin }}</td>
                            <td class="text-center">{{ rv.nomPatient }}</td>
                            <td class="text-center">{{ formatDate(rv.date) }}</td>
                            <td class="text-center">{{ rv.start }}</td>
                            <td class="text-center">{{ rv.end }}</td>
                            <td>
                              <div class="d-flex justify-content-center gap-2">
                                <button type="button" class="btn btn-success mr-2" @click="edit(rv)">Edit</button>
                                <button type="button" class="btn btn-danger ml-2"  @click="remove(rv)">Delete</button>
                              </div>
                            </td>
                            </tr>
                         
                    </tbody>
                    </table>
            </div>
        </div>
    </div>    
  </template>
  

  <style>
    @import './RendezVous.css';
  </style>