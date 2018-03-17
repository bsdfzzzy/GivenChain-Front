pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract Given {
    using SafeMath for uint256;
    string public ownerName = "";
    uint256 public fundingAmount;
    address public owner;
    address public endorser;
    mapping (address => uint256) public participantBalances;
    uint256 public totalBalance;
    
    State public state;
  
    event Crowdfund(address _from, uint256 _value);
    event Withdraw(address _who, uint256 _value);
 
    enum State { Unconfirmed, Confirmed, Completed, Approved }

    modifier onlyEndorser() {
        require(msg.sender == endorser);
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
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
        owner = msg.sender;
        state = State.Unconfirmed;
    }

    function confirmed() public onlyEndorser inState(State.Unconfirmed) {
        state = State.Confirmed;
    }

    function isAvaible() public view returns(bool) {
        return state == State.Confirmed;
    }

    function recordFunding(address _from, uint256 _value) public inState(State.Confirmed) {
        if(totalBalance.add(_value) >= fundingAmount) {
            state = State.Completed;
        }

        Crowdfund(_from, _value);
        totalBalance = totalBalance.add(_value);

        participantBalances[_from] = participantBalances[_from].add(_value);
    }

    function balanceOf(address _who) public view returns(uint256) {
        return participantBalances[_who];
    }

    function approved() public onlyOwner inState(State.Completed) {
        state = State.Approved;
    }

    function withdraw(address _who, uint256 _value) inState(State.Approved) public {
        require(_who == endorser);
        require(_value <= totalBalance);
        Withdraw(msg.sender, _value);

        totalBalance = totalBalance.sub(_value);
        // change back to completed status to wait for approved of next withdraw
        state = State.Completed;
    }
}
