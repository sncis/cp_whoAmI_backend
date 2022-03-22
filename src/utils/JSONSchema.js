
exports.fingerPrintReqSchema = {
	type:"object",
	required: ["fingerPrint", 'visited'],
	properties:{
		"fingerPrint":{
			type:"number",
			minLength:1
		},
		"visited":{
			type:"string",
			minLength:5
		},
		"connectionType": {
			type: 'string',
			minLength:1
		},
		"vendor":{
			type:'string',
			minLength: 3
		},
		"language":{
			type: "string",
			minLength:2
		},
		"languages":{
			type:['string', 'array'],
			minLength:1
		},
		"platform":{
			type: ["string",'array', 'object'],
			minLength:1
		},
		"deviceMemory":{
			type: "number",
			minLength:1
		},
		"cpu":{
			type: "number",
			minLength:1
		},
		"installedFonts":{
			type: "array",
			minLength:0
		},
		"plugins":{
			type: ['string', 'array'],
			minLength:1
		},
		"keyboardLayout":{
			type: "string",
			minLength:1
		},
		"browser":{
			type: "string",
			minLength:3
		},
		"browserVersion":{
			type: "string",
			minLength:0
		},
		"timezone":{
			type: "string",
			minLength:3
		},
		"touchscreen":{
			type: "boolean",
			minLength:4
		},
		"bluetooth":{
			type: "boolean",
			minLength:4
		},
		"PDFViewerEnabled":{
			type: "boolean",
			minLength:4
		},
		"cookiesEnabled":{
			type: "boolean",
			minLength:4
		},
		"screenResolution":{
			type: "object",
			minLength:2
		}
	}
}


