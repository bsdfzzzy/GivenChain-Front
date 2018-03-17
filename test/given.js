const Given = artifacts.require("./Given.sol")

contract('Given chain', (accounts) => {
    let endorser = accounts[1]
    it("should be able to publish a crowdfunding", async () => {
        let given = await Given.new("patient", endorser, 1)
        let name = await given.ownerName()
        let _endorser = await given.endorser()
        let _fundingAmount = await given.fundingAmount()
        
        assert.equal(name, "patient", "patient's name is not correct")
        assert.equal(_endorser, endorser, "endorser's is not the same")
        assert.equal(_fundingAmount, 1, "fundingAmount is not equal it should be")
    })
})

