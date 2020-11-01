import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {questionsDemande} from './UserInfoFunctions'

class QuestionsRH extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
          nbQuestions: '',
          question:'',
          rep1:'',
          rep2 : '',
          rep3: '',
          numCorrect : ''
          
        };
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    

      handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        console.log("ouiiii"); 
      }
      handleSubmit(event) {
        
        event.preventDefault();
        const newUser = {
          question: this.state.question,
          rep1: this.state.rep1,
          rep2: this.state.rep2,
          rep3: this.state.rep3,
          numCorrect: this.state.numCorrect
        }
    
        questionsDemande(newUser).then(res => {
          this.props.history.push(`/login`)
          console.log("nom : " + this.state.nom)
        })
      }
   

      render() {
        var questions = []
        
        for(var i = 0; i< 5; i++){
            questions.push(
                <div>
            <label>
                <div className="label">{i}</div> 
                <input 
                  type='text' 
                   
                   />
            </label>
        </div>
            );
        }
        return (
          
          <>
            <form onSubmit={this.handleSubmit}>
              <br/><br/><br/>
            <input 
                  type='text' 
                  name="question"
                  placeholder="Question"
                  value={this.state.question}
                  onChange={this.handleChange}
                   /><br />
                   <input 
                  type='text' 
                  name="rep1"
                  placeholder="première réponse"
                  value={this.state.rep1}
                  onChange={this.handleChange}
                   /><br />
                   <input 
                  type='text' 
                  name="rep2"
                  placeholder="deuxième réponse"
                  value={this.state.rep2}
                  onChange={this.handleChange}
                   /><br />
                   <input 
                  type='text'
                  name="rep3" 
                  placeholder="troisième réponse"
                  value={this.state.rep3}
                  onChange={this.handleChange}
                   /><br />
                   <input 
                  type='text' 
                  name="numCorrect"
                  placeholder="Réponse correcte"
                  value={this.state.numCorrect}
                  onChange={this.handleChange}
                   /><br />
                   <br />
            <input type="submit"  value="Valider" />
            </form>
        
            <div className = 'inputs'>
            <div>
            
        </div>
          </div>
          
          </>
          
        )
      }
    }
    
    export default QuestionsRH