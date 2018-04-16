pragma solidity ^0.4.19;


import "zeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";

contract CarelessCrowdsaleCoin is ERC827Token {

    function CarelessCrowdsaleCoin(address initialAccount, uint256 initialBalance) public {
        balances[initialAccount] = initialBalance;
        totalSupply_ = initialBalance;
    }

}