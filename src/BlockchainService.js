import { ethers } from 'ethers';
import { contractABI, contractAddress } from './contractABI';

// Function to connect to the blockchain
export const connectToBlockchain = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  } else {
    console.error('Ethereum object not found. Install MetaMask.');
    return null;
  }
};

// Function to register a candidate
export const registerCandidate = async (name, fathersname, lastname, imageHash, afm) => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const transaction = await contract.registerCandidate(name, fathersname, lastname, imageHash, afm);
      await transaction.wait();
      console.log('Candidate registered');
    } catch (error) {
      console.error('Error registering candidate:', error);
    }
  }
};

// Function to register a document
export const registerDocument = async (title, description) => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const transaction = await contract.registerDocument(title, description);
      await transaction.wait();
      console.log('Document registered');
    } catch (error) {
      console.error('Error registering document:', error);
    }
  }
};
