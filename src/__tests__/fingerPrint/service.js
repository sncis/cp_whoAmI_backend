const service = require('../../fingerPrint/service')


let mockStore = jest.fn()
let mockVisit = jest.fn()
let mockDelete = jest.fn()

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (sessionData) => {
  return {
    query: { query: sessionData.query },
		body: { body: sessionData.body },
  };
};

jest.mock('../../fingerPrint/repository',() => {
	return{
		storeFingerprint:() => mockStore(),
		findEntries:() => mockVisit(),
		deleteEntries:() => mockDelete()
	}
})

describe("FingerprintService", () => {
	const data={query:1, body:'some data'}
	const req = mockRequest(data)
	const res = mockResponse()
	const	next = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()

	
	})

	it('should storefingerprint', async() => {
		await service.storeFingerprint(req,res,next)
		expect(res.status).toHaveBeenCalledWith(201)
		expect(res.json).toHaveBeenCalledWith({data:'fingerprint stored succesfully'})

	})

	it('storefingerprint should call next with error', async() => {
		mockStore = () => Promise.reject()
		
		await service.storeFingerprint(req,res,next)
		expect(next).toHaveBeenCalledTimes(1)
		expect(res.status).not.toHaveBeenCalled()
		expect(res.json).not.toHaveBeenCalled()

	})


	it('should get last visits', async() => {
		const visits = [{visited:"2022-02-03T14:29:12.322Z",
		fingerPrint:-1041013258},
		{visited:"2022-02-10T14:29:12.322Z",
		fingerPrint:-1041013258}]

		mockVisit = () => Promise.resolve(visits)

		await service.getLastVisits(req,res,next)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({data:visits})


	})

	it('getLastVisists should call next with error', async() => {
		mockVisit = () => Promise.reject()
		await service.getLastVisits(req,res,next)
		expect(next).toHaveBeenCalledTimes(1)
		expect(res.status).not.toHaveBeenCalled()
		expect(res.json).not.toHaveBeenCalled()

	})



	it('should delete entries', async() => {
		const count = {deletedCount:2}
		mockDelete = () => Promise.resolve(count)

		await service.deleteEntries(req,res,next)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith(
			{data:{
				deletedCount:2}, 
				message: `2 entries has been deleted`}
		)
	})

	it('deleteEntries should call next with error', async() => {
		mockDelete = () => Promise.reject()
		await service.deleteEntries(req,res,next)

		expect(next).toHaveBeenCalledTimes(1)
		expect(res.status).not.toHaveBeenCalled()
		expect(res.json).not.toHaveBeenCalled()

	})


})

