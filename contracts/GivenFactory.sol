pragma solidity ^0.4.18;

import "./Given.sol";

contract GivenFactory {
  event NewGiven(address indexed _addr);
  address[] public contracts;

  function newGiven(string _ownerName, address _endorser, uint256 _fundingAmount) public returns (address newContract) {
    Given given = new Given(_ownerName, _endorser, _fundingAmount);
    contracts.push(given);
    NewGiven(given);
    return given;
  }

  function listContracts() public view returns(address[]) {
      return contracts;
  }
}
