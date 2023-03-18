import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

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
        <TodoList todos={this.state.todos} displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
    
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
