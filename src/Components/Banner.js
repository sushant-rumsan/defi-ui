import React from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Link } from 'react-router-dom';

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
                <p className='line2'> DECENTRALIZED LIQUIDITY POOL</p>
                <p className='line3'> Earn Interest, Borrow Assets and build applications.</p>
            </div>
            <div className='Banner-right'>
                <p className='topic'>Total Deposited ETH</p>
                <p className='detail'>32,414 ETH</p>
                <hr/>
                <p className='topic'>Total Interest Accured</p>
                <p className='detail'>{isLoadingtotalinterest ? <p>...</p> : <p>{ displayTotal }</p>}
                {/* <p className='detail'>{isLoadingtotalinterest ? <p>...</p> : <p>{ displayTotal }</p>} */}
                <hr/></p>
                <p className='topic'>Total USDC Locked In Pool:</p>
                <p className='detail'>1234</p>
            </div>
        </div>
    </div>
    )
}

export default Banner;