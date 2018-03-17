pragma solidity ^0.4.18;

contract Given {
    string public ownerName = "";
    uint256 public fundingAmount;
    address public endorser;

    function Given(string _ownerName, address _endorser, uint256 _fundingAmount) public {
        ownerName = _ownerName;
        endorser = _endorser;
        fundingAmount = _fundingAmount;
    }
}
