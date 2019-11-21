import React from 'react'

import styles from './TodoList.module.css'

import NewTodo from './components/NewTodo'
import Todo from './components/Todo'

const API = 'http://localhost:3001'

class TodoList extends React.Component {
  state = {
    textValue: '',
    todos: [] // { id: string, ticked: Boolean, name: String }
  }

  componentDidMount = async () => {
    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    this.setState({ todos })
  }

  handleChange = e => {
    this.setState({
      textValue: e.target.value
    })
  }

  handleAdd = async () => {
    if (!this.state.textValue) return

    // ส่งข้อมูลไปยัง server
    const todo = { name: this.state.textValue, ticked: false }
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(todo)
    })

    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    // set todos and textValue at the same time
    this.setState({
      todos,
      textValue: ''
    })
  }

  handleTick = id => async () => {
    const tickedTodo = this.state.todos.find(x => x.id === id)
    tickedTodo.ticked = !tickedTodo.ticked

    await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(tickedTodo)
    })

    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    this.setState({ todos })
  }

  handleDelete = id => async () => {
    await fetch(`${API}/todos/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })

    const response = await fetch(`${API}/todos`)
    const todos = await response.json()

    this.setState({ todos })
  }

  render = () => {
    return (
      <div className={styles.Root}>
        <NewTodo
          textValue={this.state.textValue}
          onChange={this.handleChange}
          onAdd={this.handleAdd}
        />
        {this.state.todos.map(({ ticked, name, id }) => (
          <Todo
            key={id}
            ticked={ticked}
            name={name}
            onTick={this.handleTick(id)}
            onDelete={this.handleDelete(id)}
          />
        ))}
      </div>
    )
  }
}

export default TodoList
