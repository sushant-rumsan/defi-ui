import React, { useEffect, useState } from "react";
import { EthContext } from "../context/Ethstate";
import { useContext } from "react";
import Navbar from "../Components/Navbar";
import usdcAbi from "../abis/usdc-abi.json";
import defiAbi from "../abis/defi-abi.json";
import { ethers } from "ethers";

const Stake = () => {
  const { metamaskConnect, account, signer, provider } = useContext(EthContext);
  const myContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, defiAbi, signer);
  const usdcContract = new ethers.Contract(process.env.REACT_APP_USDCCONTRACT, usdcAbi, signer);
  const [amount, setAmount] = useState("");
  const [stakeAmount, setStakeAmonut] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [message, setMessage] = useState("");

  useEffect (() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect (() => {
    setStakeAmonut(amount * 10**6)
  }, [amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setDisabled(!e.target.value || !termsAgreed);
  };

  const handleTermsAgreedChange = (e) => {
    setTermsAgreed(e.target.checked);
    setDisabled(!e.target.checked || !amount);
  };

  const callSenderApprove  = async (stakeAmount) => {
    setMessage("Processing your Transaction. Approve the metamask tranasactions when prompted.")
    try {
      const overrides = {
        gasLimit: 50000
      };
      const data = await usdcContract.approve(process.env.REACT_APP_CONTRACT, stakeAmount, overrides);
      console.log("data:", data);
      console.info("contract call successs", data);
      setMessage("Transaction Approved");
      //actual transfer function
      await handleStakeNow( stakeAmount );
    } catch (err) {
      console.error("contract call failure", err);
      setMessage("Couldnot approve your transaction");
    }
  }

  const handleStakeNow = async ( stakeAmount ) => {
    try {
      const overrides = {
        gasLimit: 50000
      };
      const data = await myContract.depositUSDCEarnInterest(stakeAmount)
      console.info("contract call successs", data);
      setMessage("Transaction Successful");
    } catch (err) {
      console.error("contract call failure", err);
      setMessage("Transaction Failed");
    }
  }

  return (
    <div>
      <Navbar />
      <hr className="hr"></hr>
      <div className="borrowform">
        <div className="guidelines">
          <h1>STAKE</h1>
          <ul>
            <li>Stake USDT and earn interest.</li>
            <li>Stake rate is 7.5%.</li>
            <li>
              Rates are dynamic and subject to change according to amount of
              ethereum staked in the pool.
            </li>
            <li>Interest is paid automatically every week in ethereum account.</li>
          </ul>
        </div>
        <hr className="hr_verticle" />
        <div className="form">
          {!account ? (
            <div>
              <div>
                <h3> Seems like you have not connected your wallet.</h3>
                <h2>
                  {" "}
                  Connect your meta mask wallet to deposit your assets and earn interest.
                </h2>
              </div>
              <button className="btn_family" onClick={(e) => {
                metamaskConnect(e)
              }}>Connect your metamask wallet now.</button>
            </div>
          ) : (
            <div>
              <h4>Connected Wallet:</h4> {account}
              <hr />
              <div>
                <label>Amount to Stake</label>
                <input
                  className="input_text"
                  type="number"
                  placeholder="Amount in USD"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              { stakeAmount ? <p>{stakeAmount} USDC WEI</p> : <p> 0 USDC WEI</p>}
              <div className="form-check">
                <input className="input_checkbox" type="checkbox" value="" id="flexCheckDefault" onChange={handleTermsAgreedChange}/>
                <label>
                  <p className="concent">I agree to the terms and conditions.</p>
                </label>
              </div>
              <button className="dashbutton" onClick={() => callSenderApprove( stakeAmount ) } disabled={disabled}>
                Stake Now
              </button>
              {message && <p>{message}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stake;
