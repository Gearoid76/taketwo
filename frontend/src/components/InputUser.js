import React,{ Fragment, useState } from "react";

const InputUser = () => {

    const [ username, setUsername ] = useState("");      
    const [ password, setPassword] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await fetch("http://localhost:4000/auth", { 
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location ="/";
            console.log(response);
        } catch (err) {
            console.error(err.message)
        }
    
    }

    return (
        <Fragment>
        <h2 className="text-center mt-5">Input userlist</h2>
        <div className="container" width="70%">
            <div className="mb-4">
            <form className="mt-5" onSubmit={onSubmitForm}>
                    <div className="form-column">
                        <div className="row">
                            <input 
                                type="text"  
                                className="form-control" 
                                placeholder="user" //from username
                                required
                                value={username}   //from username
                                onChange={e => setUsername(e.target.value)}
                                />
                        </div>
                        <div className="row">
                        <input 
                                type="text"  // changed from text/password
                                id="pass"
                                minLength="8" 
                    //          required 
                                className="form-control" 
                                placeholder="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                                />
                        </div>
                        <button className="btn btn-primary mt-5">login</button>
                    </div>
            </form>
            </div>
        </div>   
        </Fragment>
    )
};
export default InputUser;