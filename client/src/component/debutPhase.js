import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'


class debutPhase extends Component {
   

    handleChange(e){
        this.props.history.push(`/welcome`)
      }
    render() {
       

          return (
              <>
              <div>Bonjour nous vous invitons à répondre sur quelques questions </div>
              <button href="/quiz"><Link to="/quiz">Commencons !!</Link> </button>
              </>
          )
      }
    }
      
      export default debutPhase