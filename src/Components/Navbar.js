import { React, useContext } from "react";
import { Link } from 'react-router-dom';
import { EthContext } from "../context/Ethstate";
import { Button } from 'react-bootstrap';
import { BsWallet } from "react-icons/bs";

const Navbar = () => {

    const { metamaskConnect, metamaskDisconnect, account } = useContext(EthContext);

    return (
        <div className="Navbar">
            {/* <div>
                <Link to="/home">
                    <img src={logo} className="logo" alt="logo"/>
                </Link>
            </div> */}
            <div className="linksContainer">
                <Link to="/dashboard" className="Link">DASHBOARD</Link>
                <Link to="/stake" className="Link">STAKE</Link>
                <Link to="/Borrow" className="Link">BORROW</Link>
                <Link to="/transfer" className="Link">TRANSFER</Link>
            </div>
            {!account ? 
            <Button variant="danger" style={{marginRight: "50px"}} onClick={(e)=>{metamaskConnect(e)}}> <BsWallet/> Connect Wallet </Button>:
            <Link to="/"><Button variant="disabled" style={{marginRight: "50px"}}><div style={{display: 'flex', alignItems: "center", gap: "5px"}}> <span style={{width: '7px', height: '7px', borderRadius: "50%", backgroundColor: "rgb(45, 255, 45)"}}></span> <span onClick={(e)=>{metamaskDisconnect(e)}} style={{fontSize: '0.8em', color: "gray"}}> {account} </span></div> </Button></Link>
            
            }
        </div>
    )
}

export default Navbar;