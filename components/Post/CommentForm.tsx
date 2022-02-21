// react
import { FC, useState, useCallback, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/recusers';
import { addCommentReqAction } from '../../store/postReducer'

// css 
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap';

// customHooks
import useInput from '../../hooks/useInput';

interface IProps {
  contentId: number,
}

const CommentForm:FC<IProps> = ({contentId}) => {
  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.userReducer.user);
  const postCommentLoading = useSelector((state:RootState) => state.postReducer.commentLoading);
  const [comment, onChangeComment, setComment] = useInput('');

  useEffect(()=>{
    if(postCommentLoading) {
      setComment('');
    }
  },[postCommentLoading]);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(user && comment.length) {
      const payload = {
        id: contentId,
        data: {
          User: {
            nickname: user.name,
          },
          content: comment,
        }
      }
      dispatch(addCommentReqAction(payload));
    }
  },[comment, contentId, user]);

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