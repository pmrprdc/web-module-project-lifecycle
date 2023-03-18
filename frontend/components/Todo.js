import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div onClick={this.props.toggleCompleted(this.props.id)} key={this.props.id}>{this.props.name}{this.props.completed? 'COMPLETE' : ''}</div>
    )
  }
}
