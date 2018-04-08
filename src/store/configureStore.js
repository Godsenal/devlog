import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));
  sagaMiddleware.run(rootSaga);
  return store;
}

/* Use redux-immutable-state-invariant
   which watct state's immutability
*/
function configureStoreDev(initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    sagaMiddleware,
    /* Redux middlewares like thunks */
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
