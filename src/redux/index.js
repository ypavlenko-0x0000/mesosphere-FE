import reducer from './reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const sagaMiddleware = createSagaMiddleware();

export default createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(sagaMiddleware)
	)
);
