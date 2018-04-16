var Eve = artifacts.require("Eve");
var vulnerableCrowdsale = artifacts.require("vulnerablecrowdsale");
var crowdsaleCoin = artifacts.require("CarelessCrowdsaleCoin");

module.exports = function(deployer) {
   
    deployer.deploy(crowdsaleCoin, web3.eth.accounts[1], 10**10).then(function() {
       return deployer.deploy(vulnerableCrowdsale, 2, web3.eth.accounts[1], crowdsaleCoin.address);
            //return deployer.deploy(Eve);
        });
   // });
   
    
}