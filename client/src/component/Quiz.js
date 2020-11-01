import React , {Component, useEffect} from "react";
import { exists } from "fs";
import { registerInfos, questionsDemande }  from './UserInfoFunctions'
import { runInThisContext } from "vm";
import jwt_decode from 'jwt-decode'

import axios from 'axios'


class Quiz extends React.Component {

  

  constructor(props) {
    super(props)
    
    var questionsDemander = [{question:"",answers:"",correct:""}]
    var dataSet = [
      {
        question: "",
        answers: [
          "",
          "",
          "",
        ],
        correct: 1,
       
        
      },
    ];

    
    
    this.state = {nom:'',domaine:'',current:0,clk:0, dataSet:dataSet,questionsDemander:questionsDemander, t1 : 0, t2 : 0, nbClick: 0, correct:0, incorrect:0, moyen:0, difficile:0,facile:0,facileVar : 0,moyenneVar : 0, difficileVar : 0,varCurrents: 1}
    this.handleClick = this.handleClick.bind(this)
    this.handleClickFacile = this.handleClickFacile.bind(this)
    this.handleSubmitFacile= this.handleSubmitFacile.bind(this)
    this.handleSubmitMoyen= this.handleSubmitMoyen.bind(this)
    this.handleSubmitDifficile= this.handleSubmitDifficile.bind(this)
    this.handleSubmitCurrent= this.handleSubmitCurrent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)


    
    
  } // end constructor


  
  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      nom: decoded.nom,
      prenom: decoded.prenom,
      domaine: decoded.domaine
      
    })

    axios.get('http://localhost:5000/qc/questionsdemande')
    .then(res => {
      const dataFacile = res.data;
      let x = []
      dataFacile.forEach(elements =>{
        x.push({
          // q difficile 
          question: elements.question,
          answers: [
           elements.rep1,
           elements.rep2,
           elements.rep3,
          ],
          correct: elements.numCorrect,
        })
        
      })
      var copy= []
      this.state.dataSet.forEach(element => {
        copy.push(element)
      })
      x.forEach(element => {
        copy.push(element);  
      })
      
      console.log("copy"+ JSON.stringify(copy))
      this.setState({dataSet:copy})
      this.setState({dataSet: this.state.dataSet.splice(1,9)})
      console.log("dataSet :::::::"+JSON.stringify(this.state.dataSet));
    })

  }

  handleClickFacile(choice){
   
    if (choice == this.state[this.state].facile) {
      this.setState({facile: this.state.facile + 1})
    }
     
  }
  
  handleClick(choice) {
    
    console.log("varrrCLIKKKKK",this.state.clk)
    var currenttimeOne = new Date();
    var currenttimeTwo = new Date();
    let xtemps = 0; let y = 0; 
  if(this.state.current == 0){
    
    console.log("data    minutes" + currenttimeOne.getMinutes() + "secondes" + currenttimeOne.getSeconds() +
    "total" + currenttimeOne.getMinutes() * 60 + currenttimeOne.getSeconds())
    
    console.log("debut : "+ xtemps)
    this.setState({t1 :currenttimeOne.getMinutes() * 60 + currenttimeOne.getSeconds() })
  }
  if(this.state.current >= 2){
    
    console.log("debuuuuuuuuuuuuuuuuuuuuuut   ",xtemps);
    console.log("data   2 eme minutes" + currenttimeTwo.getMinutes() + "secondes" + currenttimeTwo.getSeconds() +
    "total" + currenttimeTwo.getMinutes() * 60 + currenttimeTwo.getSeconds())
    
    console.log("fin : "+ y)
      }
      xtemps = this.state.t1;
      y = currenttimeOne.getMinutes() * 60 + currenttimeOne.getSeconds() - xtemps;
      this.setState({t2: y})

      this.setState({varCurrents: this.state.varCurrents})
    console.log("deuxieme " + this.state.varCurrents && this.state.varCurrents[0])
    if (choice == this.state.dataSet[this.state.current].correct) {
      this.setState({correct: this.state.correct + 1})
      

      
    } else {
      this.setState({incorrect: this.state.incorrect + 1})
    }
    
    if (this.state.current >= 1) {
      
    } 
  }
  handleSubmitFacile(e){
    this.setState(prevState=>{clk: this.state.clk + 1})
    this.setState({facileVar :this.state.facileVar + 1});
    console.log("clickFaaciile:::"+this.state.clk)
    
    this.setState({current: this.state.current + 1}) 
    console.log(this.state.facileVar)
    
    
    // fin des questions 
    if ((this.state.clk) == 4) {
      this.setState({current: 0})
     
    }
  }
  
  
  handleSubmitMoyen(e){
    this.setState({clk: this.state.clk + 1})
    this.setState({moyenneVar :this.state.moyenneVar+ 1});
    this.setState({current: this.state.current + 4})
    console.log("clickMoyeen:::"+this.state.clk)
    if ((this.state.clk) == 4) {
      
      this.setState({current: 0})
      
    } 

  }

  
  handleSubmitDifficile(e){
    this.setState({clk: this.state.clk + 1})
    this.setState({difficileVar :this.state.difficileVar+ 1});
    this.setState({current: this.state.current + 4}) 
    console.log(this.state.difficileVar)
    console.log("clickDifficile:::"+this.state.clk)

    console.log("current : " + this.state.current)
    console.log("taaaaaaaap :: "+ (this.state.difficileVar + this.state.facileVar + this.state.moyenneVar));
    
    if ((this.state.clk) == 4) {
      
      this.setState({current: 0})
      
    }

    

  }
  handleSubmitCurrent(e){
    this.setState({current: this.state.current - 1})
    this.setState({varCurrents: this.state.varCurrents + 1})
    console.log("varcurreeeent" + this.state.varCurrents)
  }

  onSubmit(e) {
    e.preventDefault()

    const newUserInfos = {
      idUser: this.state.nom,
      varFacile: this.state.facileVar,
      varMoyen: this.state.moyenneVar,
      varDifficile: this.state.difficileVar,
      correct : this.state.correct,
      incorrect: this.state.incorrect,
      temps: this.state.t2,
      domaine:this.state.domaine,
      varRetour: this.state.varCurrents

    }

    registerInfos(newUserInfos).then(res => {
      this.props.history.push(`/fintest`)
      console.log("nom : " + this.state.temps)
    })
  }

  render() {
   console.log("vaaarrrrrrrrFFFCLICKKC",this.state.clk)
    {{if(this.state.clk == 3){
      console.log("correct" + this.state.current);
      return(
        <form onSubmit={this.onSubmit}>
        <button type="submit">Fin du test</button>
        </form>
      )
    }}}
    return(
      <div class="container">
        <div class="row">
          <h2>WELCOME {this.state.nom}</h2>
          
        </div>
      <div class="row">
        <QuizArea handleClick={this.handleClick}  dataSet={this.state.dataSet[this.state.current]}  />
        </div>
        <br />
        <br />
        <br />
        <div class="row">
        <button type="button" class="btn btn-success" onClick = {this.handleSubmitFacile} >Facile</button>
        <button type="button" class="btn btn-success" onClick = {this.handleSubmitMoyen} >Moyen</button> 
        <button type="button" class="btn btn-success" onClick = {this.handleSubmitDifficile}>Difficile</button>
        <button type="button" class="btn btn-danger" onClick = {this.handleSubmitCurrent}>Revenir</button>
        
        </div>
        
      </div>

      
    )
  }
}

