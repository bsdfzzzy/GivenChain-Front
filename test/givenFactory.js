const GivenFactory = artifacts.require("./GivenFactory.sol")
const Given = artifacts.require("./Given.sol")

contract('Given chain', (accounts) => {

    describe("Factory", () => {
        let givenFactory
        beforeEach(async function() {
            givenFactory = await GivenFactory.deployed()
        })

        it("should be able to new a given crowdfunding", async () => {
            let given = await givenFactory.newGiven("patient", accounts[0], 1)
            console.log("New Contract crowdfunding is created : " + JSON.stringify(given.logs[0].address))
        })
    })

})

