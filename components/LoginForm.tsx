import Link from "next/link";
import { useRouter,  } from 'next/router';

import { useState, useEffect, useRef, useCallback } from "react";

//css 
import { Form , Button, Stack} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

//store 
import { loginReqAction } from '../store/userReducer';
// store type
import {RootState} from '../store/recusers';

// util 
import shortid from 'shortid';


interface IProps {
  setIsLogin: (bool: boolean)=> void;
}

const LoginForm = () => {
  const state = useSelector((state:RootState)=> state.userReducer);
  const dispatch = useDispatch();

  const [id, setId] = useState('wooram');
  const [password, setPassword] = useState('123123');
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const idChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, [id])
  const passwordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [password])

  const onLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      userId: shortid.generate(), // userId 임의 설정함
      name : id,
      password: password,
      Posts: []
    }
    dispatch(loginReqAction(data));
  }, [])

  return(
    <>
    <Form onSubmit={onLogin}>
      <Form.Group className="mb-3" >
        <Form.Label>Id</Form.Label>
        <Form.Control type="text" value={id} onChange={idChange} ref={idRef}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type='text' id='password' value={password} onChange={passwordChange} ref={passwordRef} />
      </Form.Group>

      <Stack gap={1}>
        <Button type='submit'>LOGIN</Button>
        <Button variant="outline-secondary">
          <Link href='/signup'>
            <a style={{color:'#6c757d', textDecoration: 'none'}}>SIGN UP</a>
          </Link>
        </Button>
      </Stack>
    </Form>
    </>
  )
}
export default LoginForm;