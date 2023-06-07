import React, { useContext, useState, useEffect } from "react";
import { EthContext } from "../context/Ethstate";
import { Link } from 'react-router-dom';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Navbar from "../Components/Navbar";
import { ethers } from "ethers";
import defiAbi from "../abis/defi-abi.json";
import { Button } from "react-bootstrap";

const Dashboard = () => {

    const { account, signer, provider } = useContext(EthContext)
    const myContract = new ethers.Contract(process.env.REACT_APP_CONTRACT, defiAbi, signer, provider);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState("");

    useEffect (() => {
        if (message) {
         const timer = setTimeout(() => {
            setMessage("");
         }, 5000);
         return () => clearTimeout(timer);
        }
    }, [message]);


    const getTotalDepositedUSDC = async(account) => {
        const  data = await myContract.depositedUSDCOfAddress(account);
        return data.toString();
    }

    useEffect (() => {
        getTotalDepositedUSDC(account).then((data) => setData(data / 10**6));
    })
    
    const handleWithdraw = async() => {
        setMessage("Processing your transaction. Verify the transcation when prompted.")
        try{
            const data = await myContract.withdrawUSDC();
            console.log("contract call success", data)
            setMessage("Tranasction Successful");
        } catch (err) {
            console.log("contract call failure", err);
            setMessage("Transaction Failed. Try Again.")
        }
    }

    // const displayRate = parseInt(interestRate) ;
    // const displayTotal = total / Math.pow(10, 18);

    return(
        <div>
            <Navbar />
            <hr className="hr"/>
            <div className="Dashboard">
                {!account?
                <div>
                    <h3> Seems like you have not connected your wallet.</h3>
                    <h2> Connect your meta mask wallet to view your dashboard.</h2>
                </div>
                :
                <div>
                    <div className="dashboard_main">
                        <div className="staked_part">
                            <h4> Your Assets </h4>
                            <table className="table">
                                <tbody>
                                    <tr>
                                    <td>Current interest Rate</td>
                                    <td>2%</td>
                                    {/* {isLoadingInterestRate ? <td>...</td> : <td>{`${displayRate}%`|| "x"}</td>} */}
                                    </tr>
                                    <tr>                            
                                    <td>Total Deposited USDC</td>
                                    {data === null ? <td>...</td> : <td>{data}</td>}
                                    <td>
                                        <Link to="/stake">
                                            <Button variant="danger">Stake More Assets</Button>
                                        </Link>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Total Interest Accured</td>
                                    <td>345</td>
                                    <td>
                                        <Button variant="danger">Withdraw Interest</Button>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Withdrawable Assets</td>
                                    <td>345</td>                                    
                                    <td>
                                        <Button variant="danger" onClick={() => handleWithdraw()}>Withdraw USDC</Button>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                {message && <p>{message}</p>}
                            <hr/>
                        </div>
                        <hr className="hr_verticle"/>
                        <div className="loaned_part">
                            <h4> Your Loans</h4>                      
                            <table class="table">
                                <tbody>
                                    <tr>
                                    <td>Current interest Rate</td>
                                    <td>7.5%</td>
                                    </tr>
                                    <tr>                            
                                    <td>Total Deposited Collateral</td>
                                    <td>341 ETH</td>
                                    <td>
                                        <Link to="/stake">
                                            <Button variant="primary">Increase Collateral</Button>
                                        </Link>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Total Loan Taken out</td>
                                    <td>$45.875</td>
                                    <td>
                                        <Link to="/borrow">
                                        <Button variant="primary">Take more loans</Button>
                                        </Link>
                                    </td>
                                    </tr>
                                    <tr>                                
                                    <td>Due Payment</td>
                                    <td>$45.875</td>
                                    <td>
                                        <Button variant="primary">Pay Now</Button>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>

                            <hr/>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Dashboard;