var Eve = artifacts.require("Eve");
var VulnerableCrowdsale = artifacts.require("VulnerableCrowdsale");
var crowdsaleCoin = artifacts.require("CarelessCrowdsaleCoin");

module.exports = function(deployer) {
   
    deployer.deploy(crowdsaleCoin, web3.eth.accounts[1], 10**10).then(function() {
        owner = web3.eth.accounts[1];
        return deployer.deploy(VulnerableCrowdsale, 2, owner, crowdsaleCoin.address, {from: owner}).then(function(instance) {
            //VulnerableCrowdsale.
           // crowdsaleInstance = instance;
            //buyer = web3.eth.accounts[2];
            //crowdsaleInstance.setUserCap(buyer, 1000, {from: owner});
            return deployer.deploy(Eve, {value: 1000});
        });
    });
   
    
}
