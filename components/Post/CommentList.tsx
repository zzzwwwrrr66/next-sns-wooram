import {FC, ReactNode} from 'react';
interface IProps {
  comments : {
    User: {nickname : string},
    content: string,
  }[]
}
const CommentList:FC<IProps> = ({comments}) => {

  return (
    <div style={{margin:'10px 0 0',padding:'10px', border: 'dotted'}}>
    <p>Comments List</p>
    {
    comments?.map((v,i) => {
      return((
        <div key={v.content + i}>
          <p>{v.User.nickname} : {v.content}</p>
        </div>
      ))
    })
    }
    </div>
  )
}

export default CommentList;
