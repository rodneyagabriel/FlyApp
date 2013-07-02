enyo.kind({
	name: "FlyApp.Source",
	kind: "enyo.Source",
	secure: true,
	domain: "sapes1.sapdevcenter.com",
	urlPostfix: "sap/opu/odata/IWFND/RMTSAMPLEFLIGHT",
	defaultHeaders: {
		"DataServiceVersion": "1.0",
		"MaxDataServiceVersion": "2.0",
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
});
