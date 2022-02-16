// react
import { FC, useState, useCallback, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/recusers';

// css 
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap';

// customHooks
import useInput from '../../hooks/useInput';

interface IProps {
  contentId: number,
}

const CommentForm:FC<IProps> = ({contentId}) => {
  const userId = useSelector((state:RootState) => state.userReducer.user?.userId);
  const [comment, onChangeComment, setComment] = useInput('');

  useEffect(()=>{
    console.log('commentForm content ID', contentId);
  },[]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('userId', userId,'content ID',contentId, 'comment', comment);
    setComment('');
  },[comment, contentId, userId]);

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