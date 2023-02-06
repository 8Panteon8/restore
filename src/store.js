import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";

const logMiddleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    console.log(action.type, getState());
    return next(action);
  };

const StingMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

// const logEnhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       console.log(action.type);
//       return originalDispatch(action);
//     };
//     return store;
//   };

// const stringEnhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return originalDispatch({
//           type: action,
//         });
//       }
//       return originalDispatch(action);
//     };
//     return store;
//   };

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, StingMiddleware, logMiddleware)
);

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(
    () =>
      dispatch({
        type: "DELAYED_ACTION",
      }),
    timeout
  );
};

store.dispatch(delayedActionCreator(3000));

store.dispatch("HELLO_WORLD");

export default store;
