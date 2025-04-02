import {createStore, applyMiddleware} from "redux";
import {thunk}  from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from './reducers/index';
import {Provider} from 'react-redux';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


// eslint-disable-next-line react/prop-types
const DataProvider = ({children})=>{
  return(
    <Provider store= {store}>
    {children}
  </Provider>
  )
}

export default DataProvider
