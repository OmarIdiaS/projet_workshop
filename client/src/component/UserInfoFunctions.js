import axios from 'axios'

export const registerInfos = newUserInfos => {
  return axios
    .post('usersinfo/info', {
      idUser: newUserInfos.idUser,
      varFacile: newUserInfos.varFacile,
      varMoyen: newUserInfos.varMoyen,
      varDifficile: newUserInfos.varDifficile,
      temps: newUserInfos.temps,
      correct : newUserInfos.correct,
      incorrect : newUserInfos.incorrect,
      domaine: newUserInfos.domaine,
      varRetour : newUserInfos.varRetour
    })
    .then(response => {
      localStorage.setItem('usertokenInfo', response.data)
      
      return response.data
      console.log("reponse ::::::" + response)
      console.log('Informations enregistrées')
    })
}

export const infoUsers = user => {
  return axios.get('usersinfo/listinfo')
  .then(function(response){
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

export const loginRh = user => {
  return axios
    .post('rh/login', {
      nom: user.nom,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log("reponseeeeee" + JSON.stringify(response.data.domaine))
      return response.data

    })
    .catch(err => {
      console.log(err)
    })
}


export const register = newUser => {
  return axios
    .post('/rh/registerRh', {
      nom: newUser.nom,
      prenom: newUser.prenom,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}


export const questionsUsers = user => {
  return axios.get('/qc/saisirquestions')
  .then(function(response){
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}



export const questionsDemande = user => {
  return axios
    .post('/qc/saisirquestions', {
      question: user.question,
      rep1: user.rep1,
      rep2: user.rep2,
      rep3 : user.rep3, 
      numCorrect: user.numCorrect
    })
    .then(response => {
      
      console.log("reponseeeeee" + JSON.stringify(response.data.domaine))
      return response.data

    })
    .catch(err => {
      console.log(err)
    })
}


