const idValidator = (id) => {
	const regex = '^[\-\\\d*]+$'
	return !id ? false : !!id.match(regex)
}

const ipValidator =(ip) => {
	console.log('ip valid caled')
	const regex = '^([0-9]{1,3})\\.([0-9]{1,3})\\.([0-9]{1,3})\\.([0-9]{1,3})$'
	return !ip ? false : !!ip.match(regex)
}

module.exports={
	ipValidator,
	idValidator
}