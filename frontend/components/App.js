import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: []
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


  componentDidMount() {



  }
  render() {

    return (
      <div>
    <div id="todos">
      <h2>Todos:</h2>
      <div>Walk The Dog</div>
      <div>Take Out The Trash</div>  
    </div>
      <form id="todoForm">
        <input type ="text" placeholder="Type todo"></input>
        <input type="submit"></input>
        <button>Clear completed</button>
      </form>
    </div>

    )
  }
}
