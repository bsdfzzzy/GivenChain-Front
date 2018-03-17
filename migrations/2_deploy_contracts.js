var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TutorialToken = artifacts.require("./TutorialToken.sol");
var ComplexStorage = artifacts.require("./ComplexStorage.sol");
var GivenToken = artifacts.require("./GivenToken.sol");
var Given = artifacts.require("./Given.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(GivenToken);
  deployer.deploy(Given, "hello", web3.eth.accounts[0], 10);
};
