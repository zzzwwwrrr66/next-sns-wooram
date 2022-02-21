//react
import {FC, useCallback, useState, useEffect} from 'react';
//css 
import { Button, Stack,InputGroup, FormControl, Form } from 'react-bootstrap';

//store
import { useSelector, useDispatch } from "react-redux";
// store type
import {RootState} from '../../store/recusers';
import {updateNameReqAction} from '../../store/userReducer';

// custom hooks 
import useInput from '../../hooks/useInput';


const NameUpdate = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state:RootState)=> state.userReducer);
  const nameUpdateLoading = useSelector((state:RootState)=> state.userReducer.nameUpdateLoading);
  const [name, onChangeName, setName] = useInput('');

  useEffect(()=>{
    if(nameUpdateLoading) {
      console.log('nameUpdateLoading hahahahahah')
      setName('');
    }
  },[nameUpdateLoading])

  const onLoginClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
    e.preventDefault();
    
  }, [name]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user && name.length && user.name !== name) {
      if(name.length > 6) {
        alert('6글자 이하!!!');
        return;
      }
      const payload = {
        userId: user.userId,
        name,
      }
      dispatch(updateNameReqAction(payload));
    }
  },[ user, name]);

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mb-3" >
        <InputGroup.Text id="" >
          {user?.name || null}
        </InputGroup.Text>
        <FormControl id="basic-url" onChange={onChangeName} value={name} />
        <Button variant="outline-secondary" id="button-addon2" type='submit' disabled={nameUpdateLoading}>
          {nameUpdateLoading ? 'loading...' : 'Update'}
        </Button>
      </InputGroup>
    {/* <form onSubmit={onLogin} >
      <input type='text' onChange={idChange} />
      <button type='submit'>Nick name Add</button>
    </form> */}
    </Form>
  )
}
export default NameUpdate;