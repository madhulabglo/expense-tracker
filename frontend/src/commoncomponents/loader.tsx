import React from 'react'
import { Spinner } from 'react-bootstrap'

const  Loader : React.FC = () =>{
  return (
    <Spinner animation="grow" role="status" style={{height:'100px',width:'100px',margin:'auto',display:'block'}}>
    </Spinner>
  )
}

export default Loader