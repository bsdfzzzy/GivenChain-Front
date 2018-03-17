const GivenFactory = artifacts.require("./GivenFactory.sol")
const Given = artifacts.require("./Given.sol")

contract('Given chain', (accounts) => {

    describe("Factory", () => {
        let givenFactory
        beforeEach(async function() {
            givenFactory = await GivenFactory.new()
        })

        it("should be able to new a given crowdfunding", async () => {
            let given = await givenFactory.newGiven("patient", accounts[0], 1)
            console.log("New Contract crowdfunding is created : " + JSON.stringify(given.logs[0].address))
        })

        it("should be able to get all contracts", async () => {

            let given = await givenFactory.newGiven("patient", accounts[0], 1)
            let given1 = await givenFactory.newGiven("patient", accounts[0], 1)

            let contracts = await givenFactory.listContracts()

            assert.equal(contracts.length, 2, "should have two items")
        })
    })

})

