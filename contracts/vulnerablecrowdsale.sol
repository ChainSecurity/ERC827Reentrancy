pragma solidity ^0.4.19;
import "zeppelin-solidity/contracts/crowdsale/validation/IndividuallyCappedCrowdsale.sol";

contract VulnerableCrowdsale is IndividuallyCappedCrowdsale  {
    function VulnerableCrowdsale(uint256 _rate, address _wallet, ERC827Token _token) public payable ERC827Crowdsale(_rate, _wallet, _token){}
   
    
}
