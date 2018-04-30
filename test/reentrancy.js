var VulnerableCrowdsale = artifacts.require("VulnerableCrowdsale");
var Eve = artifacts.require("Eve");
var CarelessCrowdsaleCoin = artifacts.require("CarelessCrowdsaleCoin");
contract('VulnerableCrowdsale', function(accounts) {

    let eveInstance, saleInstance, token, owner;

    beforeEach(async function() {
        token = await CarelessCrowdsaleCoin.deployed();
        saleInstance = await VulnerableCrowdsale.deployed();
        eveInstance = await Eve.deployed();
        owner = web3.eth.accounts[1];
    })

    it("should have initial balance 1000", async function() {
        let balance = web3.eth.getBalance(saleInstance.address).toNumber();
        assert.equal(balance, 1000);
    });
    
    it("should set user cap for Eve to 100", async function() {
        await saleInstance.setUserCap(eveInstance.address, 100, {from: owner});
        let eveCap = (await saleInstance.getUserCap(eveInstance.address)).toNumber();
        assert.equal(eveCap, 100);
    });
                
    it("should receive 10,000 tokens from owner", async function() {
        await token.transfer(saleInstance.address, 10000, {from: owner});
        let tokenAmount = (await token.balanceOf(saleInstance.address)).toNumber();
        assert.equal(tokenAmount, 10000);
    });
            
    it("should accept 20 wei from eve", async function() {
        let oldBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        //await saleInstance.setUserCap(eveInstance.address, 1000, {from: owner});
        await eveInstance.exploitReentrancy(saleInstance.address, 20, 0); 
        let newBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        assert.equal(newBalance, oldBalance + 20);    
    });
     /*           
    it("can transfer tokens", async function() {
        let oldBalance = (await token.balanceOf(eveInstance.address)).toNumber();
        await saleInstance._deliverTokens(eveInstance.address, 20);
        let newBalance = (await token.balanceOf(eveInstance.address)).toNumber();
        assert.equal(newBalance - oldBalance, 20);
    });
    */
    
    it("should update contributions[] mapping by 20 wei", async function() {
        let eveContrib = (await saleInstance.getUserContribution(eveInstance.address)).toNumber();
        assert.equal(eveContrib, 20);
    });

    it("should NOT accept (20 + 180) wei from Eve with standard (non-reentrant) call", async function() {
        let oldBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        //await saleInstance.setUserCap(eveInstance.address, 1000, {from: owner});
        let evesOldTokenAmount = (await token.balanceOf(eveInstance.address)).toNumber();
        await eveInstance.exploitReentrancy(saleInstance.address, 180, 0); 
        let evesNewTokenAmount = (await token.balanceOf(eveInstance.address)).toNumber();
        let newBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        let eveContrib = (await saleInstance.getUserContribution(eveInstance.address)).toNumber();
        assert.equal(evesOldTokenAmount, evesNewTokenAmount);
        assert.equal(eveContrib, 20);
        assert.equal(newBalance, oldBalance);    
    });
/*
    it("SHOULD accept (20 + 45 + 45) wei from Eve with reentrant call", async function() {
        let oldBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        //await saleInstance.setUserCap(eveInstance.address, 1000, {from: owner});
        let evesOldTokenAmount = (await token.balanceOf(eveInstance.address)).toNumber();
        await eveInstance.exploitReentrancy(saleInstance.address, 45, 1); 
        let evesNewTokenAmount = (await token.balanceOf(eveInstance.address)).toNumber();
        let newBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        let eveContrib = (await saleInstance.getUserContribution(eveInstance.address)).toNumber();
        assert.equal(evesOldTokenAmount + 180, evesNewTokenAmount);
        assert.equal(eveContrib, 110);
        assert.equal(newBalance, oldBalance + 90);    
    });
    */

    it("SHOULD accept (20 + 45 + 45 + 45 + 45) wei from Eve with reentrant calls", async function() {
        let oldBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        //await saleInstance.setUserCap(eveInstance.address, 1000, {from: owner});
        let evesOldTokenAmount = (await token.balanceOf(eveInstance.address)).toNumber();
        await eveInstance.exploitReentrancy(saleInstance.address, 45, 3); 
        let evesNewTokenAmount = (await token.balanceOf(eveInstance.address)).toNumber();
        let newBalance = web3.eth.getBalance(saleInstance.address).toNumber();
        let eveContrib = (await saleInstance.getUserContribution(eveInstance.address)).toNumber();
        assert.equal(evesOldTokenAmount + 360, evesNewTokenAmount);
        assert.equal(eveContrib, 200);
        assert.equal(newBalance, oldBalance + 180);    
    });

});


