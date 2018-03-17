pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Given {
    using SafeMath for uint256;
    string public ownerName = "";
    uint256 public fundingAmount;
    address public endorser;
    mapping (address => uint256) public participantBalances;
    State public state;
    uint256 public totalBalance;
  
    event Crowdfund(address _from, uint256 _value);
    event Money(uint256 _value);

 
    enum State { Unconfirmed, Confirmed }

    modifier onlyEndorser() {
        require(msg.sender == endorser);
        _;
    }

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    function Given(string _ownerName, address _endorser, uint256 _fundingAmount) public {
        ownerName = _ownerName;
        endorser = _endorser;
        fundingAmount = _fundingAmount;
        state = State.Unconfirmed;
    }

    function confirmed() public onlyEndorser inState(State.Unconfirmed) {
        state = State.Confirmed;
    }

    function isAvaible() public view returns(bool) {
        return state == State.Confirmed;
    }

    function recordFunding(address _from, uint256 _value) public {
        require(totalBalance.add(_value) <= fundingAmount);
        Crowdfund(_from, _value);
        totalBalance = totalBalance.add(_value);

        participantBalances[_from] = participantBalances[_from].add(_value);
    }

    function balanceOf(address _who) public view returns(uint256) {
        return participantBalances[_who];
    }
}
