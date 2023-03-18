import React from 'react'
import axios from 'axios'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
    toDoNameInput: '',
    displayCompleteds: true,
  }


  toggleCompleted = id => evt => {
      axios.patch(`${URL}/${id}`)
      .then(res=>{
        console.log(res.data.data)
        this.setState({
          ...this.state,
          todos: this.state.todos.map(td=>{
            if(td.id === id){
              return res.data.data;
            } else {
              return td;
            }
          })
        })
      })
      .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompleteds = (evt) => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      displayCompleteds : !this.state.displayCompleteds
    })
 
  }


  changeHandler = evt => {
    const { value } = evt.target;
    this.setState({
      ...this.state,
      toDoNameInput: value
    })
  }

  resetForm = () => this.setState( {...this.state, toDoNameInput: ''})
  setAxiosResponseError = err =>  this.setState({
    ...this.state, error: err.response.data.message
  })
  postNewTodo = () => {
    axios.post(URL, {name: this.state.toDoNameInput})
    .then(res=> {
      console.log(res.data.data)
      this.setState({...this.state, todos: [...this.state.todos, res.data.data]})
      this.resetForm();
    }).catch( this.setAxiosResponseError)
    
  }
  submitHandler = evt => {
    evt.preventDefault();
    this.postNewTodo();
  }

 
  //helperfunction2fetch
  fetchAllTodos = () => {
    axios.get(URL).then(res => {
      
      this.setState({ ...this.state, todos: res.data.data })
    }).catch(this.setAxiosResponseError)
  }

  componentDidMount() {
      // fetch all todos on server
    this.fetchAllTodos()

  }


  render() {
  
    return (
      <div>
       {this.state.error !== "" && <h2 style={{color: "red"}}>Error: {this.state.error}</h2>}
      <h2>Todos:</h2>
    <div id="todos">
    
    
      
      {
     this.state.todos.reduce((acc, td)=>{
          if(this.state.displayCompleteds || !td.completed) return acc.concat(<div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed? 'COMPLETE' : ''}</div>)
          return acc
 //<div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed? 'COMPLETE' : ''}</div>
      },[])}


    </div>
      <Form changeHandler={this.changeHandler} 
            submitHandler={this.submitHandler}
            toDoNameInput={this.state.toDoNameInput}
            toggleDisplayCompleteds={this.toggleDisplayCompleteds}
            displayCompleteds = {this.state.displayCompleteds}
            
           />
    </div>
    

    )
  }
}
