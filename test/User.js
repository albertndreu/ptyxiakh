const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("User", function () {
  let User;
  let user;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    User = await ethers.getContractFactory("User");
    [owner, addr1, addr2] = await ethers.getSigners();

    user = await User.deploy();
    await user.waitForDeployment();
  });

  it("Should register a candidate", async function () {
    await user.connect(addr1).registerCandidate("John", "Doe", "Smith", "QmImageHash", 123456);
    const candidate = await user.getCandidate(addr1.address);
    expect(candidate.name).to.equal("John");
    expect(candidate.fathersName).to.equal("Doe");
    expect(candidate.lastName).to.equal("Smith");
    expect(candidate.imageHash).to.equal("QmImageHash");
    expect(candidate.afm).to.equal(123456);
  });

  it("Should register a document", async function () {
    await user.connect(owner).registerCandidate("John", "Doe", "Smith", "QmImageHash", 123456);
    await user.connect(owner).registerDocument("DocTitle", "DocDescription");
    const documents = await user.getUserDocuments(owner.address);
    expect(documents.length).to.equal(1);
    expect(documents[0].title).to.equal("DocTitle");
  });

  it("Should fetch all documents in alphabetical order", async function () {
    await user.connect(owner).registerCandidate("John", "Doe", "Smith", "QmImageHash", 123456);
    await user.connect(owner).registerDocument("Banana", "Description 1");
    await user.connect(owner).registerDocument("Apple", "Description 2");
    await user.connect(owner).registerDocument("Cherry", "Description 3");

    const sortedDocuments = await user.getDocumentsInAlphabeticalOrder();
    expect(sortedDocuments.length).to.equal(3);
    expect(sortedDocuments[0].title).to.equal("Apple");
    expect(sortedDocuments[1].title).to.equal("Banana");
    expect(sortedDocuments[2].title).to.equal("Cherry");
  });


it("Should fetch archived documents by date", async function () {
    await user.connect(owner).registerCandidate("John", "Doe", "Smith", "QmImageHash", 123456);

    // Register the first document and get its timestamp
    await user.connect(owner).registerDocument("DocTitle1", "Description1");
    const timestamp1 = await user.getCurrentTimestamp();

    // Adding delay to simulate different timestamps
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Register the second document and get its timestamp
    await user.connect(owner).registerDocument("DocTitle2", "Description2");
    const timestamp2 = await user.getCurrentTimestamp();

    // Adding delay to simulate different timestamps
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Register the third document and get its timestamp
    await user.connect(owner).registerDocument("DocTitle3", "Description3");
    const timestamp3 = await user.getCurrentTimestamp();

    // Fetch documents archived by the first timestamp
    const archivedDocuments1 = await user.archiveDocumentsByDate(timestamp1);
    expect(archivedDocuments1.length).to.equal(1);

    // Fetch documents archived by the second timestamp
    const archivedDocuments2 = await user.archiveDocumentsByDate(timestamp2);
    expect(archivedDocuments2.length).to.equal(1);

    // Fetch documents archived by the third timestamp
    const archivedDocuments3 = await user.archiveDocumentsByDate(timestamp3);
    expect(archivedDocuments3.length).to.equal(1);
  });


  it("Only owner can register documents", async function () {
    await user.connect(addr1).registerCandidate("John", "Doe", "Smith", "QmImageHash", 123456);
    await expect(user.connect(addr1).registerDocument("DocTitle", "DocDescription"))
      .to.be.revertedWith("Only the contract owner can perform this action");
  });
});
