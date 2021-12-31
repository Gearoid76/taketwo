import React,{ Fragment, useEffect, useState } from "react";

import EditUser from "./EditUser";

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    //delete user function 

    const deleteUser = async (id) => {
        try {
         const deleteUser = await fetch (`http://localhost:4000/auth/${id}`, {
             method: "DELETE"
         });

        setUsers(users.filter(user => user.user_id !== id));
        } catch (err) {
            console.log(err.message)
            
        }
    }

    const getUsers = async () => {
        try {
            
            const response = await fetch("http://localhost:4000/auth") //check out users AND PORT 4001 at the end!!!
            const jsonData = await response.json();

            setUsers(jsonData);
        } catch (err) {
                console.error(err.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
    <Fragment>
        <h2> List Users </h2>
        <table className="table table-striped mt-5 text-center">
  <thead>
    <tr>
      <th scope="col">User ID</th>
      <th scope="col">User Name</th>
      <th scope="col">Password</th>
      <th scope="col">email</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th> 
    </tr>
  </thead>
  <tbody>
     {/*<th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */} 
    {users.map(user => (
        <tr key= {user.user_id}>
            <td>{user.user_id}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.email}</td>
            <td><EditUser user={user} /></td> 
            <td><button className="btn btn-danger" onClick={() => deleteUser(user.user_id)}>Delete</button></td>
        </tr>
    ))}  
  </tbody>
</table>
    
    </Fragment>
    );
};

export default ListUsers;