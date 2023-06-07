import React, { useContext, useEffect, useState } from "react";
import { EthContext } from "../context/Ethstate";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Button } from "react-bootstrap";


const Borrow = () => {

    const { metamaskConnect, account } = useContext(EthContext)

    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false)
    const [disabled, setDisabled] = useState(true);
    const [ethBorrow, setEthBorrow] = useState("");

    useEffect (() => {
        setEthBorrow(amount * 10**18)
    }, [amount]);


    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setDisabled(!e.target.value || !time || !termsAgreed);
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        setDisabled(!e.target.value || !amount || !termsAgreed);
    }

    const handleTermsAgreedChange = (e) => {
        setTermsAgreed(e.target.checked);
        setDisabled(!e.target.checked || !amount || !time);
    }

    return(
        <div>
        <Navbar />
        <hr className="hr"/>
        <div className="borrowform">
            <div className="guidelines">
                <h4>BORROW</h4>
               
                    <li>Deposit Ethereum as collateral and borrow USDT.</li>
                    <li>Borrow rate is 8%.</li>
                    <li>Assest will be liquidated if interest not paid on time or value of collateral drops below borrow rate.</li>
                    <li>Rates are dynamic and subject to change according to amount of ethereum staked in the pool.</li>
                

            </div>
            <div className="form">
                { (!account)?
                <div>
                    <div>
                        <h3> Seems like you have not connected your wallet.</h3>
                        <h2> Connect your meta mask wallet to view your dashboard.</h2>
                    </div>
                    <Button variant="danger"  onClick={(e)=>{metamaskConnect(e)}}>Connect your metamask wallet now.</Button>
                </div>
                :
                <div>
                    <div>
                        <label>Amount to Stake</label><br />
                        <input
                            className="input_text"
                            type="number"
                            onChange={handleAmountChange} />
                    </div>
                    { ethBorrow ? <p style={{fontSize: "0.7em"}}>{ethBorrow} ETH Wei</p> : <p style={{fontSize: "0.7em"}}>0 ETH Wei</p>}
                    <div>
                        <label>Time Period (in years) </label><br />
                        <input
                            className="input_text"
                            type="number"
                            onChange={handleTimeChange} />
                    </div>
                    <div>
                        <input
                            className="input_checkbox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            onChange={handleTermsAgreedChange}/>
                        <label>
                            <p className="concent">I have read and agree to the terms and conditions.</p>
                        </label><br />
                    </div>
                    <Link to={{ 
                        pathname: "/borrow/borrowconfirm",
                        search: `?amount=${amount}&time=${time}&ethAmount=${ethBorrow}`
                        }}>
                        <Button variant="danger" disabled={disabled}>Borrow Now</Button>
                    </Link>
                </div>
                }
            </div>
        </div>
    </div>
    )
}

export default Borrow;