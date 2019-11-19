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
    const data = await response.json()

    this.setState({ todos: data })
  }

  handleChange = e => {
    this.setState({
      textValue: e.target.value
    })
  }

  handleAdd = async () => {
    if (!this.state.textValue) return

    const todo = { ticked: false, name: this.state.textValue }
    await fetch(`${API}/todos`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(todo)
    })

    this.setState(state => ({
      todos: state.todos.concat(todo),
      textValue: ''
    }))
  }

  handleTick = id => async () => {
    const tickedTodo = this.state.todos.find(x => x.id === id)
    tickedTodo.ticked = !tickedTodo.ticked

    await fetch(`${API}/todos/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(tickedTodo)
    })

    this.setState(state => ({
      todos: state.todos.map(todo => (todo.id === id ? tickedTodo : todo))
    }))
  }

  handleDelete = id => async () => {
    await fetch(`${API}/todos/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE'
    })

    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }))
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
