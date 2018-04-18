var VulnerableCrowdsale = artifacts.require("VulnerableCrowdsale");
var Eve = artifacts.require("Eve");
var CarelessCrowdsaleCoin = artifacts.require("CarelessCrowdsaleCoin");
contract('VulnerableCrowdsale', function(accounts) {
    it("should have initial balance 1000", function() {
        return VulnerableCrowdsale.deployed().then(function(instance){
            var balance = web3.eth.getBalance(instance.address).toNumber();
            assert.equal(balance, 1000);
        });
    });
    it("should set user cap for Eve to 1000", function() {
        return VulnerableCrowdsale.deployed().then(function(saleinstance){
            return Eve.deployed().then(function(eveinstance){
                var owner = web3.eth.accounts[1];
                return saleinstance.setUserCap(eveinstance.address, 1000, {from: owner}).then(function() {
                    return saleinstance.getUserCap(eveinstance.address).then(function(eveCap) {
                        var cap = eveCap.toNumber();
                        console.log(cap);
                        assert.equal(cap, 1000);
                    });
                });
                
            });
        });
    });

    it("should accept 20 wei from eve", function() {
        return VulnerableCrowdsale.deployed().then(function(saleinstance){
            return Eve.deployed().then(function(eveinstance){
                var owner = web3.eth.accounts[1];
                var oldBalance = web3.eth.getBalance(saleinstance.address).toNumber();
                return saleinstance.setUserCap(eveinstance.address, 1000, {from: owner}).then(function() {
                    return eveinstance.exploitReentrancy(saleinstance.address, 20).then(function() {
                        var newBalance = web3.eth.getBalance(saleinstance.address).toNumber();
                        assert.equal(newBalance, oldBalance + 20); 
                        
                    });
                });
                
            });
        });
    });

    it("should receive 10,000 tokens from owner", function() {
        return VulnerableCrowdsale.deployed().then(function(saleinstance){
            var owner = web3.eth.accounts[1];
            return CarelessCrowdsaleCoin.deployed().then(function(coinInstance) {
                return coinInstance.transfer(saleinstance.address, 10000, {from: owner}).then(function() {
                   return coinInstance.balanceOf(saleinstance.address).then(function(tokens){
                        var amount = tokens.toNumber();
                        assert.equal(amount, 10000);
                   });
                });
            });
            return Eve.deployed().then(function(eveinstance){
                var owner = web3.eth.accounts[1];
                var oldBalance = web3.eth.getBalance(saleinstance.address).toNumber();
                return saleinstance.setUserCap(eveinstance.address, 1000, {from: owner}).then(function() {
                    return eveinstance.exploitReentrancy(saleinstance.address, 20).then(function() {
                        var newBalance = web3.eth.getBalance(saleinstance.address).toNumber();
                        assert.equal(newBalance, oldBalance + 20); 
                        
                    });
                });
                
            });
        });
    });
    
    it("can transfer tokens", function() {
        return VulnerableCrowdsale.deployed().then(function(saleinstance){
            return Eve.deployed().then(function(eveinstance){
                return CarelessCrowdsaleCoin.deployed().then(function(token){

                    return token.transfer(eveinstance.address, 20, {from: saleinstance.address}).then(function() {
                       return token.balanceOf(eveinstance.address).then(function(amount) {
                           var balance = amount.toNumber();
                           assert.equal(balance, 20);
                       })
                    });
                });
                
                    
                
                
            });
        });
    });
    

    it("should update contributions[] mapping by 20 wei", function() {
        return VulnerableCrowdsale.deployed().then(function(saleinstance){
            return Eve.deployed().then(function(eveinstance){
                var owner = web3.eth.accounts[1];
                
                
                    
                       
                        return saleinstance.getUserContribution(eveinstance.address).then(function(contrib){
                            var evecontrib = contrib.toNumber();
                            assert.equal(evecontrib, 20);
                        });
                    
                
                
            });
        });
    });

});


