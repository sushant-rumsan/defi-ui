import { React, useContext } from "react";
import logo from "../../src/assets/logo.png";
import { Link } from 'react-router-dom';
import { EthContext } from "../context/Ethstate";
import { Button } from 'react-bootstrap';

const Navbar = () => {

    const { metamaskConnect, metamaskDisconnect, account } = useContext(EthContext);

    return (
        <div className="Navbar">
            <div>
                <Link to="/home">
                    <img src={logo} className="logo" alt="logo"/>
                </Link>
            </div>
            <ul className="Links">
                <Link to="/dashboard" className="Link">DASHBOARD</Link>
                <Link to="/stake" className="Link">STAKE</Link>
                <Link to="/Borrow" className="Link">BORROW</Link>
                <Link to="/transfer" className="Link">TRANSFER</Link>
                <Button> Click </Button>
            </ul>
            {!account ? 
            <button className="btn_family" onClick={(e)=>{metamaskConnect(e)}}>Connect Wallet</button>:
            <button className="btn_family" onClick={(e)=>{metamaskDisconnect(e)}}> Wallet Connected </button>
            }
        </div>
    )
}

export default Navbar;