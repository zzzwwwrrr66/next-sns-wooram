
interface IState {
  user: null | {name:string, password: string, userId: string},
  isLogin: boolean
}
const initalState = {
  user: null,
  isLogin: false,
} 



const userReducer = (state:IState = initalState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      }
    case 'LOGOUT': 
      return {
        ...state,
        user: null,
        isLogin: false,
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
const nameUpdateAction = (payload) => {
  return {
    type: 'USER_NAME_UPDATE',
    payload,
  }
}
 const logoutAction = {
  type: 'LOGOUT',
};
export {
  actionLogin, logoutAction, nameUpdateAction
}