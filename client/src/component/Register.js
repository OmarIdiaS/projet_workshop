import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      nom: '',
      prenom: '',
      domaine: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      domaine: this.state.domaine,
      password: this.state.password
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
      console.log("nom : " + this.state.nom)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  placeholder="Saisir votre nom"
                  value={this.state.nom}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="prenom"
                  placeholder="Saisir votre prénom"
                  value={this.state.prenom}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Domaine</label>
                <input
                  type="text"
                  className="form-control"
                  name="domaine"
                  placeholder="Votre domaine"
                  value={this.state.domaine}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register