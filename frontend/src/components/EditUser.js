import React, { Fragment, useState }  from "react";
const EditUser = ({ user }) => {
    
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email,setEmail] = useState(user.email);
    

    //edit username and password function  = User function

        const updateUser = async e => {
            e.preventDefault();
            try {
                const body = { username, password, email };
                const response = await fetch(`http://localhost:4000/auth/${user.user_id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }) 

                window.location ="/";
                console.log(response); // to remove the warning that response is never used
            } catch (err) {
                console.error(err.message);
            }
        }

        

         const placeHolder = async e => {
            try {
                const body = { username, password, email };
                const response = await fetch(`http://localhost:4000/auth/${user.user_id}`, ) 

                window.location ="/";
            } catch (err) {
                console.error(err.message);
            }
        }


    console.log(user);
    return (
    <Fragment>
       <button type="button" className="btn btn-warning btn" data-toggle="modal" data-target={`#id${user.user_id}`} 
       >Edit
       </button>

            <div className="modal fade" id={`id${user.user_id}`} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit User</h4>
                            <button 
                                type="button" 
                                className="close" 
                                data-dismiss="modal"
                                onClick={e => placeHolder(e)}
                                >&times; 
                            </button>
                    </div>
                        <div className="modal-body">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={username}
                                placeholder="Username" 
                                onChange={e => setUsername(e.target.value)}/>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={password}
                                placeholder="Password" 
                                onChange={e => setPassword(e.target.value)}/>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={email}
                                placeholder="e-mail"
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-warning" 
                                    data-dismiss="modal"
                                    onClick={e => updateUser(e)}>

                                        Save

                                </button>
                                        
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    data-dismiss="modal"
                                    onClick={e => placeHolder(e)}
                                    >  

                                        Dismiss

                                </button>
                            </div>
                </div>

            </div>
            </div>
    </Fragment>
    );
}


export default EditUser;