function FinTest() {
  var style = {
    color: "red",
  }
  return (
    <button style={style}>Fin du test</button>
  )
}


function Question(props) {
  var style = {
    color: "red",
  }
  return (
    <h1 style={style}>{props.dataSet.question}</h1>
  )
}


function FacileBalise(props) {
  var style = {
    width: "100%",
    height: 50,
    color: "blue"
  }
  return(
    <div>

    </div>
  )
}

function Answer(props) {
  var style = {
    width: "100%",
    height: 50,
    color: "blue"
  }
  return(
    <div>

      <button style={style} onClick={() => props.handleClick(props.choice)} >{props.answer}</button>
    </div>
  )
}

function AnswerNiveau(props) {
  var style = {
    width: "100%",
    height: 50,
    color: "blue"
  }
  return(
    <div>

      <FacileBalise  handleClick={props.handleClick} />
    </div>
  )
}



function AnswerList(props) {
  var answers = []
  for (let i = 0; i < props.dataSet.answers.length; i++) {
    answers.push(<Answer choice={i} handleClick={props.handleClick} answer={props.dataSet.answers[i]} />)
  }
  return(
    <div>
      {answers}
    </div>
  )
}
// fonction test boutton facile  
function facileButton(props){
  var style = {
    width: "25%",
    display: "block",
    textAlign: "center",
    boxSizing: "border-box",
    float: "left",
    padding: "0 2em"
  }
return (
  <div style={style}>
    <Question dataSet={props.dataSet} />
  </div>
)
}




function QuizArea(props) {

  
  var style = {
    width: "25%",
    display: "block",
    textAlign: "center",
    boxSizing: "border-box",
    float: "left",
    padding: "0 2em"
  }
  return(
    <div style={style}>
      <Question dataSet={props.dataSet} />
      <AnswerList dataSet={props.dataSet} handleClick={props.handleClick} />
      
      <AnswerNiveau dataSet={props.dataSet} handleClickFacile={props.handleClickFacile} />
      
      
      
    </div>
  )
}

function facile(a){
  console.log("valeur a : " + a);
  return a + 1 ; 
  
}

function moyen(){
  console.log("moyen");
}

function difficile(){
  console.log("difficile");
}

function TotalCorrect(props) {
    var style = {
    display: "inline-block",
    padding: "1em",
    background: "#eee",
    margin: "0 1em 0 0"
  }
  return(
    <h2 style={style}>Correct: {props.correct} </h2>
    
  )
}

function TotalMoyen(props) {
  var style = {
  display: "inline-block",
  padding: "1em",
  background: "#eee",
  margin: "0 1em 0 0"
}
return(
  <h2 style={style}>Moyen: {props.moyen} </h2>
  
)
}

function TotalDifficile(props) {
  var style = {
  display: "inline-block",
  padding: "1em",
  background: "#eee",
  margin: "0 1em 0 0"
}
return(
  <h2 style={style}>Difficile: {props.difficile} </h2>
  
)
}

function TotalIncorrect(props) {
  var style = {
    display: "inline-block",    
    padding: "1em",
    background: "#eee",
    margin: "0 0 0 1em"
  }
  return(
    <>
    <h2 style={style}>Incorrect: {props.incorrect} </h2>
    
    </>
  )
}

function TotalFacile(props) {
  var style = {
    display: "inline-block",    
    padding: "1em",
    background: "#eee",
    margin: "0 0 0 1em"
  }
  return(
    <h2 style={style}>Facile: {props.facile} </h2>
  )
}

function ScoreArea(props) {
  var style = {
    width: "100%",
    display: "block",
    textAlign: "left",
    float: "left",
    padding: "2em"
  }
  return(
    <div style={style} >
      <TotalCorrect correct={props.correct}  />
      <TotalIncorrect incorrect={props.incorrect}  />
      <TotalFacile facile={props.facile} />

      <TotalMoyen moyen={props.moyen} />
      <TotalDifficile difficile={props.difficile} />

    </div>
  )
}

export default Quiz


