import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {infouser} from './UserInfoFunctions'
import axios from 'axios'


class Listeinfo extends Component {

    constructor() {
        super()
        this.state = {
          idUser: '',
          facile: '',
          difficile: '',
          moyen : '',
          correct: '',
          incorrect: '',
          domaine:'',
          errors: {},
          info : []

        }
      }

      
    componentDidMount() {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      this.setState({
        nom: decoded.nom,
        prenom: decoded.prenom,
        domaine: decoded.domaine
        
      })
    }

      componentDidMount(){
        axios.get('http://localhost:5000/usersinfo/listinfo')
        .then(res => {
          const dataFacile = res.data;
          console.log("datafacile ;......" + JSON.stringify(dataFacile));
              this.setState({info : dataFacile});  })

          
      }
     



    
    render() {
          return (
              <div>
                
          <table class="table">
  <thead class="thead-dark">
    <tr>
      
      <th scope="col">Nom</th>
      <th scope="col">Correct</th>
      <th scope="col">Incorrect</th>
      <th scope="col">Facile</th>
      <th scope="col">Moyen</th>
      <th scope="col">Difficile</th>
      <th scope="col">Temps</th>
      <th scope="col">Domaine</th>
      <th scope="col">Retour</th>
    </tr>
  </thead>
  
  <tbody>


  {this.state.info.map(dataFacile => <tr>
    <th>{dataFacile.idUser}</th>
  <th>{dataFacile.correct}</th>
  <th>{dataFacile.incorrect}</th>
  <th>{dataFacile.varFacile}</th>
  <th>{dataFacile.varMoyen}</th>
  <th>{dataFacile.varDifficile}</th>
  <th>{dataFacile.temps}</th>
  <th>{dataFacile.domaine}</th>
  <th>{dataFacile.varRetour}</th>
  
  </tr>)}
    
  </tbody>
</table>
          </div>
          
      )}
          }
export default Listeinfo