import produce from "immer";

interface IState {
  user: null | {
    name:string, 
    password: string, 
    userId: string, 
    Posts?: {id: string}[], 
    Comments?: {id:string}[]
  },
  isLogin: boolean,
  isLoging?: boolean,
  isLogouting?: boolean,
  nameUpdateLoading?: boolean,
}
const initalState = {
  user: null,
  isLogin: false,
  isLoging: false,
  isLogouting: false,
  nameUpdateLoading : false,
} 

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const DELETE_POST_TO_ME = 'DELETE_POST_TO_ME';

export const UPDATE_NAME_REQUEST = 'UPDATE_NAME_REQUEST';
export const UPDATE_NAME_SUCCESS = 'UPDATE_NAME_SUCCESS';
export const UPDATE_NAME_FAIL = 'UPDATE_NAME_FAIL';

const userReducer = (state:IState = initalState, action) => produce(state, (draft) =>{
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log('REDUCER LOGIN_REQUEST', action.payload);
      draft.isLogin = false;
      draft.isLoging = true;
      break;
    case LOGIN_SUCCESS:
      console.log('REDUCER LOGIN_SUCCESS', action.payload);
      draft.user = action.payload;
      draft.isLogin = true;
      draft.isLoging = false;
      break;
    case LOGIN_FAIL:
      console.log('REDUCER LOGIN_REQUEST', action.payload);
      draft.user = null;
      draft.isLogin = false;
      draft.isLoging = false;
      break;
    case LOGOUT_REQUEST:
      console.log('REDUCER LOGOUT_REQUEST');
      draft.isLogouting = true;
      break;
    case LOGOUT_SUCCESS:
      console.log('REDUCER LOGOUT_SUCCESS');
      draft.isLogouting = false;
      draft.user = null;
      draft.isLogin = false;
      break;
    case LOGOUT_FAIL:
      console.log('REDUCER LOGOUT_FAIL');
      draft.isLogouting = false
      break;
    case ADD_POST_TO_ME:
      console.log('ADD_POST_TO_ME', action.payload);
      draft.user?.Posts.unshift({ id: action.payload });
      // draft.user.Posts.unshift({ id: action.payload });
      break;
    case DELETE_POST_TO_ME:
      console.log('DELETE_POST_TO_ME check id', action.payload);
      draft.user.Posts = draft.user?.Posts.filter((v) => v.id !== action.payload);
    break;
    case UPDATE_NAME_REQUEST:
      draft.nameUpdateLoading = true;
    break
    case UPDATE_NAME_SUCCESS:
      console.log('REDUCER UPDATE_NAME_SUCCESS', action.payload); // id, 변경할 네임
      draft.nameUpdateLoading = false;
      if(draft.user.userId === action.payload.userId) draft.user.name = action.payload.name;
    break
    case UPDATE_NAME_FAIL:
      console.log('REDUCER UPDATE_NAME_FAIL');
      draft.nameUpdateLoading = false
    break;
    default:
    break;
  }
});

export default userReducer;

// actions
const loginReqAction = (payload) => {
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}
const updateNameReqAction = (payload) => {
  return {
    type: UPDATE_NAME_REQUEST,
    payload,
  }
}
 
const logoutReqAction = {
  type: LOGOUT_REQUEST,
}



export {
  updateNameReqAction, loginReqAction, logoutReqAction
}