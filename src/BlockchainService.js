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
// Function to get documents for a specific user
export const getUserDocuments = async (candidateAddress) => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const userDocs = await contract.getUserDocuments(candidateAddress);
      console.log('User Documents:', userDocs);
      return userDocs;
    } catch (error) {
      console.error('Error fetching user documents:', error);
      return [];
    }
  }
};

// Function to get a specific document by ID
export const getDocument = async (documentId) => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const document = await contract.getDocument(documentId);
      console.log('Document:', document);
      return document;
    } catch (error) {
      console.error('Error fetching document:', error);
      return null;
    }
  }
};

// Function to get all documents
export const getAllDocuments = async () => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const allDocuments = await contract.getAllDocuments();
      console.log('All Documents:', allDocuments);
      return allDocuments;
    } catch (error) {
      console.error('Error fetching all documents:', error);
      return [];
    }
  }
};

// Function to archive documents by date
export const archiveDocumentsByDate = async (timestamp) => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const archivedDocs = await contract.archiveDocumentsByDate(timestamp);
      console.log('Archived Documents:', archivedDocs);
      return archivedDocs;
    } catch (error) {
      console.error('Error archiving documents:', error);
      return [];
    }
  }
};

// Function to fetch all candidates (onlyOwner)
export const fetchCandidates = async () => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const candidates = await contract.fetchCandidates();
      console.log('Candidates:', candidates);
      return candidates;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  }
};

// Function to get documents in alphabetical order
export const getDocumentsInAlphabeticalOrder = async () => {
  const contract = await connectToBlockchain();
  if (contract) {
    try {
      const sortedDocuments = await contract.getDocumentsInAlphabeticalOrder();
      console.log('Sorted Documents:', sortedDocuments);
      return sortedDocuments;
    } catch (error) {
      console.error('Error fetching sorted documents:', error);
      return [];
    }
  }
};