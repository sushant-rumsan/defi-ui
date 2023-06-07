import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

export const EthContext = createContext( { provider: null, signer: null } );

export const EthProvider = ( props ) => {
    const [ provider, setProvider] = useState(null);
    const [ signer, setSigner] = useState(null);
    const [ account, setAccount] = useState(null);

    useEffect(() => {
        console.log("Provider:", provider);
        console.log("Signer:", signer);
        console.log("Account:", account);
    }, [provider, signer, account]);

    const metamaskConnect = async (e) => {
        e.preventDefault();
        if(typeof window.ethereum !== "undefined") {
            //enable Metamask connection
            await window.ethereum.enable();

            //create provider and signer objects
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            //set provider and signer state
            setProvider(provider);
            setSigner(signer);
            const address = await signer.getAddress();
            setAccount(address);
        } else {
            console.log("Metamask not installed");
        }
    }

    return (
        <EthContext.Provider value={{provider, signer, account, metamaskConnect}}>
            {props.children}
        </EthContext.Provider>
    );
}
