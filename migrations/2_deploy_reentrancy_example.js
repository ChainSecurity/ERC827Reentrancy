var Eve = artifacts.require("Eve");
var VulnerableCrowdsale = artifacts.require("VulnerableCrowdsale");
var crowdsaleCoin = artifacts.require("CarelessCrowdsaleCoin");

module.exports = function(deployer) {
   
    deployer.deploy(crowdsaleCoin, web3.eth.accounts[1], 10**10).then(function() {
       return deployer.deploy(VulnerableCrowdsale, 2, web3.eth.accounts[1], crowdsaleCoin.address);
            //return deployer.deploy(Eve);
        });
   // });
   
    
}
