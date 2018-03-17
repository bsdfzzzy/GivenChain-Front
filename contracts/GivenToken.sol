pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./Given.sol";

contract GivenToken is StandardToken {
    string public name = "GivenToken";
    string public symbol = "GVT";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 1000000000;

    function GivenToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function crowdfund(uint256 _value, address _to) public {
        transfer(_to, _value);
        Given given = Given(_to);
        given.recordFunding(msg.sender, _value);
    }

    function withdraw(uint256 _value, address _from) public {
        Given given = Given(_from);
        given.withdraw(msg.sender, _value);
        balances[msg.sender] = balances[msg.sender].add(_value);
        balances[_from] = balances[_from].sub(_value);
    }
}
