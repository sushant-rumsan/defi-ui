
//  READ FUNCTIONS NOT WORKING; WRITE FUNCTIONS WORKING

import React, { useState, useContext, useEffect } from "react";
import { EthContext } from "../context/Ethstate";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import defiAbi from "../abis/defi-abi.json";
const { isAddress } = require('ethers/lib/utils');


const Admin = () => {

    const { metamaskConnect, account, signer, provider } = useContext(EthContext);

    const myContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, defiAbi, signer, provider);
    console.log("contract:", myContract);

    const [stakerKey, setStakerKey] = useState("");
    const [borrowerKey, setBorrowerKey] = useState("");

    const [stakerData, setStakerData] = useState("");
    const [stakingAmount, setStakingAmount] = useState("");
    const [stakingDate, setStakingDate] = useState("");
    const [collectedInterest, setCollectedInterest] = useState("");

    const [borrowerData, setBorrowerData] = useState("");
    const [borrowedAmt, setBorrowedAmt] = useState("");
    const [collateralAmt, setCollateralAmt] = useState("");
    const [borrowedDate, setBorrowedDate] = useState("");
    const [dueInterest, setDueInterest] = useState("")
    const [ethRate, setEthRate] = useState("");

    const [disabled1, setDisabled1] = useState(true);
    const [disabled2, setDisabled2] = useState(true);

    const [ message1, setMessage1 ] = useState("");
    const [ message2, setMessage2 ] = useState("");

    useEffect (() => {
        if (message1 || message2) {
            const timer = setTimeout(() => {
                setMessage1("");
                setMessage2("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message1, message2]);

    useEffect (() => {
        if (stakerData) {
            const [stakingAmount, stakingDate, collectedInterest] = stakerData;
            setStakingAmount(stakingAmount / 10**6);
            const date = new Date(((stakingDate.toNumber() * 1000)))
            setStakingDate(date.toLocaleString());
            setCollectedInterest(collectedInterest.toString());
        }
    }, [stakerData]);

    useEffect (() => {
        if (borrowerData) {
            const [borrowedAmt, collateralAmt, borrowedDate, dueInterest, ethRate] = borrowerData;
            setBorrowedAmt(borrowedAmt / 10**6);
            setCollateralAmt(collateralAmt / 10**18);
            const date = new Date(((borrowedDate.toNumber() * 1000)));
            setBorrowedDate(date.toLocaleString());
            setDueInterest(dueInterest.toString());
            setEthRate(ethRate.toString());
        }
    }, [borrowerData]);

    const handleDistributeInterest = async () => {
        setMessage1("Processing your transaction...");
        try {
            const data = await myContract.distributeInterest();
            console.info("contract call successs", data);
            setMessage1("Successfully distributed interest to all stakers");
          } catch (err) {
            console.error("contract call failure", err);
            setMessage1("Transaction failed");
          }
        }

    const handleAddInterstToBorrower = async () => {
        setMessage1("Processing your transaction...");
        try {
            const data = await myContract.addInterestToBorrower();
            console.info("contract call successs", data);
            setMessage1("Successfully added Interest to Borrower");
          } catch (err) {
            console.error("contract call failure", err);
            setMessage1("Transaction failed" + err);
          }
    }

    const handleLiquidate = async () => {
        setMessage1("Processing your transaction...");
        try {
            const data = await myContract.liquidate();
            console.info("contract call successs", data);
            setMessage1("Successfully Liquidated")
          } catch (err) {
            console.error("contract call failure", err);
                setMessage1("Transaction failed" + err);
          }
    }

    const handleStakerKeyChange = (e) => {
        setStakerKey(e.target.value)
        setDisabled1(!e.target.value)
        setStakerData("");
    }

    const handleBorrowerKeyChange = (e) => {
        setBorrowerKey(e.target.value)
        setDisabled2(!e.target.value)
        setBorrowerData("");
    }

    const getStakerData = async (stakerKey) => {
        console.log(stakerKey);
        try {
            if (isAddress(stakerKey)) {
                const  stakerData = await myContract.stakerData(stakerKey);
                console.log("Staker data" ,stakerData);
                setStakerData(stakerData);
            } else {
                const stakerAcc = await myContract.stakerId(stakerKey);
                console.log("staker Acc:", stakerAcc);
                const stakerData = await myContract.stakerData(stakerAcc);
                setStakerData(stakerData);
            }
        } catch (err) {
            setMessage2("Invalid Key or Address")
        }
    }

    const getBorrowerData = async (borrowerKey) => {
        console.log(borrowerKey);
        console.log(isAddress(borrowerKey));
        try {
            if (isAddress(borrowerKey)) {
                const borrowerData = await myContract.borrowerData(borrowerKey);
                setBorrowerData(borrowerData);
            } else if (!Number.isInteger(borrowerKey)) {
                const borrowerAcc = await myContract.borrowerIDArray(borrowerKey);
                console.log(borrowerAcc);
                const borrowerData = await myContract.borrowerData(borrowerAcc);
                setBorrowerData(borrowerData);
            }
        } catch (err) {
            setMessage2("Invalid Key Or Address.")
        }
    }

    return (
        <div>
            <div className="Navbar">
                <div>
                    <Link to="/admin">
                        <img src={logo} className="logo" alt="logo"/>
                    </Link>
                </div>
                <div>
                    <h6>Deployed Contract: {process.env.REACT_APP_CONTRACT}</h6>
                    <h6>USDC Contract: {process.env.REACT_APP_USDCCONTRACT}</h6>
                </div>
            </div>
            <hr className="hr"></hr>
            <div className="admindashboard">
                <div className="functions">
                    <h3>Admin Function buttons</h3>
                    <button className="adminbutton" onClick={handleDistributeInterest}>
                        Distribute Interest to Stakers
                    </button>
                    <button className="adminbutton" onClick={handleAddInterstToBorrower}>
                        Add Interst to Borrower
                    </button>
                    <button className="adminbutton" onClick={handleLiquidate}>
                        Liquidate Unpaid Loans
                    </button>
                    <Link to={'/'}>
                        <button className="dashbutton">
                            Log Out
                        </button>   
                    </Link>
                    { !account ? 
                        <button className="dashbutton" onClick={(e) => {metamaskConnect(e)}}>
                        Connect wallet
                        </button> :
                        <button className="dashbutton">
                        Connected
                        </button>
                    }
                                
                    {message1 && <p>{message1}</p>}
                </div>
                
                <hr className="hr_verticle"/>
                <div className="admindetails">
                    <h3>Admin Details dashboard</h3>
                    <div className="adminform">
                        <h5>Staker's data:</h5>
                        <input
                        type="text"
                        className="input_text"
                        placeholder="Staker's Address or ID"
                        onChange={handleStakerKeyChange}
                        value={stakerKey} 
                        />
                        <button className="dashbutton" disabled={disabled1} onClick={()=> getStakerData (stakerKey)} >Get Data</button>
                    </div>
                    { stakerData &&
                    <table className="adminTable">
                    <thead>
                      <tr>
                        <th>Staking Amount</th>
                        <th>Staked Date</th>
                        <th>Collected Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{stakingAmount}</td>
                        <td>{stakingDate}</td>
                        <td>{collectedInterest}</td>
                      </tr>
                    </tbody>
                  </table>
                }
                    <hr />
                    <div className="adminform">
                        <h5>Borrower's Data:</h5>
                        <input
                            type="text"
                            className="input_text"
                            placeholder="Borrower's Address or ID"
                            onChange={handleBorrowerKeyChange}
                            value={borrowerKey} 
                        />
                        <button className="dashbutton" disabled={disabled2} onClick={() => getBorrowerData(borrowerKey)}>Get Data</button>
                    </div>
                    {borrowerData &&
                        <table className="adminTable">
                            <thead>
                            <tr>
                                <th>Borrowed Amount</th>
                                <th>Collateral Amount</th>
                                <th>Borrowed Date</th>
                                <th>Due Interest</th>
                                <th>Rate Of Eth</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{borrowedAmt}</td>
                                <td>{collateralAmt}</td>
                                <td>{borrowedDate}</td>
                                <td>{dueInterest}</td>
                                <td>{ethRate}</td>
                            </tr>
                            </tbody>
                        </table>
                    }
                    {message2 && <p>{message2}</p>}
                </div>
            </div>
        </div>
    )
};

export default Admin;