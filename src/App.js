import React, { Component } from 'react';
import TodoForm from './Components/TodoForm';
import TodoListComponent from './Components/TodoListComponent';
import { fetchTodos, removeTodo, createTodo, updateTodo } from './redux/Action';
import './App.css';
import { connect } from 'react-redux';
import { config } from './Constants';
const axios = require('axios');

class App extends Component {
  state = {
    todoList: [],
    todoName: '',
    priority: '',
    isLoading: false,
    isTodoUpdate: false,
    todoId: '',
    updatingTodo: {},
    todoApiResponse: {}
  };

  componentDidMount = async () => {
    const { fetchTodos } = this.props;
    await fetchTodos()
    this.state.todoList = this.props.todoList;
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onTodoCompletionHandler = async (todoId, index) => {
    console.log('todoId -> ', todoId, 'Index -> ', index);
    try {
      const reqObj = {
        todoId: todoId
      };

      let newTodoList = this.state.todoList.map(function (data, ind) {
        if (ind === index) {
          data.completed = !data.completed;
        }
        return data;
      });

      const response = await axios.patch(`${config.API_HOST}/api/changestatus`, reqObj);

      if (response.status) {
        this.setState({
          todoList: newTodoList
        })
      } else {
        console.log('Error Occurred while changing the status', response.message);
        return;
      }
    } catch (error) {
      console.log('Error occurred -> ', error);
    }
  }

  onTodoSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { isTodoUpdate, todoName, priority, todoId } = this.state;
      if (isTodoUpdate) {
        const { updateTodo } = this.props;
        console.log(isTodoUpdate, todoName, priority, todoId)
        let reqObj = {
          taskName: todoName,
          priority: priority,
          todoId: todoId
        };

        await updateTodo(reqObj);
      } else {
        const { createTodo } = this.props;
        let reqObj = {
          taskName: todoName,
          priority: priority,
          completed: false
        };

        await createTodo(reqObj);
      }
      let response = this.props.todoApiResponse;
      if (response.error) {
        console.log(response.message);
        return;
      } else {
        let newTodoList = [ ...this.state.todoList, response.data ];
        newTodoList = newTodoList.sort((a, b) => {
          return a.priority - b.priority;
        });
        this.setState({
          todoName: '',
          priority: '',
          isTodoUpdate: false,
          todoList: newTodoList
        })
      }
    } catch (exception) {
      console.log('exception -> ', exception, 'exception message -> ', exception.message)
    }
  }

  onResetHandler = () => {
    const { isTodoUpdate, updatingTodo, todoList } = this.state;
    let newTodoList = todoList;
    if (isTodoUpdate) {
      newTodoList = [...newTodoList, updatingTodo];
    }
    this.setState({
      todoName: '',
      priority: '',
      isTodoUpdate: false,
      todoList: newTodoList
    })
  }

  onUpdateTodoHandler = (todoId) => {
    const { todoList, isTodoUpdate } = this.state;
    if (isTodoUpdate) {
      console.log('Please update previous record first!!');
      return;
    }
    let todoData = todoList.filter(obj => obj._id === todoId)
    let newTodoList = todoList.filter(obj => obj._id !== todoId)
    this.setState({
      isTodoUpdate: true,
      todoList: newTodoList,
      todoName: todoData[0].taskName,
      priority: todoData[0].priority,
      todoId: todoId,
      updatingTodo: todoData[0]
    })
  }

  onRemoveTodoHandler = async (todoId) => {
    const { removeTodo } = this.props;
    await removeTodo(todoId);
    let response = this.props.todoApiResponse;
    if (response.error) {
      console.log('Error while removing the todo', response.message);
      return;
    } else {
      let newTodoList = this.state.todoList.filter(obj => obj._id !== todoId)
      this.setState({
        todoList: newTodoList
      })
    }
  }

  render() {
    const { isLoading } = this.props;
    const { todoName, priority, todoList, isTodoUpdate } = this.state;
    if (isLoading) {
      return (
        <div>
          ...Loading
        </div>
      )
    }
    return (
      <>
        <TodoForm
          onChangeHandler={this.onChangeHandler}
          todoName={todoName}
          priority={priority}
          onTodoSubmitHandler={this.onTodoSubmitHandler}
          onResetHandler={this.onResetHandler}
          isTodoUpdate={isTodoUpdate}
        />

        <TodoListComponent
          todoList={todoList}
          onUpdateTodoHandler={this.onUpdateTodoHandler}
          onRemoveTodoHandler={this.onRemoveTodoHandler}
          onTodoCompletionHandler={this.onTodoCompletionHandler}
        />
      </>
    )
  }
}

function mapStateToProps ( state ) {
  const { todoList, todoName, priority, isLoading, todoApiResponse } = state
  return { todoList, todoName, priority, isLoading, todoApiResponse }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    removeTodo: (todoId) => dispatch(removeTodo(todoId)),
    createTodo: (reqObj) => dispatch(createTodo(reqObj)),
    updateTodo: (reqObj) => dispatch(updateTodo(reqObj))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)