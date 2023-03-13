import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
        this.setState({
          ...this.state,
          todos: []
        })
    })
    .catch(err => {
      
      
    })

  }
  //helperfunction2fetch
  fetchAllTodos = () => {
    axios.get(URL).then(res => {
      
      this.setState({ ...this.state, todos: res.data.data })
    }).catch(err=>{
      console.log(err)
    })
  }

  componentDidMount() {
      // fetch all todos on server
    this.fetchAllTodos()

  }


  render() {
  
    return (
      <div>
      <h2>Todos:</h2>
    <div id="todos">
      {this.state.todos.map(td=>{
        return <div key={td.id}>{td.name}</div>
      })}
      <div>Walk The Dog</div>
      <div>Take Out The Trash</div>  
    </div>
      <form id="todoForm">
        <input type ="text" placeholder="Type todo"></input>
        <input  type="submit"></input>
        <button>Clear completed</button>
      </form>
    </div>

    )
  }
}
