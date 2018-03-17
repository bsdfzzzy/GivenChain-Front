const GivenToken = artifacts.require("./GivenToken.sol")


contract('Given Token', (accounts) => {
    let crowdfund 
    let endorser 
    before(function() {
        crowdfund = accounts[0]
        endorser = accounts[1]
    })

    describe("Crowdfund", () => {
        let givenToken 
        
        beforeEach(async () => {
            givenToken = await GivenToken.deployed()
        })

        it("should have initial tokens", async () => {
            let balance = await givenToken.balanceOf(crowdfund) 

            assert.equal(balance, 1000000000, "the initial tokens is not 1000000000")
        })
    })
})
