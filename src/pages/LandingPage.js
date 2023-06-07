import React, { useState } from "react";
import logo from "../../src/assets/logo.png";
import { Link } from "react-router-dom";


const LandingPage = () => {

    const[email, setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[disabled, setDisabled] = useState(true);
    const[message, setMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setDisabled(!e.target.value || !password);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setDisabled(!e.target.value || !email);
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     if (email === "admin" && password === "admin") {
    //       return (
    //       <Link to={"admin"}></Link>
    //       )
    //     } else {
    //       // Show error message
    //       setMessage("Incorrect email or password");
    //     }
    //   };
      

    return(
        <div>
            <div className="Navbar">
                <Link to="/">
                    <img src={logo} className="logo" alt="logo"/>
                </Link>
                <Link to={"home"}>
                    <button className="dashbutton">
                        CustomerLogin
                    </button>
                </Link>
            </div>
            <div className="formcontainer">
                <div className="adminform">
                    {/* <form onSubmit = {handleSubmit}> */}
                    <label>Admin Email:</label>
                    <input
                        type="text"
                        className="input_text"
                        onChange={handleEmailChange}
                        value={email} 
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        className="input_text"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    { email === "admin" && password === "admin" ? (
                    <Link to="/admin">
                        <button className="dashbutton" disabled={disabled}>
                        Admin Login
                        </button>
                    </Link>
                    ) : (
                    <button className="dashbutton" disabled={disabled} onClick={() => setMessage("incorrect email or password")}>
                        Admin Login
                    </button>
                    )}
                   
                    {/* </form> */}
                    {message && <p> {message} </p>}
            </div>
        </div>
        <hr className="hr" />
        </div>

    )
}

export default LandingPage;