import {
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCES,
    ADD_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    REMOVE_TODO_REQUEST,
    REMOVE_TODO_SUCCESS,
    REMOVE_TODO_FAILURE,
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILURE,
} from './Type';

let initalState = {
    isLoading: true,
    todoName: '',
    priority: '',
    todoList: [],
    todoApiResponse: {},
};

export function todoReducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todoList: action.payload,
            };
        case FETCH_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                todoList: [],
            };
        case REMOVE_TODO_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case REMOVE_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todoApiResponse: action.payload,
            };
        case REMOVE_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                todoApiResponse: action.payload,
            };
        case ADD_TODO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case ADD_TODO_SUCCES:
            return {
                ...state,
                isLoading: false,
                todoApiResponse: action.payload,
            };
        case ADD_TODO_FAILURE:
            return {
                ...state,
                isLoading: false,
                todoApiResponse: action.payload,
            };
        case UPDATE_TODO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                isLaoding: false,
                todoApiResponse: action.payload,
            };
        case UPDATE_TODO_FAILURE:
            return {
                ...state,
                isLaoding: false,
                todoApiResponse: action.payload,
            };
        default:
            return state;
    }
}
