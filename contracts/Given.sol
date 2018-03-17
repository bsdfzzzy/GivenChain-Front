pragma solidity ^0.4.18;


contract Given {
    string public ownerName = "";
    uint256 public fundingAmount;
    address public endorser;
    State public state;

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

    function confirmed() public onlyEndorser {
        state = State.Confirmed;
    }

    function isAvaible() public view returns(bool) {
        return state == State.Confirmed;
    }
}
