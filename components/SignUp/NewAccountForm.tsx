//React
import {useState} from 'react';

// custom Hooks
import useInput from '../../hooks/useInput';

// css 
import { Nav, Col, Row, Container, Card, Button, Stack, Form } from 'react-bootstrap';
import styles from '../../style/common.module.css';

const NewAccountForm = () => {
  const [id, onChangeId] = useInput('');
  const [name, onChangeName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [passwordError, setPasswordError] = useState(false);
  //check 
  const [chk, setChk] = useState(false);
  const [chkError, setChkError] = useState(false);
  const onChangeChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChk(e.target.checked);
  }
  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError(false);
    setChkError(false);

    if(password !== passwordCheck) {
      setPasswordError(true);
      return;
    }

    if(!chk) {
      setChkError(true);
      return;
    }

    console.log(
      id, name, password,
    )
    
  }

  return (
    <>
      <h1>NewAccountForm</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="id">
          <Form.Label column sm="2">
            Id
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="id" value={id} onChange={onChangeId} />
          </Col>
        </Form.Group>
        {/* id */}

        <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm="2">name</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="name" value={name} onChange={onChangeName} />
          </Col>
        </Form.Group>
        {/* name */}

        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
          </Col>
        </Form.Group>
        {/* password */}

        <Form.Group as={Row} className="mb-3" controlId="passwordCheck">
          <Form.Label column sm="2">
            Password Check
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password Check" value={passwordCheck} onChange={onChangePasswordCheck} />
            {passwordError ? <p className={styles.errorMsg}>password is false</p> : null}
          </Col>
        </Form.Group>
        {/* password check */}

        <Form.Check 
          type="switch"
          id="custom-switch"
          label="동의 하십니까~"
          onChange={onChangeChk}
        />
        {chkError ? <p className={styles.errorMsg}>checkbox is false</p> : null}

        <Button variant="outline-secondary" type='submit'>
          Add Account
        </Button>
      </Form>
    </>
  )
}

export default NewAccountForm;