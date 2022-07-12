import React, { useEffect, useState } from 'react'
import { Button, Table, Form} from "react-bootstrap";

export default function Contactlist() {

    const[username, setUsername] = useState([]);

    useEffect(()=>{
        function fetchApi(){
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(res => setUsername(res))
            .catch(err => console.log(err))
        }
    
        fetchApi();
    }, [])


    function fetchApi(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(res => setUsername(res))
        .catch(err => console.log(err))
    }


    function updatecontact(id){
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          headers: {
            'Accept': "application/json",
            'Content-type': "application/json"
          },
          body: JSON.stringify()
        }).then((result)=>{
          result.json().then((resp)=>{
            console.log(resp);
          })
        }
        );
      }

    function deletecontact(id){
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
              method: "DELETE",
            }).then((results) => {
              results.json().then((res) => {
                console.log(res);
                fetchApi();
              });
            });
    }

  return (
    <>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>email</th>
          <th>Contact Number</th>
        </tr>
      </thead>

{
        username.map((item, i)=>{
            return <tbody>
            <tr>
              <td key={i}> {item.name}  </td>
              <td>         {item.email} </td>
              <td>         {item.phone} </td>
              <td>  <Button variant="secondary" onClick={updatecontact} >Update</Button>{' '} </td> 
              <td>  <Button variant="danger" onClick={deletecontact}> Delete </Button>{' '} </td> 
            </tr>
          
            </tbody>
        })
}
    </Table>

    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> UserName </Form.Label>
        <Form.Control type="text" placeholder="Enter your Name" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email address" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> Phone </Form.Label>
        <Form.Control type="number" placeholder="Enter Phone Number" />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Add Contact details
      </Button>
    </Form>

    </>
  )
}

