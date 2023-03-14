import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
    toDoNameInput: ''
  }


  changeHandler = evt => {
    const { value } = evt.target;
    this.setState({
      ...this.state,
      toDoNameInput: value
    })
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.toDoNameInput})
    .then(res=> {
      this.fetchAllTodos()
      this.setState({...this.state, toDoNameInput: ''})
    }).catch(err=> {
      this.setState({
        ...this.state,
        error: err.response.data.message
      })
    })
  }
  submitHandler = evt => {
    evt.preventDefault();
    this.postNewTodo();
  }
 
  //helperfunction2fetch
  fetchAllTodos = () => {
    axios.get(URL).then(res => {
      
      this.setState({ ...this.state, todos: res.data.data })
    }).catch(err=>{
      this.setState({...this.state, error : err.message})
      console.log(err.message)
    })
  }

  componentDidMount() {
      // fetch all todos on server
    this.fetchAllTodos()

  }


  render() {
  
    return (
      <div>
       {this.state.error !== "" && <div>Error: {this.state.error}</div>}
      <h2>Todos:</h2>
    <div id="todos">
      {this.state.todos.map(td=>{
        return <div key={td.id}>{td.name}</div>
      })}
      
    </div>
      <form id="todoForm">
        <input onChange={this.changeHandler} value={this.state.toDoNameInput} type ="text" placeholder="Type todo"></input>
        <input onClick={this.submitHandler} type="submit" value="submit"/>
        <button>Clear completed</button>
      </form>
    </div>

    )
  }
}
