enyo.kind({
	name: "FlyApp.Booking",
	kind: "enyo.Model",
	// the URI request for this model will be issued from the Application
	// in the bookingSelected handler so we must tell the model not to use
	// its default behavior of appending its "id" to the request URL
	rawUrl: true,
	attributes: {
		AGENCYNUM: null,
		CANCELLED: null,
		CLASS: null,
		COUNTER: null,
		CUSTOMID: null,
		CUSTTYPE: null,
		FORCURAM: null,
		FORCURKEY: null,
		INVOICE: null,
		LOCCURAM: null,
		LOCCURKEY: null,
		LUGGWEIGHT: null,
		ORDER_DATE: {
			formatter: FlyApp.DateConverter
		},
		PASSBIRTH: null,
		PASSFORM: null,
		PASSNAME: null,
		RESERVED: null,
		SMOKER: null,
		WUNIT: null,
		bookedFlight: {
			// remember formatters can be a string representing a method on
			// the model instance or a function (inline definition or reference)
			formatter: "bookedFlightConverter"
		},
		bookid: null,
		carrid: null,
		connid: null,
		fldate: {
			formatter: FlyApp.DateConverter
		}
	},
	// we use the filterData method to retrieve the nested object from
	// the payload that we want the model to use as the "real" payload
	filterData: function (data) {
		return data.d;
	},
	// we use the buildQueryParams method to ensure that the source
	// requests this model as JSON but we know that the complete
	// URI for the request is already provided
	buildQueryParams: function (model, options) {
		enyo.mixin(options.queryParams, {
			"$format": "json"
		});
	},
	bookedFlightConverter: function (key, value, action, payload) {
		if (action == "fetch") {
			return value.__deferred.uri;
		}
	}
});
