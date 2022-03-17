const { fingerPrintReqSchema }= require('../utils/JSONSchema')
const { Validator } = require("express-json-validator-middleware");

const { validate } = new Validator()


const fingerPrint =  {
	connectionType: '4g',
	vendor: 'Apple',
	language: 'en-US',
	fingerPrint:12345,
	visited:"2022-02-11T14:29:12.322Z"
}

describe("Fingerprint Schema", () => {
	it('should validate schema to true', () => {
		const fingerPrint =  {
			connectionType: '4g',
			vendor: 'Apple',
			language: 'en-US',
			fingerPrint:12345,
			visited:"2022-02-11T14:29:12.322Z"
		}
		const valid = validate({fingerPrintReqSchema},fingerPrint)
		expect(valid).toBeTruthy()
	})

	it('should validate schema to false when no fingerprint', () => {
		const fingerPrint =  {
			connectionType: '4g',
			vendor: 'Apple',
			language: 'en-US',
			visited:"2022-02-11T14:29:12.322Z"
		}
		const valid = validate({fingerPrintReqSchema},fingerPrint)
		expect(valid).toThrowError()
	})
})