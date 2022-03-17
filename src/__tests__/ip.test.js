const express = require('express')
const request = require('supertest')
const axios = require('axios')
const ipRoutes = require('../ip/routes')

const app = express()

app.use('/ip', ipRoutes)

const infos= {
	status: 'success',
	country: 'Germany',
	countryCode: 'DE',
	region: 'BY',
	regionName: 'Bavaria',
	city: 'Munich',
	zip: '80331',
	lat: 48.1336,
	lon: 11.5658,
	timezone: 'Europe/Berlin',
	isp: '16 originated by AS35244',
	org: '',
	as: 'AS35244 Tele Columbus AG',
	query: '46.128.226.84'
}

jest.mock('axios')

describe('IP routes', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it('should return Ip information deom external API when GET request', async() => {
		 axios.get.mockImplementationOnce(() => Promise.resolve({data:infos}))
	
		const {body} = await request(app).get('/ip')

		expect(axios.get).toHaveBeenCalled()
		expect(body.data).toEqual(infos)
	})

	it('should throw error when no resp.body', async() => {
		axios.get.mockImplementationOnce(() => Promise.resolve({}))

		const resp = await request(app).get('/ip')
		console.log(resp.body)
		expect(resp.body).toEqual({})
		expect(resp.statusCode).toEqual(204)
	})
})