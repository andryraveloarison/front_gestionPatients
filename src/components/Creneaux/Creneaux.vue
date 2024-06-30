
<script>
  import { formatDate } from '../../_utils/formatDate';
  import { creneauxService } from '../../service/creneaux.service';
  import { medecinService } from '../../service/medecin.service';
  
  export default {
    name: 'Creneaux',
    data () {
      return {
        buttonText: 'Ajouter',
        result: {},
        resultMedecin:{},
        creneaux:{
                   id: '',
                   nom: '',
                   startTime: '',
                   endTime: '',
                   startPause:'',
                   endPause:'',
                   id_medecin:''
        },
        medecin:{
                   id: '',
                   nom: '',
                   prenom: '',
        }

      }
    },
    
    created() { 
        this.CreneauxLoad();
        this.MedecinLoad();
    },

    mounted() {
          console.log("mounted() called.......");
    },

    computed: {
      sortedCreneaux() {
        return Array.isArray(this.result)? this.result.sort((a, b) => a.id - b.id) : [];
      },
      sortedMedecin() {
        return Array.isArray(this.resultMedecin)? this.resultMedecin.sort((a, b) => a.id - b.id) : [];
      },
    },
  
  
    methods: {
            formatDate,
            CreneauxLoad()
            {
                  creneauxService.loadData()
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
                          console.log(data)
                        }
                    );
            },
              
            save()
            {
              this.creneaux.id == '' ? this.saveData() : this.updateData();
            },
  
  
            saveData()
            {

              let creneauxRequest={		
                  "startTime":this.creneaux.startTime,
                  "endTime":this.creneaux.endTime,
                  "startPause":this.creneaux.startPause,
                  "endPause":this.creneaux.endPause,
                  "id_medecin":this.medecin.id
              }
              creneauxService.saveData(creneauxRequest)
              .then( ({data})=>{
                  this.CreneauxLoad();
                  this.initaliseForm()
                }
              )
  
            },
  
            edit(creneaux)
            {
              this.buttonText = "editer"
              this.creneaux = creneaux;
            },
  
  
            updateData()
            {
                let creneauxRequest={		
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
  
            },
  
            remove(creneaux){
                creneauxService.deleteData(creneaux.id);
                alert("Supprimer?");
                this.result = this.result.filter(item => item.id !== creneaux.id);
              },
  
              initaliseForm(){
                    this.creneaux.startTime = '';
                    this.creneaux.endTime = '',
                    this.creneaux.startPause = '',
                    this.creneaux.endPause = '',
                    this.creneaux.id_medecin = ''

              }
      }
  }
  </script>
  
  <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h3 class="text-center text-dark mt-3 mb-3">Creneaux des Medecins</h3>
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
                        <label>Debut</label>
                        <input type="time" v-model="creneaux.startTime" class="form-control" placeholder="Debut">
                    </div>
                    <div class="form-group oneForm">
                        <label>Fin</label>
                        <input type="time" v-model="creneaux.endTime" class="form-control"  placeholder="Fin">
                    </div>
                    <div class="form-group oneForm">
                        <label>Debut pause</label>
                        <input type="time" v-model="creneaux.startPause" class="form-control" placeholder="Debut Pause">
                    </div>
                    <div class="form-group oneForm">
                        <label>Fin pause</label>
                        <input type="time" v-model="creneaux.endPause" class="form-control"  placeholder="Fin Pause">
                    </div>
                    <button type="submit" class="btn btn-primary  bouton">{{buttonText}}</button>
                    </form>
                </div>
            </div>
            <div class="col-md-8">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col" class="text-center">Nom</th>
                        <th scope="col" class="text-center">Debut</th>
                        <th scope="col" class="text-center">Fin</th>
                        <th scope="col" class="text-center">Debut Pause</th>
                        <th scope="col" class="text-center">Fin Pause</th>
                        <th scope="col" class="text-center">action</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr v-for="creneaux in sortedCreneaux" v-bind:key="creneaux.id">
                            <td class="text-center">{{ creneaux.nomMedecin }}</td>
                            <td class="text-center">{{ creneaux.startTime }}</td>
                            <td class="text-center">{{ creneaux.endTime }}</td>
                            <td class="text-center">{{ creneaux.startPause }}</td>
                            <td class="text-center">{{ creneaux.endPause }}</td>
                            <td>
                              <div class="d-flex justify-content-center gap-2">
                                <button type="button" class="btn btn-success mr-2" @click="edit(creneaux)">Edit</button>
                                <button type="button" class="btn btn-danger ml-2"  @click="remove(creneaux)">Delete</button>
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
    @import './Creneaux.css';
  </style>