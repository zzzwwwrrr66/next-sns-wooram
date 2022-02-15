import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from '../store/userReducer';
import CommonContainer from "./CommonContainer";

const MyProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logoutAction);
  }

  return(
    <>
      <h1>MyProfile</h1>
      <p>my name: wooram</p>
      <button onClick={onLogOut}>LOG OUT</button>
    </>
  )
}

export default MyProfile;