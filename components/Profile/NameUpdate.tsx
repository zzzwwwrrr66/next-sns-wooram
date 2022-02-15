//react
import {FC, useCallback, useState, useEffect} from 'react';
//css 
import { Nav, Col, Row, Container, Card, Button, Stack,InputGroup, FormControl } from 'react-bootstrap';

//store
import { useSelector, useDispatch } from "react-redux";
import {actionLogin, logoutAction} from '../../store/userReducer';
// store type
import {RootState} from '../../store/recusers';


const NameUpdate = () => {
  const {user} = useSelector((state:RootState)=> state.userReducer);
  const [name, setName] = useState('');

  useEffect(()=>{
    console.log('NickNameAddForm', user);
    if(user) {
      setName(user.name)
    } else {
      setName(''); 
    }
  },[user])


  const idChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onLoginClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
    e.preventDefault();
    
  }, [name])

  return (
    <>
      <InputGroup className="mb-3" >
        <InputGroup.Text id="basic-addon3" >
          {name}
        </InputGroup.Text>
        <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={idChange} />
        <Button variant="outline-secondary" id="button-addon2" type='button' onClick={onLoginClick}>
          Update
        </Button>
      </InputGroup>
    {/* <form onSubmit={onLogin} >
      <input type='text' onChange={idChange} />
      <button type='submit'>Nick name Add</button>
    </form> */}
    </>
  )
}
export default NameUpdate;