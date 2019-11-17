import React from 'react'

import styles from './TodoList.module.css'

import NewTodo from './components/NewTodo'
import Todo from './components/Todo'

class TodoList extends React.Component {
  state = {
    textValue: '',
    todos: [{ ticked: false, name: 'KILL DA BEECH' }]
  }

  handleChange = e => {
    this.setState({
      textValue: e.target.value
    })
  }

  handleAdd = () => {
    if (!this.state.textValue) return
    this.setState(
      state => ({
        todos: state.todos.concat({ ticked: false, name: state.textValue })
      }),
      () => {
        this.setState({ textValue: '' })
      }
    )
  }

  handleTick = idx => () => {
    this.setState(state => ({
      todos: state.todos.map((todo, todoIdx) =>
        todoIdx === idx ? { ...todo, ticked: !todo.ticked } : todo
      )
    }))
  }

  handleDelete = idx => () => {
    this.setState(state => ({
      todos: state.todos.filter((todo, todoIdx) => todoIdx !== idx)
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
        {this.state.todos.map(({ ticked, name }, idx) => (
          <Todo
            key={idx}
            ticked={ticked}
            name={name}
            onTick={this.handleTick(idx)}
            onDelete={this.handleDelete(idx)}
          />
        ))}
      </div>
    )
  }
}

export default TodoList
