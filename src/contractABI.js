export const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "candidatesAddress",
        "type": "address"
      }
    ],
    "name": "_totalfiles",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "candidateAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "candidateCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "documentAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "documentTitle",
        "type": "string"
      }
    ],
    "name": "documentCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_timestamp",
        "type": "uint256"
      }
    ],
    "name": "archiveDocumentsByDate",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "uploadedBy",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct User.Document[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fetchCandidates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalFiles",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fathersName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageHash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "afm",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "candidateAddress",
            "type": "address"
          }
        ],
        "internalType": "struct User.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllDocuments",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "uploadedBy",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct User.Document[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_candidateAddress",
        "type": "address"
      }
    ],
    "name": "getCandidate",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalFiles",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fathersName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageHash",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "afm",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "candidateAddress",
            "type": "address"
          }
        ],
        "internalType": "struct User.Candidate",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_fathersname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_afm",
        "type": "uint256"
      }
    ],
    "name": "registerCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "registerDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
