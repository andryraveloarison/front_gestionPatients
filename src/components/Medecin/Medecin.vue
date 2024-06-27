
<script>
  import { formatDate } from '../../_utils/formatDate';
  import { medecinService } from '../../service/medecin.service';
  import './GestionMedecin.css'; // Ajustez le chemin selon l'emplacement de votre fichier CSS
  
  
  export default {
    name: 'Medecin',
    data () {
      return {
        buttonText: 'Ajouter',
        result: {},
        medecin:{
                   nom: '',
                   prenom: '',
                   titre: '',
        }
      }
    },
    
    created() { 
        this.MedecinLoad();
    },
    mounted() {
          console.log("mounted() called.......");
    },
    computed: {
      sortedMedecins() {
        return Array.isArray(this.result)? this.result.sort((a, b) => a.id - b.id) : [];
      },
    },
  
  
    methods: {
            formatDate,
            MedecinLoad()
            {
                  medecinService.loadData()
                    .then(
                        ({data})=>{
                          this.result = data;
                        }
                    );
            },
              
            save()
            {
              this.medecin.id == '' ? this.saveData() : this.updateData();
            },
  
  
            saveData()
            {
              medecinService.saveData(this.medecin)
              .then( ({data})=>{
                  this.result.push(data)
                  this.initaliseForm()
                }
              )
  
            },
  
            edit(medecin)
            {
              this.buttonText = "editer"
              this.medecin = medecin;
            },
  
  
            updateData()
            {
                medecinService.updateData(this.medecin)
                .then(
                  ({data})=>{
                    this.initaliseForm()
                    this.buttonText = "ajouter"
                    this.MedecinLoad();
                  }
                );
  
            },
  
            remove(medecin){
                medecinService.deleteData(medecin.id);
                alert("Supprimer?");
                this.result = this.result.filter(item => item.id !== medecin.id);
              },
  
              initaliseForm(){
                    this.medecin.nom = '';
                    this.medecin.prenom = '',
                    this.medecin.titre = ''
              }
      }
  }
  </script>
  
  <template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h3 class="text-center text-dark mt-3 mb-3">Medecins</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 card">
                <div class="card-body ">
                    <form @submit.prevent="save" class="form">
                    <div class="form-group">
                        <input type="text" v-model="medecin.nom" class="form-control" placeholder="Nom">
                     
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="medecin.prenom" class="form-control" placeholder="Prenom">
                    </div>
                    <div class="form-group">
                       <input type="text" v-model="medecin.titre" class="form-control"  placeholder="Titre">
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
                        <th scope="col" class="text-center">Prenom</th>
                        <th scope="col" class="text-center">Titre</th>
                        <th scope="col" class="text-center">action</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr v-for="medecin in sortedMedecins" v-bind:key="medecin.id">
                            <td class="text-center">{{ medecin.nom }}</td>
                            <td class="text-center">{{ medecin.prenom }}</td>
                            <td class="text-center">{{ medecin.titre }}</td>
                            <td>
                              <div class="d-flex justify-content-center gap-2">
                                <button type="button" class="btn btn-success mr-2" @click="edit(medecin)">Edit</button>
                                <button type="button" class="btn btn-danger ml-2"  @click="remove(medecin)">Delete</button>
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
    @import './GestionMedecin.css';
  </style>