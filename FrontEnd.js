// src/App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import DEX from './artifacts/contracts/DEX.sol/DEX.json';

const DEX_ADDRESS = 'YOUR_DEPLOYED_DEX_CONTRACT_ADDRESS';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [dexContract, setDexContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokenAddress, setTokenAddress] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const signer = provider.getSigner();
      setSigner(signer);

      const dexContract = new ethers.Contract(DEX_ADDRESS, DEX.abi, signer);
      setDexContract(dexContract);

      const balance = await provider.getBalance(signer.getAddress());
      setBalance(ethers.utils.formatEther(balance));
    }

    fetchData();
  }, []);

  const handleDeposit = async () => {
    const tokenContract = new ethers.Contract(tokenAddress, IERC20.abi, signer);
    await tokenContract.approve(DEX_ADDRESS, depositAmount);
    await dexContract.deposit(tokenAddress, depositAmount);
  };

  return (
    <div>
      <h1>Decentralized Exchange</h1>
      <p>Balance: {balance} ETH</p>
      <input 
        type="text" 
        placeholder="Token Address" 
        value={tokenAddress} 
        onChange={e => setTokenAddress(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={depositAmount} 
        onChange={e => setDepositAmount(e.target.value)} 
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}

export default App;
