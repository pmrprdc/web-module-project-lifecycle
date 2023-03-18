import React from 'react'

export default class Form extends React.Component {
  render() {
  

    return (
      
      <form id="todoForm">
        <input onChange={this.props.changeHandler} 
          value={this.props.toDoNameInput} 
          type ="text" placeholder="Type todo">
        </input>
        <input 
          onClick={this.props.submitHandler} 
          type="submit" value="submit"/>
        <button onClick={this.props.toggleDisplayCompleteds}>
          {this.props.displayCompleteds ? "Hide" : "Show"} completed
          </button>
      </form>
  
    )
  }
}
