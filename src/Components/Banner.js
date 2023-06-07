import React from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';
import { Button } from 'react-bootstrap';

const Banner = () => {
    // const checkBalance = process.env.REACT_APP_CONTRACT
    const { contract } = useContract(process.env.REACT_APP_CONTRACT);
    const { data: totalinterest, isLoading: isLoadingtotalinterest } = useContractRead(contract, "viewTotalCollectedInterest");

    const displayTotal = parseInt(totalinterest);
    
    return (
    <div>
        {/* <Navbar /> */}
        <div className='Banner'>
            <div className='Banner-left'>
                <h2> Be your own bank,</h2>
                <h2 style={{color: "red",}}> 
                <ReactTypingEffect
        text={["Earn Interest..", "Reveive Loan..", "Transfer.."]}
        speed="150"
        eraseSpeed="100"
        typingDelay="0"
        eraseDelay = "500"
      /></h2>
                <p style={{width: "70%"}}>Decentralized Finance let you be in control of your own money instead of a third party bank. Earn interest in your asset, take loan and keep contolling your asset.</p>
                <Button style={{width: "70%"}} variant="danger">Get started</Button>
            </div>
            <div className='Banner-right'>
                <div>
                <img className="animatePig" src="rightImg.png" style={{width: "380px"}} alt="" />
                </div>
                <div className="descriptons">
                <div>
                <p className='topic'>Total ETH</p>
                <p className='detail'>32,414</p>
                </div>
                <div>
                <p className='topic'>Total Interest </p>
                <p className='detail'>{isLoadingtotalinterest ? <p>...</p> : <p>{ displayTotal }</p>}
                </p>
                </div>
                <div>
                <p className='topic'>Total USDC</p>
                <p className='detail'>1,234</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Banner;