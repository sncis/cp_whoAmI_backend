const express = require('express')
const request = require('supertest')
const router = require('../../fingerPrint/routes')
const db = require("../../db/dbConnection")
const schema = require('../../utils/JSONSchema')
const bodyParser = require("body-parser");


const app = express()

app.use('/', router)
app.use(bodyParser.json()); 


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
	fingerPrint:-1041013258}
]

const mockFingerprintData = {
	"Connection Type": '4g',
	"Vendor": "Apple Inc",
	"Language": 'en-us',
	"Languages": ['some','som other'],
	"Platform": 'some platofmr',
	"Device Memory":4,
	"Available CPU" : 4,
	"Installed Fonts" : 26,
	"Plugins": 'some plugin',
	"Keyboard Layout": 'QWERTY',
	"Browser": 'Google Chrome',
	"Browser Version": "12.3.454.2",
	"Timezone": 'some time ',
	"Browser Zoom Level": 100,
	"Device Orientation": 'true',
	"Touchscreen": 'device is a touch screen ',
	"Bluetooth" : 'Bluetooth available',
	"PDF Viewer enabled":'true',
	"Cookies enabled": 'YES',
	"Screen Resolution": `Width: 123 Height:2323 reenResolution.depth `
}


describe('Fingerprint routes', () => {
	beforeEach(()=> {
		jest.clearAllMocks()
	})

	it('GET route should return last visits', async() => {
		mockFind = () => Promise.resolve(mockEntries)

		const {body} = await request(app).get('/?id=1234')

		expect(body.data).toEqual(mockEntries)
	})
	it('GET route should return 500 when error in DB', async() => {
		mockFind = () => Promise.reject()

		await request(app).get('/?id=1234').expect(500)
	})


	it('should delete entries', async() => {
		mockDelete = () => Promise.resolve({deletedCount:1})
		const {body} = await request(app).delete('/?id=1234')
		const response = {data:{
			deletedCount:1}, 
			message: `1 entries has been deleted`}
		
		expect(body).toEqual(response)
		

	})
	it('should not delete entries', async() => {
		mockDelete = () => Promise.reject()
		const resp = await request(app).delete('/?id=1234').expect(500)	
	})

})

