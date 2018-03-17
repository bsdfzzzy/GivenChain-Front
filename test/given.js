const Given = artifacts.require("./Given.sol")

contract('Given chain', (accounts) => {
    let endorser 
    let nonEndorser

    before(async function() {
        endorser = accounts[1]
        nonEndorser = accounts[2]
    })

    describe("Patient", () => {
        let given
        beforeEach(async function() {
            given = await Given.new("patient", endorser, 1)
        })

        it("should be able to publish a crowdfunding", async () => {
            let name = await given.ownerName()
            let _endorser = await given.endorser()
            let _fundingAmount = await given.fundingAmount()

            assert.equal(name, "patient", "patient's name is not correct")
            assert.equal(_endorser, endorser, "endorser's is not the same")
            assert.equal(_fundingAmount, 1, "fundingAmount is not equal it should be")
        })

    })

    describe("Endorser", () => {
        let given
        beforeEach(async function() {
            given = await Given.new("patient", endorser, 1)
        })

        it("should be able to confirm a created crowdfunding", async () => {
            let createdState = await given.state()

            await given.confirmed({from: endorser})

            let afterConfirmedState = await given.state()

            assert.equal(createdState, 0, "crowdfunding is in unconfirmed state")
            assert.equal(afterConfirmedState, 1, "crowdfunding is in confirmed state")
        })

        it("if not real endorser should be not able to confirm", async () => {
            try {
                await given.confirmed({from: nonEndorser})
            } catch( e ) {
                assert.match(e.message, /revert/, "should have thrown")
            }

            let state = await given.state()

            assert.equal(state, 0, "crowdfunding is still in unconfirmed state")
        })
    })

    describe("Platform", () => {
        let given
        beforeEach(async function() {
            given = await Given.new("patient", endorser, 1)
        })

        it("if not real endorser should be not able to confirm", async () => {
            await given.confirmed({from: endorser})

            let isReadyToPublish = await given.isAvaible()

            assert.equal(isReadyToPublish, true, "crowdfunding is ready to publish")
        })
    })

})

