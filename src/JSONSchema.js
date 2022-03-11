
exports.fingerPrintReqSchema = {
	type:"object",
	required: ["fingerPrint", 'visited'],
	properties:{
		"fingerPrint":{
			type:"number",
			minLength:5
		},
		"visited":{
			type:"string",
			minLength:5
		},
		"Connection Type": {
			type: 'string',
			minLength:1
		},
		"Vendor":{
			type:'string',
			minLength:5
		},
		"Language":{
			type: "string",
			minLength:2
		},
		"Languages":{
			type:[ "object", 'array'],
			minLength:2
		},
		"Platform":{
			type: ["string",'array'],
			minLength:1
		},
		"Device Memory":{
			type: "number",
			minLength:1
		},
		"Available CPU":{
			type: "number",
			minLength:1
		},
		"Installed Fonts":{
			type: "number",
			minLength:1
		},
		"Plugins":{
			type: ['string', 'array'],
			minLength:2
		},
		"Keyboard Layout":{
			type: "string",
			minLength:1
		},
		"Browser":{
			type: "string",
			minLength:3
		},
		"Browser Version":{
			type: "string",
			minLength:3
		},
		"Timezone":{
			type: "string",
			minLength:3
		},
		"Browser Zoom Level":{
			type: "number",
			minLength:1
		},
		"Device Orientation":{
			type: "string",
			minLength:1
		},
		"Touchscreen":{
			type: "string",
			minLength:10
		},
		"Bluetooth":{
			type: "string",
			minLength:10
		},
		"PDF Viewer enabled":{
			type: "string",
			minLength:2
		},
		"Cookies enabled":{
			type: "string",
			minLength:2
		},
		"Screen Resolution":{
			type: "string",
			minLength:10
		}
	}

}



// "Connection Type": NAV_INFOS.getConnectionType(),
// "Vendor": NAV_INFOS.getVendor(),
// "Language": NAV_INFOS.getLanguage(),
// "Languages": NAV_INFOS.getLanguages(),
// "Platform": Object.values(await NAV_INFOS.getPlatform()),
// "Device Memory": NAV_INFOS.getDeviceMemeory(),
// "Available CPU" : NAV_INFOS.getCPU(),
// "Installed Fonts" : getFonts().length,
// "Plugins": NAV_INFOS.getPlugins(),
// "Keyboard Layout": await getKeyboardLayout(),
// "Browser": getBrowser(),
// "Browser Version": await getBrowserVersion(),
// "Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
// "Browser Zoom Level": NAV_INFOS.getZoomLevel(),
// "Device Orientation": isLandscape() ? 'Device is in Landscape orientation' : 'Device is in Portrait orientation',
// "Touchscreen": isTouchScreen() ? 'Device is a touch device' : 'Device is not a touch device',
// "Bluetooth" : getBluetoothEnabled() ? 'Bluetooth available' : 'Bluetooth not available',
// "PDF Viewer enabled": NAV_INFOS.getPdfViewerEnabled() ? "Yes" : "No",
// "Cookies enabled": NAV_INFOS.getCookisEnabled() ? 'YES' : 'NO',
// "Screen Resolution": `Width: ${screenResolution.width}, Height: ${screenResolution.height}, Depth: ${screenResolution.depth} `
// 


