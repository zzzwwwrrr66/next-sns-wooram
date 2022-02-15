import {FC} from 'react';
//css 
import { Nav, Col, Row, Container, Card, Stack, Button } from 'react-bootstrap';

interface IProps {
  data: {
    name: string
  }[],
}
const FollowingList:FC<IProps> = ({data}) => {
  return(
    <div>
      <h3>Following list</h3>
      <Stack gap={2}>
        {
          data?.map((v, i)=>{
            return((
              <Card key={i}>
                <Card.Header>
                  {v.name}
                </Card.Header>
                <Card.Body>
                  <Button variant="outline-secondary" >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))
          })
        }
      </Stack>
      <div className='mt-4 d-flex justify-content-center '>
        <Button variant="outline-secondary">More</Button>
      </div>
    </div>
  )
}

export default FollowingList;