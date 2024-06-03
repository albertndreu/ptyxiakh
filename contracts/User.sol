// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;




contract User {


    address private owner;
    // Αντικατάσταση των Counters με απλούς unsigned integers
    uint private candidateIdCounter = 1;
    uint private documentIdCounter = 1;

    // mapping για τους candidates
    mapping(address => Candidate) private candidates;
    mapping(uint => address) private accounts;

    // mapping για τα documents
    mapping(uint => Document) private documents;
    mapping(address => uint[]) private userDocuments;
    mapping(uint => uint[]) private documentsByDate;

    // events
    event _totalfiles(address candidatesAddress);
    event candidateCreated(address indexed candidateAddress, string name);
    event documentCreated(address indexed documentAddress, string documentTitle);

    // δομή του candidate
    struct Candidate {
        uint id;
        uint totalFiles;
        string name;
        string fathersName;
        string lastName;
        string imageHash;
        uint afm;
        address candidateAddress;
    }

    // δομή του Document
    struct Document {
        uint id;
        string title;
        string description;
        bytes32 hash;
        address uploadedBy;
        uint timestamp;
    }


    constructor() {
        owner = msg.sender;
}
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
    _;
}

    // εγγραφή των candidates
    function registerCandidate(
        string calldata _name,
        string calldata _fathersname,
        string calldata _lastname,
        string calldata _imageHash,
        uint _afm
    ) external {
        uint candidateId = candidateIdCounter++;
        address _address = msg.sender;
        Candidate memory newCandidate = Candidate(candidateId, 0, _name, _fathersname, _lastname, _imageHash, _afm, _address);
        candidates[_address] = newCandidate;
        accounts[candidateId] = _address;
        emit candidateCreated(_address, _name);
    }

    // εισαγωγή αρχείων
    function registerDocument(string calldata _title, string calldata _description) external onlyOwner{
        uint documentId = documentIdCounter++;
        address _uploadedBy = msg.sender;
        bytes32 documentHash = keccak256(abi.encodePacked(_description));
        Document memory newDocument = Document(documentId, _title, _description, documentHash, _uploadedBy, block.timestamp);
        documents[documentId] = newDocument;
        userDocuments[_uploadedBy].push(documentId);

        // Αύξηση του συνολικού αριθμού αρχείων για τον υποψήφιο
        candidates[_uploadedBy].totalFiles += 1;

        emit documentCreated(_uploadedBy, _title);
        emit _totalfiles(_uploadedBy);
    }
    

    // λήψη εγγράφων χρήστη
    function getUserDocuments(address candidateAddress) external view returns (Document[] memory) {
        uint[] memory documentIdsArray = userDocuments[candidateAddress];
        Document[] memory userDocs = new Document[](documentIdsArray.length);
        for (uint i = 0; i < documentIdsArray.length; i++) {
            userDocs[i] = documents[documentIdsArray[i]];
        }
        return userDocs;
    }

    // λήψη συγκεκριμένου εγγράφου
    function getDocument(uint documentId) external view returns (Document memory) {
        return documents[documentId];
    }

    // λήψη όλων των εγγράφων
    function getAllDocuments() external view returns (Document[] memory) {
        uint itemCount = documentIdCounter - 1;
        Document[] memory allDocs = new Document[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            allDocs[i] = documents[i];
        }
        return allDocs;
    }
    // Αρχειοθέτηση αρχείων ανά ημερομηνία
    function archiveDocumentsByDate(uint _timestamp) external view returns (Document[] memory) {
        uint[] memory documentIdsArray = documentsByDate[_timestamp];
        Document[] memory archivedDocs = new Document[](documentIdsArray.length);
        for (uint i = 0; i < documentIdsArray.length; i++) {
            archivedDocs[i] = documents[documentIdsArray[i]];
        }
        return archivedDocs;
    }

    // λήψη όλων των candidates
    function fetchCandidates() onlyOwner external view returns (Candidate[] memory) {
        uint itemCount = candidateIdCounter - 1;
        Candidate[] memory tempCandidatesArray = new Candidate[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Candidate memory currentCandidate = candidates[accounts[currentId]];
            tempCandidatesArray[i] = currentCandidate;
        }
        return tempCandidatesArray;
    }

    function getDocumentsInAlphabeticalOrder() external view returns (Document[] memory) {
    uint itemCount = documentIdCounter - 1;
    Document[] memory allDocs = new Document[](itemCount);
    
    // Συλλογή όλων των εγγράφων
    for (uint i = 0; i < itemCount; i++) {
        allDocs[i] = documents[i + 1];
    }
    
    // Ταξινόμηση των εγγράφων με αλφαβητική σειρά του τίτλου
    sortDocuments(allDocs);
    
    return allDocs;
}

function sortDocuments(Document[] memory _documents) internal pure {
    uint n = _documents.length;
    for (uint i = 0; i < n-1; i++) {
        for (uint j = 0; j < n-i-1; j++) {
            if (compareStrings(_documents[j].title, _documents[j+1].title) > 0) {
                Document memory temp = _documents[j];
                _documents[j] = _documents[j+1];
                _documents[j+1] = temp;
            }
        }
    }
}

function compareStrings(string memory _a, string memory _b) internal pure returns (int) {
    bytes memory a = bytes(_a);
    bytes memory b = bytes(_b);
    uint minLength = a.length;
    if (b.length < minLength) minLength = b.length;
    for (uint i = 0; i < minLength; i++)
        if (a[i] < b[i])
            return -1;
        else if (a[i] > b[i])
            return 1;
    if (a.length < b.length)
        return -1;
    else if (a.length > b.length)
        return 1;
    else
        return 0;
}

}
