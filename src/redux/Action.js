import { ADD_TODO_REQUEST, ADD_TODO_SUCCES, ADD_TODO_FAILURE, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE, REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS, FETCH_TODO_FAILURE } from './Type';
import { config } from '../Constants';
const axios = require('axios');

// Fetch todo/task Actions
const fetchTodoList = () => {
    return {
        type: FETCH_TODO_REQUEST
    };
};

const fetchTodoSuccess = todo => {
    return {
        type: FETCH_TODO_SUCCESS,
        payload: todo
    };
};

const fetchTodoFailure = error => {
    return {
        type: FETCH_TODO_FAILURE,
        payload: error
    }
}

export const fetchTodos = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchTodoList);
            const response = await axios.get(`${config.API_HOST}/api/gettask`);
            if (response && response.data) {
                const todo = response.data.data;
                dispatch(fetchTodoSuccess(todo));
            }
        } catch (error) {
            const errorMsg = error.message;
            dispatch(fetchTodoFailure(errorMsg));
        }
    }
}

// remove todo/task Actions
const removeTodoRequest = () => {
    return {
        type: REMOVE_TODO_REQUEST
    };
};

const removeTodoSuccess = data => {
    return {
        type: REMOVE_TODO_SUCCESS,
        payload: data
    };
};

const removeTodoFailure = data => {
    return {
        type: REMOVE_TODO_FAILURE,
        payload: data
    };
};

export const removeTodo = (todoId) => {
    return async (dispatch) => {
        try {
            dispatch(removeTodoRequest);
            const response = await axios.delete(`${config.API_HOST}/api/removetask/${todoId}`);
            if (response && response.data) {
                const data = response.data;
                dispatch(removeTodoSuccess(data));
            }
        } catch (error) {
            const errorMsg = error.message;
            dispatch(removeTodoFailure(errorMsg));
        }
    };
};

// create todo/task actions
const createTodoRequest = () => {
    return {
        type: ADD_TODO_REQUEST
    };
};

const createTodoSucces = data => {
    return {
        type: ADD_TODO_SUCCES,
        payload: data
    };
};

const createTodoFailure = data => {
    return{
        type: ADD_TODO_FAILURE,
        payload: data
    };
};

export const createTodo = reqObj => {
    return async (dispatch) => {
        try {
            dispatch(createTodoRequest);
            const response = await axios.post(`${config.API_HOST}/api/createtask`, reqObj);
            if (response && response.data) {
                const data = response.data;
                dispatch(createTodoSucces(data));
            }
        } catch (error) {
            const errorMsg = error.message;
            dispatch(createTodoFailure(errorMsg));
        }
    };
};

// update todo/task actions
const updateTodoRequest = () => {
    return {
        type: UPDATE_TODO_REQUEST
    };
};

const updateTodoSuccess = data => {
    return {
        type: UPDATE_TODO_SUCCESS,
        payload: data
    };
};

const updateTodoFailure = data => {
    return {
        type: UPDATE_TODO_FAILURE,
        payload: data
    };
};

export const updateTodo = reqObj => {
    return async (dispatch) => {
        try {
            dispatch(updateTodoRequest);
            const response = await axios.patch(`${config.API_HOST}/api/updatetask`, reqObj);
            if (response && response.data) {
                const data = {
                    _id: reqObj.todoId,
                    taskName: reqObj.taskName,
                    priority: reqObj.priority,
                    completed: false
                };
                const responseData = {
                    error: false,
                    data
                };
                dispatch(updateTodoSuccess(responseData));
            }
        } catch (error) {
            const errorMsg = error.message;
            let data = {
                error: true,
                message: errorMsg
            };
            dispatch(updateTodoFailure(data));
        }
    };
};
