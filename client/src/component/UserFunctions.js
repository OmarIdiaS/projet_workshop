import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      nom: newUser.nom,
      prenom: newUser.prenom,
      domaine: newUser.domaine,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
    return axios
      .post('users/login', {
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