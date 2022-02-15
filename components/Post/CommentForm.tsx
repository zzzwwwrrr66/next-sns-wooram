// react
import { FC, useState, useCallback } from 'react';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/recusers';

// css 
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap';

// customHooks
import useInput from '../../hooks/useInput';

interface IProps {
  commentOpend: boolean;
}

const CommentForm:FC = () => {
  const userId = useSelector((state:RootState) => state.userReducer.user?.userId);
  const [comment, onChangeComment, setComment] = useInput('');

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('userId', userId, comment);
    setComment('');
  },[comment])

  return (
    <div style={{border: 'dotted', padding: '10px'}}>
    <Form onSubmit={onSubmit}>
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
        value={comment}
        onChange={onChangeComment}
      />
      <Button type='submit' >Add Comment</Button>
    </Form>
    </div>
  )
}

export default CommentForm;