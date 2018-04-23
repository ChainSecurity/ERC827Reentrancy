var Eve = artifacts.require("Eve");
var VulnerableCrowdsale = artifacts.require("VulnerableCrowdsale");
var crowdsaleCoin = artifacts.require("CarelessCrowdsaleCoin");

module.exports = function(deployer) {
   
    deployer.deploy(crowdsaleCoin, web3.eth.accounts[1], 10**10).then(function() {
        
        owner = web3.eth.accounts[1];
        return deployer.deploy(VulnerableCrowdsale, 2, owner, crowdsaleCoin.address, {from: owner, value: 1000}).then(function(instance) {
            //saleInst = instance.deployed();
           //crowdsaleInstance = instance.address;
            //buyer = web3.eth.accounts[2];
            //saleInst.setUserCap(buyer, 1000, {from: owner});
            
            return deployer.deploy(Eve, {value: 10000});
        });
    });
   
    
}
