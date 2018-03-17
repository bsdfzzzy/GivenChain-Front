const GivenToken = artifacts.require("./GivenToken.sol")
const Given = artifacts.require("./Given.sol")


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

        it("should be able to give money to given crowdfund", async () => {
            let given = await Given.deployed()

            await givenToken.crowdfund(100, given.address, {from: crowdfund})

            let balanceOfRichMan = await given.balanceOf(crowdfund)

            assert.equal(balanceOfRichMan, 100, "balance of rich man is 100")
        })
    })

})
