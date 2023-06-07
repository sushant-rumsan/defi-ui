import React, { useContext, useState } from "react";
import { EthContext } from "../context/Ethstate";
import { useLocation } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import { ethers } from "ethers";
import defiAbi from "../abis/defi-abi.json";

const BorrowConfirm = () => {
  const { account, signer, provider } = useContext(EthContext);
  const myContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, defiAbi, signer);
  console.log("myContract", myContract);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount');
  const time = searchParams.get('time');
  const ethBorrow = searchParams.get('ethAmount');
  const borrowableAmount = amount * 10;
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleTermsAgreedChange = (e) => {
    setTermsAgreed(e.target.checked);
    setDisabled(!e.target.checked);
  }

  const handleBorrowNow = async (ethBorrow) => {
    setMessage("Processing your transaction:Verify the transcation when prompted")
    try {
        const overrides = {
            gasLimit: 50000
        };
        console.log(ethBorrow);
        const data = await myContract.depositEthBorrowUSDC(ethBorrow, overrides);
        console.info("contract call Success", data);
        setMessage("Transaction Successful");
    } catch (err) {
        console.error("Contract Call Failure", err);
        setMessage("Transaction Failed.", err)
    }
  }

  return (
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
              <div>
                  <h4>Connected Wallet:</h4> {account} 
                  <hr/>
                  <div>
                    <h3>Transaction Confirmation</h3>
                    <p>You have entered the borrow request with following details.</p>
                    <h6> Amount = {amount} ETH / {ethBorrow} ETHWei </h6>
                    <h6> Time = {time} year(s)</h6>
                    <h6> Borrowable Amount = {borrowableAmount} USDC</h6>
                    <hr/>
                    <p>You will be liable to pay the whole principle amount and interest at the end of the loan term. </p>
                    <p>Failure to pay the loan or drop in the market value of deposited collateral will result in liqudation of your deposited assets.</p>
                    <p>Proceed only if you have read and understood the whole terms and conditions. </p>
                    <div class="form-check">
                        <input
                            className="input_checkbox"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            onChange={handleTermsAgreedChange}/>
                        <label>
                            <p className="concent">I understand and wish to proceed.</p>
                        </label>
                    </div>
                    <button className="dashbutton" onClick={() => handleBorrowNow(ethBorrow)}disabled={disabled}>Proceed</button>
                    {message && <p>{message}</p>}
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

export default BorrowConfirm;