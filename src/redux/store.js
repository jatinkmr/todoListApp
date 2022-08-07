const { todoReducer } = require('./Reducer');
const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const thunkMiddleWare = require('redux-thunk').default;

const store = createStore(todoReducer, applyMiddleware(logger, thunkMiddleWare));
console.log('store -> ', store.getState());

export default store;
