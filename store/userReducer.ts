
interface IState {
  user: null | {name:string, password: string, userId: string},
  isLogin: boolean,
  isLoging?: boolean,
  isLogouting?: boolean,
}
const initalState = {
  user: null,
  isLogin: false,
  isLoging: false,
  isLogouting: false,
} 

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

const userReducer = (state:IState = initalState, action) => {
  switch(action.type) {
    // case 'LOGIN':
    //   return {
    //     ...state,
    //     user: action.payload,
    //     isLogin: true,
    //   }
    case 'LOGOUT': 
      return {
        ...state,
        user: null,
        isLogin: false,
      }
    case 'TEST':
      console.log('REDUCER TEST');
      return  {
        ...state,
      }
    case 'TEST_SUCCESS':
      console.log('REDUCER TEST SUCCESS');
      return  {
        ...state,
      }
    case 'TEST_ERR':
      console.log('REDUCER TEST ERROR');
      return  {
        ...state,
      }
    case LOGIN_REQUEST:
      console.log('REDUCER LOGIN_REQUEST', action.payload);
      return  {
        ...state,
        isLogin: false,
        isLoging: true,
      }
    case LOGIN_SUCCESS:
      console.log('REDUCER LOGIN_SUCCESS', action.payload);
      return  {
        ...state,
        user: action.payload,
        isLogin: true,
        isLoging: false,
      }
    case LOGIN_FAIL:
      console.log('REDUCER LOGIN_REQUEST', action.payload);
      return  {
        ...state,
        user: null,
        isLogin: false,
        isLoging: false,
      }
      case LOGOUT_REQUEST:
        console.log('REDUCER LOGOUT_REQUEST');
        return  {
          ...state,
          isLogouting: true,
        }
      case LOGOUT_SUCCESS:
        console.log('REDUCER LOGOUT_SUCCESS');
        return  {
          ...state,
          isLogouting: false,
          user: null,
          isLogin: false,
        }
      case LOGOUT_FAIL:
        console.log('REDUCER LOGOUT_FAIL');
        return  {
          ...state,
          isLogouting: false,
        }
    default:
    return state
  }
}

export default userReducer;

// actions
const actionLogin = (payload) => {
  return {
    type: 'LOGIN',
    payload,
  }
}
const LoginReqAction = (payload) => {
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}


const nameUpdateAction = (payload) => {
  return {
    type: 'USER_NAME_UPDATE',
    payload,
  }
}
 const logoutAction = {
  type: 'LOGOUT',
};
const logoutReqAction = {
  type: LOGOUT_REQUEST,
}
 const testAction = {
  type: 'TEST',
};


export {
  actionLogin, logoutAction, nameUpdateAction, testAction, LoginReqAction, logoutReqAction
}