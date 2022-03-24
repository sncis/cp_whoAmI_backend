const validators = require('../utils/validators')

describe('IpValidator', () => {
	it('should return true for valid ip', () => {
		expect(validators.ipValidator('123.454.23.12')).toBeTruthy()
	})	
	it('should return true for valid ip', () => {
		expect(validators.ipValidator('123.454.23.12')).toBeTruthy()
	})	
	it('should return true for valid ip', () => {
		expect(validators.ipValidator('123.44.23.12')).toBeTruthy()
	})
	it('should return false for invalid ip', () => {
		expect(validators.ipValidator('123.45')).toBeFalsy()
	})
	it('should return false for invalid ip', () => {
		expect(validators.ipValidator('123.45.')).toBeFalsy()
	})
	

})