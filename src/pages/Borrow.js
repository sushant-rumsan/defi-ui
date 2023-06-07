import React, { useContext, useEffect, useState } from "react";
import { EthContext } from "../context/Ethstate";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";


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
                <h1>BORROW</h1>
                <ul>
                    <li>Deposit Ethereum as collateral and borrow USDT.</li>
                    <li>Borrow rate is 8%.</li>
                    <li>Assest will be liquidated if interest not paid on time or value of collateral drops below borrow rate.</li>
                    <li>Rates are dynamic and subject to change according to amount of ethereum staked in the pool.</li>
                </ul>

            </div>
            <hr className="hr_verticle"/>
            <div className="form">
                { (!account)?
                <div>
                    <div>
                        <h3> Seems like you have not connected your wallet.</h3>
                        <h2> Connect your meta mask wallet to view your dashboard.</h2>
                    </div>
                    <button className="btn_family" onClick={(e)=>{metamaskConnect(e)}}>Connect your metamask wallet now.</button>
                </div>
                :
                <div>
                    <h4>Connected Wallet:</h4> {account} 
                    <hr/>
                    <div>
                        <label>Amount to Stake</label>
                        <input
                            className="input_text"
                            type="number"
                            placeholder="Amount in ETH"
                            onChange={handleAmountChange} />
                    </div>
                    { ethBorrow ? <p>{ethBorrow} ETH Wei</p> : <p>0 ETH Wei</p>}
                    <div>
                        <label>Time Period of the loan</label>
                        <input
                            className="input_text"
                            type="number"
                            placeholder="in year(s)"
                            onChange={handleTimeChange} />
                    </div>
                    <div class="form-check">
                        <input
                            className="input_checkbox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            onChange={handleTermsAgreedChange}/>
                        <label>
                            <p className="concent">I agree to the terms and conditions.</p>
                        </label>
                    </div>
                    <Link to={{ 
                        pathname: "/borrow/borrowconfirm",
                        search: `?amount=${amount}&time=${time}&ethAmount=${ethBorrow}`
                        }}>
                        <button className="dashbutton" disabled={disabled}>Borrow Now</button>
                    </Link>
                </div>
                }
            </div>
        </div>
    </div>
    )
}

export default Borrow;