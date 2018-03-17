const GivenToken = artifacts.require("./GivenToken.sol")
const Given = artifacts.require("./Given.sol")


contract('Given Token', (accounts) => {
    let crowdfund 
    let endorser 
    let richMan 
    before(function() {
        crowdfund = accounts[0]
        endorser = accounts[1]
        richMan = accounts[2]
    })

    describe("Crowdfund", () => {
        let givenToken 
        let given

        beforeEach(async () => {
            givenToken = await GivenToken.deployed()
            given = await Given.new("PoorGuy", endorser, 150)
        })

        it("should have initial tokens", async () => {
            let balance = await givenToken.balanceOf(crowdfund) 

            assert.equal(balance, 1000000000, "the initial tokens is not 1000000000")
        })

        it("should be able to donate tokens to given crowdfund", async () => {
            await givenToken.crowdfund(100, given.address, {from: crowdfund})

            let balanceOfCrowdfund = await given.balanceOf(crowdfund)

            assert.equal(balanceOfCrowdfund, 100, "balance of crowdfund is 100")
        })

        it("should be able to aggrate tokens in given crowdfund", async () => {
            await givenToken.crowdfund(100, given.address, {from: crowdfund})
            // rich man buy buy buy some tokens from crowdfund token
            await givenToken.transfer(richMan, 50, {from: crowdfund})

            await givenToken.crowdfund(50, given.address, {from: richMan})
            let balanceOfRichMan = await given.balanceOf(richMan)

            assert.equal(balanceOfRichMan, 50, "balance of richman is 50")
            let totalBalance = await given.totalBalance()

            assert.equal(totalBalance, 150, "total balance should be 150")
        })
    })
})
