import React from 'react'
import borrowgraphic from "../../src/assets/borrowgraphic.png";
import transfergraphic from "../../src/assets/transfergraphic.png";
import stakegraphic from "../../src/assets/stakegraphic.png";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom';

const Belt = () => {
    return (
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                    <div className="card">
                        <img src={borrowgraphic} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Borrow</h5>
                            <p className="card-text">Deposit Ethereum as collateral and borrow USDT. Borrow rate is 8%. Rates are dynamic and subject to change according to amount of ethereum staked in the pool. Terms and conditions apply.</p>
                            <Link to="/borrow"><button className="btn_family_card">Borrow</button> </Link>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card">
                        <img src={stakegraphic} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Stake</h5>
                            <p className="card-text">Stake USDT and earn interest. Stake rate is 7.5%. Rates are dynamic and subject to change according to amount of ethereum staked in the pool. Interest is paid automatically every week in ethereum account.</p>
                            <Link to="/stake"><button className="btn_family_card">Stake</button> </Link>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card">
                        <img src={transfergraphic} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Transfer</h5>
                            <p className="card-text">Transfer funds from your account to any other address easily and securely with gas fee of your choice. High gas fee equals faster transactions allowing you to perform even the most urgent transactions securely with ease.</p>
                            <Link to="/transfer"><button className="btn_family_card">Transfer</button> </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>        
    )
}

export default Belt;