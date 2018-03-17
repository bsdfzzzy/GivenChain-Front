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
        let owner = accounts[3]

        beforeEach(async () => {
            givenToken = await GivenToken.deployed()
            given = await Given.new("PoorGuy", endorser, 150, {from: owner})
            await given.confirmed({from: endorser})
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

        it("should be able to complete crowdfund after fundingAmout satisfied", async () => {
            // funding amout is 150 tokens here.
            await givenToken.crowdfund(151, given.address, {from: crowdfund})
            let totalBalance = await given.totalBalance()
            
            assert.equal(totalBalance, 151, "total balance should be 151")
            let isCompleted = await given.state()

            assert.equal(isCompleted, 2, "crowdfund is completed")
        })

        it("should be able to withdraw token from given crowdfund after owner approve", async () => {
            await givenToken.crowdfund(150, given.address, {from: crowdfund})
            let totalBalance = await given.totalBalance()
            
            assert.equal(totalBalance, 150, "total balance should be 100")
            await given.approved({from: owner})

            let state = await given.state()

            assert.equal(state, 3, "state should be in Approved")

            await given.withdraw(100, {from: endorser})

            totalBalance = await given.totalBalance()
            state = await given.state()

            assert.equal(totalBalance, 50, "should remains 50 tokens")
            assert.equal(state, 2, "should back to Completed status")

            try {
                await given.approved({from: owner})
                await given.withdraw(100, {from: endorser})
            } catch( e ) {
                assert.match(e.message, /revert/, "should have thrown cuz there is no enough tokens to withdraw")
            }
        })
    })
})
