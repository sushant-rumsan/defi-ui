import React, { useContext, useState } from "react";
import { EthContext } from "../context/Ethstate";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Navbar from "../Components/Navbar";

const Transfer = () => {

    const { metamaskConnect, account } = useContext(EthContext)
    const { contract } = useContract(process.env.REACT_APP_CONTRACT);
    const { usdcContract } = useContract(process.env.REACT_APP_USDCCONTRACT);
    const { mutateAsync: approve, isLoading } = useContractWrite(usdcContract, "approve")
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [gas, setGas] = useState('Select Gas');
    const [disabled, setDisabled] = useState(true);

    const callTransferFunction = async (recipient, amount) => {

    }

    const callSenderApprove  = async (account, recipient, amount) => {
        try {
          const data = await approve({ args: [account, amount] });
          console.info("contract call successs", data);
          //actual transfer function
          await callTransferFunction(recipient, amount);
        } catch (err) {
          console.error("contract call failure", err);
          return "Couldnot approve your transaction" + err.message;
        }
      }

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
        setDisabled(!e.target.value || !amount || !gas || !termsAgreed);
    };
    
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setDisabled(!e.target.value || !recipient || !gas || !termsAgreed);
    };    

    const handleGasChange = (e) => {
        setGas(e.target.value);
        setDisabled(!e.target.value || !recipient || !amount || !termsAgreed);
    };
    
    const handleTermsAgreedChange = (e) => {
        setTermsAgreed(e.target.checked);
        setDisabled(!e.target.checked || !recipient || !amount || !gas);
    };

    // const callTransferFunction = async (recipient, amount) => {
    //     try {
    //       const data = await transferUSDC( recipient, amount );
    //       console.info("contract call successs", data);
    //     } catch (err) {
    //       console.error("contract call failure", err);
    //     }
    //   }

    return(
        <div>
            <Navbar/>
            <hr className="hr"/>
        <div className="borrowform">
            <div className="guidelines">
                <h1>TRANSFER</h1>
                <ul>
                    <li>Transfer funds from your account to any other address easily and securely.</li>
                    <li>High gas fee equals faster transactions.</li>
                    <li>Gas fees are deducted automaticallys from your wallet when the transfer transaction is performed.</li>
                    <li>Gas fees can be dynamic depending on the amount of transaction traffic.</li>
                </ul>

            </div>
            <hr className="hr_verticle"/>
            <div className="form">
                { (!account)?
                <div>
                    <div>
                        <h3> Seems like you have not connected your wallet.</h3>
                        <h2> Connect your meta mask wallet to transfer funds.</h2>
                    </div>
                    <button className="btn_family" onClick={(e)=>{metamaskConnect(e)}}>Connect your metamask wallet now.</button>
                </div>
                :
                <div>
                    <h4>Connected Wallet:</h4> {account} 
                    <hr/>
                    <div>
                        <label>Recepient's Wallet Address</label>
                        <input 
                            className="input_text" 
                            type="string"
                            value={recipient}
                            onChange={handleRecipientChange}
                        />
                    </div>
                    <div>
                        <label>Amount to Transfer</label>
                        <input 
                            className="input_text" 
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <select className="input_text" aria-label="Default select example" onChange={handleGasChange}>
                        <option selected>Select Gas</option>
                        <option value="1">High Gas</option>
                        <option value="2">Medium Gas</option>
                        <option value="3">Low Gas</option>
                    </select>
                    <p>If you donot select any gas, the most suitable gas will be automatically selected for you.</p>
                    <div class="form-check">
                        <input className="input_checkbox" type="checkbox" value="" id="flexCheckDefault" onChange={handleTermsAgreedChange}/>
                        <label>
                            <p className="concent">I agree to the terms and conditions.</p>
                        </label>
                    </div>
                    <button className="dashbutton" onClick={() => callSenderApprove(account, recipient, amount) } disabled={disabled}>Transfer Now</button>
                </div>
                }
            </div>
        </div>
    </div>
    )
}

export default Transfer;