import { combineReducers } from "redux";

//reducers 
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import { HYDRATE } from "next-redux-wrapper";


const rootReducer = combineReducers({
  // index: (state={}, action: {type:string, payload: any}) => {
  //   switch(action.type) {
  //     case HYDRATE:
  //     console.log('HYDRATE', action);
  //     return { state, ...action.payload}
  //   }
  // },
  userReducer,
  postReducer
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;