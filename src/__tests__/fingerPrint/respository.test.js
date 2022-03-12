const repo = require('../../fingerPrint/repository')
const db = require("../../db/dbConnection")

let mockInsertOne = jest.fn()
let mockFind = jest.fn()
let mockDelete = jest.fn()

jest.mock('../../db/dbConnection', () => {
	return {
		connect: () => Promise().resolve(),
		get : () => {
			return{
				collection: () => {
					return {
						insertOne : () => mockInsertOne(),
						find: () => {
							return {
								toArray: () => mockFind()
							}
						},
						deleteMany: () => mockDelete()

					}
				}
			}
		}	}
})

const mockEntries = [{visited:"2022-02-03T14:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-10T14:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-11T14:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-12T11:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-13T14:27:35.323Z",
	fingerPrint:-1041013258}]


describe('FingerprintRepo', () => {
	beforeEach(()=> {
		jest.clearAllMocks()
	})

	it('should store fingerprint', async() => {
		mockInsertOne = () => Promise.resolve({insertedId:12345678})
		const result = await repo.storeFingerprint({data:12345})
			expect(result).toEqual({insertedId:12345678})
	})

	it('storeFingerprint should catch error when DatabaseError', async() => {
		const data = {fingerPrint:12345}
		mockInsertOne = () => Promise.reject()
		
		await repo.storeFingerprint(data).catch(error => {
			expect(error.message).toEqual(`Failed to Insert data for Fingerprint 12345 into DB`)
		})
	})


	it('should find Entries', async() => {
		mockFind = () => Promise.resolve(mockEntries)
		let entries = await repo.findEntries(-1041013258)
		expect(entries).toEqual(mockEntries)

	})
	it("find should throw error", async() => {
		mockFind = () => Promise.reject()
		
		await repo.findEntries(-1041013258).catch(error => {
			expect(error.message).toEqual(`Failed to find entries for fingerprint -1041013258`)
		})
	})

	it("should delete entries", async() => {
		mockDelete = () => Promise.resolve(	{deletedCount:1})
		
		let entries = await repo.deleteEntries(-1041013258)
		expect(entries).toEqual({deletedCount:1})
	})

	it('delete should throw erro', async() => {
		mockDelete = () => Promise.reject()
		
		await repo.deleteEntries(-1041013258).catch(error => {
			expect(error.message).toEqual(`Could not delete data for Fingerprint -1041013258`)
		})
	})

})